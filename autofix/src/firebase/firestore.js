import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";



export const addVehicle = async (userId, vehicleData) => {
  try {
    const docRef = await addDoc(collection(db, "vehicles"), {
      userId,
      ...vehicleData,
      createdAt: Timestamp.now(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getVehicles = async (userId) => {
  try {
    const q = query(collection(db, "vehicles"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const vehicles = [];
    querySnapshot.forEach((doc) => {
      vehicles.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, vehicles };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteVehicle = async (vehicleId) => {
  try {
    await deleteDoc(doc(db, "vehicles", vehicleId));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};



export const addService = async (userId, serviceData) => {
  try {
    const docRef = await addDoc(collection(db, "services"), {
      userId,
      ...serviceData,
      date: Timestamp.fromDate(new Date(serviceData.date)),
      createdAt: Timestamp.now(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getServices = async (userId) => {
  try {
    const q = query(
      collection(db, "services"),
      where("userId", "==", userId),
      orderBy("date", "desc")
    );
    const querySnapshot = await getDocs(q);
    const services = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      services.push({
        id: doc.id,
        ...data,
        date: data.date.toDate(), 
      });
    });
    return { success: true, services };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteService = async (serviceId) => {
  try {
    await deleteDoc(doc(db, "services", serviceId));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
