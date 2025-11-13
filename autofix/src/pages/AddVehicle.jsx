import React from "react";

export default function AddVehicle({ vehicleForm, setVehicleForm, onSave, onBack }) {
  return (
    <div className="min-h-screen bg-gray-400 flex flex-col">
      <div className="bg-black shadow-md p-4 flex items-center gap-3 border-b border-gray-700">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-300">
          ← Back
        </button>
        <h1 className="text-xl font-bold text-gray-300">Add Vehicle</h1>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-black rounded-3xl shadow-2xl p-8 space-y-6 border-30 border-black w-full max-w-md">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-300">Vehicle Name/Model</label>
            <input
              type="text"
              placeholder="e.g., Honda Civic 2020"
              value={vehicleForm.name}
              onChange={(e) => setVehicleForm({ ...vehicleForm, name: e.target.value })}
              className="w-full px-6 py-4 bg-gray-900 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-700 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          <div className="space-y-3 border-t-8">
            <label className="block text-sm font-semibold text-gray-300">License Plate</label>
            <input
              type="text"
              placeholder="ABC123"
              value={vehicleForm.licensePlate}
              onChange={(e) => setVehicleForm({ ...vehicleForm, licensePlate: e.target.value })}
              className="w-full px-6 py-4 bg-gray-900 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-700 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          <div className="space-y-3 border-t-8">
            <label className="block text-sm font-semibold text-gray-300">Current Mileage</label>
            <input
              type="number"
              placeholder="50000"
              value={vehicleForm.currentMileage}
              onChange={(e) => setVehicleForm({ ...vehicleForm, currentMileage: e.target.value })}
              className="w-full px-6 py-4 bg-gray-900 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-700 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          <div className="space-y-3 border-t-8 border-b-20">
            <label className="block text-sm font-semibold text-gray-300">Purchase Year</label>
            <input
              type="number"
              placeholder="2020"
              value={vehicleForm.purchaseYear}
              onChange={(e) => setVehicleForm({ ...vehicleForm, purchaseYear: e.target.value })}
              className="w-full px-6 py-4 bg-gray-900 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-700 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          <button
            onClick={onSave}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all duration-300 shadow-lg border-2 border-blue-500 text-lg"
          >
            Save Vehicle
          </button>
        </div>
      </div>
    </div>
  );
}