import React, { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";
import AddVehicle from "./pages/AddVehicle";
import AddService from "./pages/AddService";
import VehicleDetails from "./pages/VehicleDetails";
import AddReminder from "./pages/AddReminder";
import { onAuthChange, signInUser, signUpUser, logoutUser } from "./firebase/auth";
import { addVehicle, getVehicles, deleteVehicle, addService, getServices, deleteService } from "./firebase/firestore";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("login");
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [authForm, setAuthForm] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [vehicleForm, setVehicleForm] = useState({
    name: "",
    licensePlate: "",
    currentMileage: "",
    purchaseYear: "",
  });
  const [serviceForm, setServiceForm] = useState({
    vehicleId: "",
    serviceType: "",
    date: "",
    cost: "",
    notes: "",
  });

  const [reminders, setReminders] = useState([]);
const [reminderForm, setReminderForm] = useState({
  vehicleId: "",
  serviceType: "",
  dueDate: "",
  location: "",
  notes: ""
});

const handleAddReminder = async () => {
  if (!reminderForm.vehicleId || !reminderForm.serviceType || !reminderForm.dueDate || !reminderForm.location) {
    alert("Missing Information\n\nPlease complete all required fields:\n• Select a vehicle\n• Choose service type\n• Set due date\n• Enter service location");
    return;
  }

  const reminderData = {
    vehicleId: reminderForm.vehicleId,
    serviceType: reminderForm.serviceType,
    dueDate: reminderForm.dueDate,
    location: reminderForm.location,
    notes: reminderForm.notes || ""
  };

  const newReminder = {
    id: Date.now().toString(),
    ...reminderData
  };
  
  setReminders([...reminders, newReminder]);
  setReminderForm({
    vehicleId: "",
    serviceType: "",
    dueDate: "",
    location: "",
    notes: ""
  });
  setView("dashboard");
  alert("Success!\n\nYour service reminder has been created successfully. You'll be notified when the due date approaches.");
};

const handleDeleteReminder = (reminderId) => {
  if (!confirm("Delete this reminder?")) return;
  setReminders(reminders.filter((r) => r.id !== reminderId));
};

  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      if (user) {
        setUser(user);
        setView("dashboard");
        await loadUserData(user.uid);
      } else {
        setUser(null);
        setView("login");
        setVehicles([]);
        setServices([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loadUserData = async (userId) => {
    const vehiclesResult = await getVehicles(userId);
    if (vehiclesResult.success) {
      setVehicles(vehiclesResult.vehicles);
    }

    const servicesResult = await getServices(userId);
    if (servicesResult.success) {
      setServices(servicesResult.services);
    }
  };

  const handleLogin = async () => {
    if (!authForm.email || !authForm.password) {
      alert("Missing Credentials\n\nPlease enter both:\n• Email address\n• Password");
      return;
    }

    const result = await signInUser(authForm.email, authForm.password);
    if (result.success) {
      setAuthForm({ email: "", password: "", name: "" });
    } else {
      alert("Login Failed\n\n" + result.error + "\n\nPlease check your credentials and try again.");
    }
  };

  const handleSignup = async () => {
    if (!authForm.email || !authForm.password) {
      alert("Missing Information\n\nPlease provide:\n• Valid email address\n• Strong password (minimum 6 characters)");
      return;
    }

    const result = await signUpUser(authForm.email, authForm.password);
    if (result.success) {
      alert("Welcome to AutoFix!\n\nYour account has been created successfully. You can now log in with your credentials.");
      setAuthForm({ email: "", password: "", name: "" });
    } else {
      alert("Signup Failed\n\n" + result.error + "\n\nPlease try again with different credentials.");
    }
  };

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      setVehicles([]);
      setServices([]);
      setView("login");
    }
  };

  const handleAddVehicle = async () => {
    if (
      !vehicleForm.name ||
      !vehicleForm.licensePlate ||
      !vehicleForm.currentMileage ||
      !vehicleForm.purchaseYear
    ) {
      alert("Incomplete Vehicle Information\n\nPlease fill all required fields:\n• Vehicle name/model\n• License plate\n• Current mileage\n• Purchase year");
      return;
    }

    const vehicleData = {
      name: vehicleForm.name,
      licensePlate: vehicleForm.licensePlate,
      currentMileage: parseInt(vehicleForm.currentMileage),
      purchaseYear: parseInt(vehicleForm.purchaseYear),
    };

    const result = await addVehicle(user.uid, vehicleData);
    if (result.success) {
      const newVehicle = { id: result.id, ...vehicleData };
      setVehicles([...vehicles, newVehicle]);
      setVehicleForm({
        name: "",
        licensePlate: "",
        currentMileage: "",
        purchaseYear: "",
      });
      setView("dashboard");
      alert("Vehicle Added Successfully!\n\nYour " + vehicleData.name + " has been added to your fleet. You can now track its maintenance history.");
    } else {
      alert("Failed to Add Vehicle\n\n" + result.error + "\n\nPlease try again.");
    }
  };

  const handleDeleteVehicle = async (vehicleId) => {
    if (!confirm("Are you sure you want to delete this vehicle? All associated service records and reminders will also be removed.")) return;

    const result = await deleteVehicle(vehicleId);
    if (result.success) {
      setVehicles(vehicles.filter((v) => v.id !== vehicleId));
      setServices(services.filter((s) => s.vehicleId !== vehicleId));
      setReminders(reminders.filter((r) => r.vehicleId !== vehicleId));
      alert("Vehicle Deleted\n\nThe vehicle, all its service records, and associated reminders have been removed from your account.");
    } else {
      alert("Deletion Failed\n\n" + result.error + "\n\nUnable to delete the vehicle. Please try again.");
    }
  };

  const handleAddService = async () => {
    if (
      !serviceForm.vehicleId ||
      !serviceForm.serviceType ||
      !serviceForm.date ||
      !serviceForm.cost
    ) {
      alert("Missing Service Information\n\nPlease complete all required fields:\n• Select a vehicle\n• Choose service type\n• Set service date\n• Enter service cost");
      return;
    }

    const serviceData = {
      vehicleId: serviceForm.vehicleId,
      serviceType: serviceForm.serviceType,
      date: serviceForm.date,
      cost: parseFloat(serviceForm.cost),
      notes: serviceForm.notes || "",
    };

    const result = await addService(user.uid, serviceData);
    if (result.success) {
      const newService = { 
        id: result.id, 
        ...serviceData,
        date: new Date(serviceData.date)
      };
      setServices([newService, ...services]);
      setServiceForm({
        vehicleId: "",
        serviceType: "",
        date: "",
        cost: "",
        notes: "",
      });
      setView("dashboard");
      alert("Service Record Saved!\n\nYour " + serviceData.serviceType + " service has been recorded. Total cost: $" + serviceData.cost.toFixed(2));
    } else {
      alert("Failed to Add Service Record\n\n" + result.error + "\n\nPlease try again.");
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (!confirm("Delete this service record? This action cannot be undone.")) return;

    const result = await deleteService(serviceId);
    if (result.success) {
      setServices(services.filter((s) => s.id !== serviceId));
      alert("Service Record Deleted\n\nThe service record has been permanently removed from your account.");
    } else {
      alert("Failed to Delete Service Record\n\n" + result.error + "\n\nPlease try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-800 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (view === "login") {
    return (
      <LoginPage
        onLogin={handleLogin}
        onSwitchToSignup={() => setView("signup")}
        authForm={authForm}
        setAuthForm={setAuthForm}
      />
    );
  }

  if (view === "signup") {
    return (
      <SignupPage
        onSignup={handleSignup}
        onSwitchToLogin={() => setView("login")}
        authForm={authForm}
        setAuthForm={setAuthForm}
      />
    );
  }

  if (view === "dashboard") {
    return (
      <Dashboard
        vehicles={vehicles}
        services={services}
        reminders={reminders}
        onLogout={handleLogout}
        onNavigate={setView}
        onDeleteVehicle={handleDeleteVehicle}
       onDeleteReminder={handleDeleteReminder}
        onSelectVehicle={(vehicle) => {
        setSelectedVehicle(vehicle);
        setView("vehicleDetails");
        }}
      />
    );
  }

  if (view === "addVehicle") {
    return (
      <AddVehicle
        vehicleForm={vehicleForm}
        setVehicleForm={setVehicleForm}
        onSave={handleAddVehicle}
        onBack={() => setView("dashboard")}
      />
    );
  }

  if (view === "addService") {
    return (
      <AddService
        vehicles={vehicles}
        serviceForm={serviceForm}
        setServiceForm={setServiceForm}
        onSave={handleAddService}
        onBack={() => setView("dashboard")}
      />
    );
  }

  if (view === "vehicleDetails" && selectedVehicle) {
    return (
      <VehicleDetails
        vehicle={selectedVehicle}
        services={services}
        onBack={() => setView("dashboard")}
        onDeleteService={handleDeleteService}
      />
    );
  }

  if (view === "addReminder") {
    return (
      <AddReminder
        vehicles={vehicles}
        reminderForm={reminderForm}
        setReminderForm={setReminderForm}
        onSave={handleAddReminder}
        onBack={() => setView("dashboard")}
      />
    );
  }

  return null;
}