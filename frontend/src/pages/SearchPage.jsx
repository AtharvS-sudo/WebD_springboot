import React, { useState } from "react";
import axios from "axios";
import { FiSearch, FiLoader, FiAlertTriangle, FiAward } from "react-icons/fi";
import ResultDisplay from "../components/ResultDisplay";

const SearchPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:8080/api/results/${identifier}`
      );
      setResult(response.data);
    } catch (err) {
      setError("Result not found. Please check the PRN or Email.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Helper Components for different states ---

  // Initial welcome state to fill the empty space
  const InitialState = () => (
    <div className="text-center p-8 bg-white rounded-2xl shadow-lg animate-fadeIn mt-8 w-full max-w-lg">
      <div className="mx-auto bg-blue-100 rounded-full h-20 w-20 flex items-center justify-center">
        <FiAward className="text-blue-600" size={40} />
      </div>
      <h3 className="mt-4 text-2xl font-bold text-gray-800">Welcome!</h3>
      <p className="mt-2 text-gray-500">
        Your academic results are just a search away. Use the search bar above
        to begin.
      </p>
    </div>
  );

  // Loading state component
  const LoadingState = () => (
    <div className="flex items-center gap-3 text-lg font-semibold text-gray-600 mt-8">
      <FiLoader className="animate-spin" />
      <p>Fetching your result...</p>
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="flex items-center gap-3 text-lg font-semibold text-red-600 mt-8 bg-red-50 p-4 rounded-lg">
      <FiAlertTriangle />
      <p>{error}</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center min-h-[calc(100vh-80px)]">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Student Result Portal
        </h1>
        <p className="text-gray-500 mt-2">
          Enter your PRN or Email to view your semester marksheet.
        </p>
      </div>

      <form onSubmit={handleSearch} className="w-full max-w-xl mb-8 relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <FiSearch size={20} />
        </div>
        <input
          className="w-full bg-white border border-gray-300 rounded-full py-3 pr-24 pl-12 shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          type="text"
          placeholder="Enter PRN or Email ID"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors disabled:bg-blue-300"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <FiLoader className="animate-spin" /> : "Search"}
        </button>
      </form>

      {/* --- This is the new, improved conditional rendering logic --- */}
      <div className="w-full flex justify-center">
        {isLoading && <LoadingState />}
        {error && <ErrorState />}
        {result && <ResultDisplay result={result} />}
        {!isLoading && !error && !result && <InitialState />}
      </div>
    </div>
  );
};

export default SearchPage;
