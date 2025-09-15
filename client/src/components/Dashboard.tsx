/*import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-700">
        Welcome to RentRoll. Here you can track property occupancy, revenue, and
        payments in real-time.
      </p>
    </div>
  );
};

export default Dashboard;*/


import React from "react";
import RoomMatrix from "./RoomMatrix";

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Landlord Dashboard</h1>
      <RoomMatrix />
    </div>
  );
};

export default Dashboard;

