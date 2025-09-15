import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
      <div className="font-bold text-xl text-blue-600">🏢 RentRoll</div>
      {user && (
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-blue-600">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/tenants" className="hover:text-blue-600">
              Tenants
            </Link>
          </li>
          <li>
            <Link to="/payments" className="hover:text-blue-600">
              Payments
            </Link>
          </li>
          <li>
            <Link to="/onboarding" className="hover:text-blue-600">
              Onboarding
            </Link>
          </li>
        </ul>
      )}
      {user && (
        <button
          onClick={handleLogout}
          className="ml-6 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
