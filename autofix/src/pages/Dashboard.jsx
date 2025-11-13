import React, { useState, useEffect } from "react";
import { Car, LogOut, Trash2, Wrench, Calendar, AlertCircle, DollarSign, Bell, MapPin, Clock } from "lucide-react";

export default function Dashboard({ vehicles, services, reminders, onLogout, onNavigate, onDeleteVehicle, onSelectVehicle, onDeleteReminder }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getTotalSpent = () => {
    return services.reduce((sum, s) => sum + (s.cost || 0), 0).toFixed(2);
  };

  const getVehicleServices = (vehicleId) => {
    return services.filter((s) => s.vehicleId === vehicleId);
  };

  const getVehicleName = (vehicleId) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle ? vehicle.name : "Unknown Vehicle";
  };

  const getCountdown = (dueDate) => {
    const due = new Date(dueDate);
    const diff = due - currentTime;
    
    if (diff < 0) {
      const absDiff = Math.abs(diff);
      const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));
      return { days, hours, minutes, isOverdue: true };
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { days, hours, minutes, isOverdue: false };
  };

  return (
    <div className="min-h-screen h-screen bg-gray-400 flex flex-col border-5 border-gray-400 ">
      <div className="bg-black shadow-2xl px-8 py-6 flex justify-between items-center border-b-4 border-gray-400  rounded-2xl">
        <div className="flex items-center gap-6">
          <div className="p-2 rounded-lg bg-gray-900">
            <Car size={40} className="text-purple-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-100" style={{ fontFamily: "cursive" }}>Auto Fix</h1>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-5 px-7 py-6  from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-lg border-2 border-red-500 font-semibold"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      <div className="flex-1 overflow-y-auto w-full px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 border-20 border-gray-400">
          <div className="bg-black p-10 rounded-3xl shadow-2xl border-2 border-gray-700 border-opacity-50 flex items-center gap-8 hover:border-blue-500 hover:shadow-blue-500/20 transition-all duration-300">
            <div className="p-3 bg-gray-900 rounded-xl">
              <Car size={48} className="text-blue-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-5xl font-bold text-white">{vehicles.length}</h3>
              <p className="text-gray-400 font-semibold text-lg">Total Vehicles</p>
            </div>
          </div>
          <div className="bg-black p-10 rounded-3xl shadow-2xl border-2 border-gray-700 border-opacity-50 flex items-center gap-8 hover:border-green-500 hover:shadow-green-500/20 transition-all duration-300">
            <div className="p-3 bg-gray-900 rounded-xl">
              <DollarSign size={48} className="text-green-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-5xl font-bold text-white">${getTotalSpent()}</h3>
              <p className="text-gray-400 font-semibold text-lg">Total Spent</p>
            </div>
          </div>
          <div className="bg-black p-10 rounded-3xl shadow-2xl border-2 border-gray-700 border-opacity-50 flex items-center gap-8 hover:border-yellow-500 hover:shadow-yellow-500/20 transition-all duration-300">
            <div className="p-3 bg-gray-900 rounded-xl">
              <Bell size={48} className="text-yellow-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-5xl font-bold text-white">{reminders.length}</h3>
              <p className="text-gray-400 font-semibold text-lg">Reminders</p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-black mb-8 mt-4 border-b border-t border-20 border-gray-400">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-12 border-gray-400">
            <button
              onClick={() => onNavigate("addVehicle")}
              className="bg-black text-gray-200 p-8 rounded-3xl flex items-center justify-center gap-6 hover:bg-gray-900 transition-all duration-300 border-2 border-gray-700 hover:border-blue-500 shadow-2xl group"
            >
              <div className="p-3 bg-gray-900 rounded-xl group-hover:bg-gray-800 transition">
                <Car size={32} className="text-blue-500" />
              </div>
              <span className="font-bold text-xl">Register Vehicle</span>
            </button>
            <button
              onClick={() => onNavigate("addService")}
              className="bg-black text-gray-200 p-8 rounded-3xl flex items-center justify-center gap-6 hover:bg-gray-900 transition-all duration-300 border-2 border-gray-700 hover:border-orange-500 shadow-2xl group"
            >
              <div className="p-3 bg-gray-900 rounded-xl group-hover:bg-gray-800 transition">
                <Wrench size={32} className="text-orange-500" />
              </div>
              <span className="font-bold text-xl">Add Service</span>
            </button>
            <button
              onClick={() => onNavigate("addReminder")}
              className="bg-black text-gray-200 p-8 rounded-3xl flex items-center justify-center gap-6 hover:bg-gray-900 transition-all duration-300 border-2 border-gray-700 hover:border-yellow-500 shadow-2xl group"
            >
              <div className="p-3 bg-gray-900 rounded-xl group-hover:bg-gray-800 transition">
                <Bell size={32} className="text-yellow-500" />
              </div>
              <span className="font-bold text-xl">Set Reminder</span>
            </button>
          </div>
        </div>

        {reminders.length > 0 && (
          <div className="mb-16 ">
            <h2 className="text-3xl font-bold text-black border-20 border-b-10 border-t border-gray-400 mb-8 mt-4">Upcoming Service Reminders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {reminders.filter(reminder => {
                const countdown = getCountdown(reminder.dueDate);
                return !countdown.isOverdue;
              }).map((reminder) => {
                const countdown = getCountdown(reminder.dueDate);
                return (
                  <div key={reminder.id} className="bg-black p-6 pb-8 border-20 border-gray-400 rounded-3xl transition">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-xl text-gray-200">{reminder.serviceType}</h3>
                        <p className="text-sm text-gray-400 mt-1">{getVehicleName(reminder.vehicleId)}</p>
                      </div>
                      <button
                        onClick={() => onDeleteReminder(reminder.id)}
                        className="text-red-400 hover:text-red-300 bg-red-900/20 p-2 rounded-lg hover:bg-red-900/40 transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="space-y-3 text-sm mb-4">
                      <div className="flex items-center gap-3 bg-gray-900 p-3 rounded-xl border-t-5 border-b-7">
                        <Calendar size={18} className="text-blue-400" />
                        <span className="text-gray-300">Due: {new Date(reminder.dueDate).toLocaleDateString()} at {new Date(reminder.dueDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                      </div>
                      <div className="flex items-center gap-3 bg-gray-900 p-3 rounded-xl border-b-7">
                        <MapPin size={18} className="text-yellow-400" />
                        <span className="text-gray-300">{reminder.location}</span>
                      </div>
                      {reminder.notes && (
                        <div className="flex items-center gap-3 bg-gray-900 p-3 rounded-xl">
                          <Bell size={18} className="text-green-400" />
                          <span className="text-gray-300">{reminder.notes}</span>
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-900 p-4 rounded-xl text-center">
                      <p className="text-xs text-gray-400 mb-2">Time Remaining</p>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <p className="text-lg font-bold text-yellow-400">{countdown.days}</p>
                          <p className="text-xs text-gray-400">Days</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-yellow-400">{countdown.hours}</p>
                          <p className="text-xs text-gray-400">Hours</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-yellow-400">{countdown.minutes}</p>
                          <p className="text-xs text-gray-400">Mins</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 h-4 bg-black rounded-lg"></div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-3xl font-bold text-black border-20 border-b-10 border-t border-gray-400 mb-8 mt-4">Your Vehicles</h2>
          {vehicles.length === 0 ? (
            <div className="bg-black p-16 rounded-3xl shadow-2xl text-center text-gray-400 border-2 border-gray-700 border-opacity-50">
              <Car size={80} className="mx-auto mb-6 text-gray-600" />
              <p className="text-2xl">No vehicles yet. Add your first vehicle!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
              {vehicles.map((vehicle) => {
                const vehicleServices = getVehicleServices(vehicle.id);
                const lastService = vehicleServices[0];
                return (
                  <div key={vehicle.id} className="bg-black p-6 pb-8 border-20 border-gray-400 rounded-3xl transition">
                    <div className="flex justify-between items-start mb-4 border-8 rouded-xl">
                      <div>
                        <h3 className="font-bold text-xl text-gray-200">{vehicle.name}</h3>
                        <p className="text-sm text-gray-400 mt-1">{vehicle.licensePlate}</p>
                      </div>
                      <button
                        onClick={() => onDeleteVehicle(vehicle.id)}
                        className="text-red-400 hover:text-red-300 bg-red-900/20 p-2 rounded-lg hover:bg-red-900/40 transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <div className="space-y-3 text-sm mb-4">
                      <div className="flex items-center gap-3 bg-gray-900 p-3 rounded-xl border-t-5 border-b-7">
                        <Calendar size={18} className="text-blue-400" />
                        <span className="text-gray-300">Year: {vehicle.purchaseYear}</span>
                      </div>
                      <div className="flex items-center gap-3 bg-gray-900 p-3 rounded-xl border-b-7">
                        <AlertCircle size={18} className="text-yellow-400" />
                        <span className="text-gray-300">Mileage: {vehicle.currentMileage} mi</span>
                      </div>
                      {lastService && (
                        <div className="flex items-center gap-3 bg-gray-900 p-3 rounded-xl">
                          <Wrench size={18} className="text-green-400" />
                          <span className="text-gray-300">Last: {lastService.serviceType}</span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => onSelectVehicle(vehicle)}
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-xl font-semibold transition shadow-lg border-2 border-purple-500 hover:border-purple-400"
                    >
                      View Details
                    </button>
                    <div className="mt-6 h-4 bg-black rounded-lg"></div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}