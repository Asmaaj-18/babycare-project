import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm px-8 py-4 flex justify-between items-center">

      {/* ================= LOGO ================= */}
      <Link
        to={user?.role === "DOCTOR" ? "/doctor-dashboard" : "/parent-dashboard"}
        className="flex flex-col group"
      >
        <span className="text-lg font-bold text-blue-600 tracking-tight group-hover:text-blue-700 transition">
          🍼 Baby Health Tracker
        </span>
        <span className="text-xs text-gray-400">
          Medical Monitoring Platform
        </span>
      </Link>

      {/* ================= USER SECTION ================= */}
      {user && (
        <div className="flex items-center gap-6">

          {/* User Info */}
          <div className="text-right">
            <p className="text-xs text-gray-400">
              Connecté en tant que
            </p>

            <p className="text-sm font-semibold text-gray-800">
              {user.role === "DOCTOR" ? "Dr. " : ""}
              {user.name}
            </p>
          </div>

          {/* Role Badge */}
          <span
            className={`px-4 py-1 text-xs font-semibold rounded-full ${
              user.role === "DOCTOR"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {user.role === "DOCTOR" ? "Médecin" : "Parent"}
          </span>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            Déconnexion
          </button>

        </div>
      )}
    </nav>
  );
};

export default Navbar;