import React from "react";
import { Wrench, Trash2 } from "lucide-react";

export default function VehicleDetails({ vehicle, services, onBack, onDeleteService }) {
  const vehicleServices = services.filter((s) => s.vehicleId === vehicle.id);

  return (
    <div className="min-h-screen bg-gray-400 flex flex-col">
      <div className="bg-black shadow-md p-4 flex items-center gap-3 border-b border-gray-700">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-300">
          ← Back
        </button>
        <h1 className="text-xl font-bold text-gray-300">{vehicle.name}</h1>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl space-y-6">
          <div className="bg-black rounded-3xl shadow-2xl p-8 border-30 border-black">
            <h2 className="text-2xl font-bold text-gray-300 mb-6">{vehicle.name}</h2>
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-gray-400">License Plate</p>
                <p className="font-semibold text-gray-300">{vehicle.licensePlate}</p>
              </div>
              <div>
                <p className="text-gray-400">Year</p>
                <p className="font-semibold text-gray-300">{vehicle.purchaseYear}</p>
              </div>
              <div>
                <p className="text-gray-400">Current Mileage</p>
                <p className="font-semibold text-gray-300">{vehicle.currentMileage} miles</p>
              </div>
              <div>
                <p className="text-gray-400">Total Services</p>
                <p className="font-semibold text-gray-300">{vehicleServices.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-black rounded-3xl shadow-2xl p-8 border-30 border-black">
            <h3 className="text-xl font-bold text-gray-300 mb-6">Service History</h3>
            {vehicleServices.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No service records yet</p>
            ) : (
              <div className="space-y-3">
                {vehicleServices.map((service) => (
                  <div key={service.id} className="bg-gray-900 p-4 rounded-lg flex justify-between items-start border border-gray-700">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Wrench size={18} className="text-gray-400" />
                        <h4 className="font-bold text-gray-300">{service.serviceType}</h4>
                      </div>
                      <p className="text-sm text-gray-400">
                        {service.date?.toLocaleDateString ? service.date.toLocaleDateString() : service.date}
                      </p>
                      {service.notes && (
                        <p className="text-sm text-gray-400 mt-2">{service.notes}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-300">${service.cost.toFixed(2)}</p>
                      <button
                        onClick={() => onDeleteService(service.id)}
                        className="text-red-400 hover:text-red-300 mt-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}