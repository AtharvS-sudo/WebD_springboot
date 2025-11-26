import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FiEdit,
  FiArrowLeft,
  FiLoader,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";

const AddMark = () => {
  const [formData, setFormData] = useState({
    prnNo: "",
    subjectId: "",
    mseMarks: "",
    eseMarks: "",
  });

  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); // Use object for message and type

  // --- NEW: Fetch subjects when the component loads ---
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${API_URL}/subjects/all`);
        setSubjects(response.data); // Store the fetched subjects in state
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
        setMessage({ text: "Could not load subjects.", type: "error" });
      }
    };
    fetchSubjects();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const submissionData = {
        prnNo: parseInt(formData.prnNo),
        subjectId: parseInt(formData.subjectId),
        mseMarks: parseInt(formData.mseMarks),
        eseMarks: parseInt(formData.eseMarks),
      };
      await axios.post("http://localhost:8080/api/marks/add", submissionData);
      setMessage({ text: "Mark added successfully!", type: "success" });
      setFormData({ prnNo: "", subjectId: "", mseMarks: "", eseMarks: "" });
    } catch (error) {
      // UPDATED: Use the specific error message from the backend if available
      const errorMessage =
        error.response?.data || "An unexpected error occurred.";
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
        type="number"
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
              <FiEdit size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Assign Marks</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Student PRN Number"
                name="prnNo"
                value={formData.prnNo}
                onChange={handleChange}
                placeholder="e.g., 12310055"
              />
              <div>
                <label
                  htmlFor="subjectId"
                  className="block text-sm font-medium text-slate-600 mb-1"
                >
                  Subject
                </label>
                <select
                  id="subjectId"
                  name="subjectId"
                  value={formData.subjectId}
                  onChange={handleChange}
                  className="w-full border-slate-300 rounded-lg p-3 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-white"
                  required
                >
                  <option value="" disabled>
                    -- Select a Subject --
                  </option>
                  {subjects.map((subject) => (
                    <option key={subject.subjectId} value={subject.subjectId}>
                      {subject.subjectName} ({subject.subjectCode})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="MSE Marks"
                name="mseMarks"
                value={formData.mseMarks}
                onChange={handleChange}
                placeholder="Enter MSE score"
              />
              <FormInput
                label="ESE Marks"
                name="eseMarks"
                value={formData.eseMarks}
                onChange={handleChange}
                placeholder="Enter ESE score"
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
                <span>Add Mark</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMark;
