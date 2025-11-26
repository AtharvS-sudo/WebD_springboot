import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FiUserPlus,
  FiArrowLeft,
  FiLoader,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    prnNo: "",
    firstName: "",
    lastName: "",
    branch: "",
    year: "First Year",
    div: "",
    rollNo: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); // Use object for message and type

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      await axios.post("http://localhost:8080/api/students/add", formData);
      setMessage({ text: "Student added successfully!", type: "success" });
      setFormData({
        prnNo: "",
        firstName: "",
        lastName: "",
        branch: "",
        year: "First Year",
        div: "",
        rollNo: "",
        email: "",
      });
    } catch (error) {
      // Use the error message from the backend if available
      const errorMessage =
        error.response?.data ||
        "Error adding student. Please check the details.";
      setMessage({ text: errorMessage, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  // Reusable input component for consistent styling
  const FormInput = ({ label, name, value, onChange, ...props }) => (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-600 mb-1"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border-slate-300 rounded-lg p-3 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        required
        {...props}
      />
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-80px)] p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors mb-4"
        >
          <FiArrowLeft />
          <span>Back to Dashboard</span>
        </Link>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-indigo-100 text-indigo-600 p-3 rounded-lg">
              <FiUserPlus size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">
              Add New Student
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="PRN Number"
                name="prnNo"
                type="number"
                value={formData.prnNo}
                onChange={handleChange}
                placeholder="e.g., 12310055"
              />
              <FormInput
                label="Roll Number"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                placeholder="e.g., 46"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="e.g., Aryan"
              />
              <FormInput
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="e.g., Joshi"
              />
            </div>
            <FormInput
              label="Branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              placeholder="e.g., CSE"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-slate-600 mb-1"
                >
                  Year
                </label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full border-slate-300 rounded-lg p-3 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                >
                  <option>First Year</option>
                  <option>Second Year</option>
                  <option>Third Year</option>
                  <option>Fourth Year</option>
                </select>
              </div>
              <FormInput
                label="Division"
                name="div"
                value={formData.div}
                onChange={handleChange}
                placeholder="e.g., A"
              />
            </div>
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g., aryan.joshi23@vit.edu"
            />

            {message.text && (
              <div
                className={`flex items-center gap-3 p-3 rounded-lg my-4 text-sm ${
                  message.type === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {message.type === "success" ? (
                  <FiCheckCircle />
                ) : (
                  <FiAlertTriangle />
                )}
                <p>{message.text}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <FiLoader className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Add Student</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
