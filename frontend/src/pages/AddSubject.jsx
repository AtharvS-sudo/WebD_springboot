import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FiBookOpen,
  FiArrowLeft,
  FiLoader,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";

const AddSubject = () => {
  const [formData, setFormData] = useState({
    subjectCode: "",
    subjectName: "",
    credits: "",
    maxMse: 30,
    maxEse: 70,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); // Use an object for message and type

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const submissionData = {
        ...formData,
        credits: parseInt(formData.credits),
        maxMse: parseInt(formData.maxMse),
        maxEse: parseInt(formData.maxEse),
      };
      await axios.post(
        "http://localhost:8080/api/subjects/add",
        submissionData
      );
      setMessage({ text: "Subject added successfully!", type: "success" });
      setFormData({
        subjectCode: "",
        subjectName: "",
        credits: "",
        maxMse: 30,
        maxEse: 70,
      });
    } catch (error) {
      setMessage({
        text: "Error: Subject code might already exist.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // A helper component for styled form inputs
  const FormInput = ({ label, name, value, onChange, ...props }) => (
    <div className="mb-4">
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
        {...props}
        required
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
              <FiBookOpen size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">
              Add New Subject
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <FormInput
              label="Subject Code"
              name="subjectCode"
              value={formData.subjectCode}
              onChange={handleChange}
              placeholder="e.g., CSE1001"
            />
            <FormInput
              label="Subject Name"
              name="subjectName"
              value={formData.subjectName}
              onChange={handleChange}
              placeholder="e.g., Introduction to Programming"
            />
            <FormInput
              label="Credits"
              name="credits"
              type="number"
              value={formData.credits}
              onChange={handleChange}
              placeholder="e.g., 4"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Max MSE Marks"
                name="maxMse"
                type="number"
                value={formData.maxMse}
                onChange={handleChange}
              />
              <FormInput
                label="Max ESE Marks"
                name="maxEse"
                type="number"
                value={formData.maxEse}
                onChange={handleChange}
              />
            </div>

            {/* --- Message Display --- */}
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

            {/* --- Submit Button with Loading State --- */}
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
                <span>Add Subject</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSubject;
