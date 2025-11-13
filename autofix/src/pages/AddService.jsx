import React from "react";

export default function AddService({ vehicles, serviceForm, setServiceForm, onSave, onBack }) {
  return (
    <div className="min-h-screen bg-gray-400 flex flex-col">
      <div className="bg-black shadow-md p-4 flex items-center gap-3 border-b border-gray-700">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-300">
          ← Back
        </button>
        <h1 className="text-xl font-bold text-gray-300">Add Service Record</h1>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-black rounded-3xl shadow-2xl p-8 space-y-6 border-30 border-black w-full max-w-md">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-300">Select Vehicle</label>
            <select
              value={serviceForm.vehicleId}
              onChange={(e) => setServiceForm({ ...serviceForm, vehicleId: e.target.value })}
              className="w-full px-6 py-4 bg-gray-900 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-700 focus:border-blue-500 transition-all duration-200"
            >
              <option value="">Choose your vehicle</option>
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>{v.name} - {v.licensePlate}</option>
              ))}
            </select>
          </div>
          <div className="space-y-3 border-t-8">
            <label className="block text-sm font-semibold text-gray-300">Service Type</label>
            <select
              value={serviceForm.serviceType}
              onChange={(e) => setServiceForm({ ...serviceForm, serviceType: e.target.value })}
              className="w-full px-6 py-4 bg-gray-900 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-700 focus:border-blue-500 transition-all duration-200"
            >
              <option value="">Select service type</option>
              <option value="Oil Change">Oil Change</option>
              <option value="Tire Rotation">Tire Rotation</option>
              <option value="Brake Service">Brake Service</option>
              <option value="Battery Replacement">Battery Replacement</option>
              <option value="Full Inspection">Full Inspection</option>
              <option value="Engine Repair">Engine Repair</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="space-y-3 border-t-8">
            <label className="block text-sm font-semibold text-gray-300">Service Date</label>
            <input
              type="date"
              value={serviceForm.date}
              onChange={(e) => setServiceForm({ ...serviceForm, date: e.target.value })}
              className="w-full px-6 py-4 bg-gray-900 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-700 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          <div className="space-y-3 border-t-8">
            <label className="block text-sm font-semibold text-gray-300">Cost ($)</label>
            <input
              type="number"
              step="0.01"
              placeholder="99.99"
              value={serviceForm.cost}
              onChange={(e) => setServiceForm({ ...serviceForm, cost: e.target.value })}
              className="w-full px-6 py-4 bg-gray-900 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-700 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          <div className="space-y-3 border-t-8 border-b-20">
            <label className="block text-sm font-semibold text-gray-300">Notes (Optional)</label>
            <textarea
              placeholder="Any additional notes..."
              value={serviceForm.notes}
              onChange={(e) => setServiceForm({ ...serviceForm, notes: e.target.value })}
              className="w-full px-6 py-4 bg-gray-900 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-700 focus:border-blue-500 transition-all duration-200"
              rows="3"
            />
          </div>
          <button
            onClick={onSave}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all duration-300 shadow-lg border-2 border-blue-500 text-lg"
          >
            Save Service Record
          </button>
        </div>
      </div>
    </div>
  );
}