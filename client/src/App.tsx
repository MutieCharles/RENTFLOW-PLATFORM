//(Room Matrix + Payment form)

/*import React from "react";
import RoomMatrix from "./components/RoomMatrix";
import PaymentForm from "./components/PaymentForm";

export default function App(){
  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl mb-4">RentFlow — Demo</h1>
      <div className="grid grid-cols-2 gap-6">
        <div><RoomMatrix units={74}/></div>
        <div><PaymentForm/></div>
      </div>
    </div>
  )
}*/


import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Login from "./pages/Login";
import Tenants from "./pages/Tenants";
import Payments from "./pages/Payments";
import Onboarding from "./pages/Onboarding";
import { useAuth } from "./hooks/useAuth";

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar always visible if logged in */}
      {user && <Navbar />}

      <main className="flex-1 p-4 bg-gray-50">
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          {user ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tenants" element={<Tenants />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/onboarding" element={<Onboarding />} />
              {/* catch-all fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </main>
    </div>
  );
};

export default App;
