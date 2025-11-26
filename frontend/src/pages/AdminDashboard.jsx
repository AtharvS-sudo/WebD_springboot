import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUserPlus, FiBookOpen, FiEdit, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

// A reusable card component for a cleaner dashboard
const AdminCard = ({ to, icon, title, description }) => {
  return (
    <Link
      to={to}
      className="group block p-6 bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 ease-in-out border border-gray-100"
    >
      <div className="flex items-center gap-4">
        <div className="bg-blue-100 text-blue-600 p-3 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-500 mt-1 text-sm">{description}</p>
        </div>
      </div>
    </Link>
  );
};

const AdminDashboard = () => {
  const { logout } = useAuth(); // 2. Get the logout function from context
  const navigate = useNavigate(); // 3. Get the navigate function for redirection

  const handleLogout = () => {
    logout();
    navigate("/admin/login"); // Redirect to login page after logout
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-80px)]">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/* --- UPDATED HEADER SECTION --- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          {/* Title and Subtitle */}
          <div className="mb-4 sm:mb-0">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Administrator Control Panel
            </h2>
            <p className="mt-2 text-lg text-gray-500">
              Manage student records, subjects, and marks.
            </p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-md"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>

        {/* --- CARD GRID REMAINS THE SAME --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AdminCard
            to="/admin/add-student"
            icon={<FiUserPlus size={24} />}
            title="Add Student"
            description="Create a new student profile in the database."
          />
          <AdminCard
            to="/admin/add-subject"
            icon={<FiBookOpen size={24} />}
            title="Add Subject"
            description="Define a new course and its credit details."
          />
          <AdminCard
            to="/admin/add-mark"
            icon={<FiEdit size={24} />}
            title="Add Mark"
            description="Assign semester marks to a student for a subject."
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
