import React from "react";
import { ArrowLeft, Bell } from "lucide-react";

export default function AddReminder({ vehicles, reminderForm, setReminderForm, onSave, onBack }) {
  return (
    <div className="min-h-screen bg-gray-500 flex flex-col">
      <div className="bg-black shadow-xl p-5 flex items-center gap-4 border-b-2 border-gray-700">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-200 bg-gray-800 p-3 rounded-xl hover:bg-gray-700 transition border-2 border-gray-700">
          <ArrowLeft size={24} />
        </button>
        <Bell size={28} className="text-yellow-500" />
        <h1 className="text-2xl font-bold text-gray-200">Add Service Reminder</h1>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-black rounded-3xl shadow-2xl p-8 space-y-6 border-30 border-black w-full max-w-lg">
          <div className="space-y-4">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-300">Select Vehicle</label>
              <select
                value={reminderForm.vehicleId}
                onChange={(e) => setReminderForm({ ...reminderForm, vehicleId: e.target.value })}
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
                value={reminderForm.serviceType}
                onChange={(e) => setReminderForm({ ...reminderForm, serviceType: e.target.value })}
                className="w-full px-6 py-4 bg-gray-900 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-700 focus:border-blue-500 transition-all duration-200"
              >
                <option value="">Select service type</option>
                <option value="Oil Change">Oil Change</option>
                <option value="Tire Rotation">Tire Rotation</option>
                <option value="Brake Service">Brake Service</option>
                <option value="Battery Replacement">Battery Replacement</option>
                <option value="Full Inspection">Full Inspection</option>
                <option value="Engine Repair">Engine Repair</option>
                <option value="Transmission Service">Transmission Service</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-3 border-t-8">
              <label className="block text-sm font-semibold text-gray-300">Due Date & Time (24-hour format)</label>
              <input
                type="datetime-local"
                value={reminderForm.dueDate}
                onChange={(e) => setReminderForm({ ...reminderForm, dueDate: e.target.value })}
                className="w-full px-6 py-4 bg-gray-900 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-700 focus:border-blue-500 transition-all duration-200"
              />
              <p className="text-xs text-gray-400 mt-2">Example: 14:30 = 2:30 PM</p>
            </div>
            <div className="space-y-3 border-t-8">
              <label className="block text-sm font-semibold text-gray-300">Service Location</label>
              <input
                type="text"
                placeholder="e.g., Joe's Auto Repair, 123 Main St"
                value={reminderForm.location}
                onChange={(e) => setReminderForm({ ...reminderForm, location: e.target.value })}
                className="w-full px-6 py-4 bg-gray-900 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-700 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <div className="space-y-3 border-t-8 border-b-20">
              <label className="block text-sm font-semibold text-gray-300">Notes (Optional)</label>
              <textarea
                placeholder="Additional reminder notes..."
                value={reminderForm.notes}
                onChange={(e) => setReminderForm({ ...reminderForm, notes: e.target.value })}
                className="w-full px-6 py-4 bg-gray-900 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-700 focus:border-blue-500 transition-all duration-200"
                rows="3"
              />
            </div>
          </div>

          <button
            onClick={onSave}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all duration-300 shadow-lg border-2 border-blue-500 text-lg"
          >
            Save Reminder
          </button>
        </div>
      </div>
    </div>
  );
}