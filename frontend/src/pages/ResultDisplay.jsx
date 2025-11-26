import React from "react";
import { FiPrinter } from "react-icons/fi";

const ResultDisplay = ({ result }) => {
  if (!result) return null;

  // Helper function to get a color based on the grade
  const getGradeColor = (grade) => {
    switch (grade) {
      case "S":
        return "text-green-600 bg-green-100";
      case "A":
        return "text-blue-600 bg-blue-100";
      case "B":
        return "text-sky-600 bg-sky-100";
      case "C":
        return "text-yellow-600 bg-yellow-100";
      case "D":
        return "text-orange-600 bg-orange-100";
      case "E":
        return "text-amber-600 bg-amber-100";
      case "F":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mt-8 w-full max-w-4xl bg-white p-8 shadow-2xl rounded-lg animate-fadeIn print-container">
      <div className="flex justify-between items-start border-b-2 border-gray-200 pb-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Semester Marksheet
          </h2>
          <p className="text-gray-500">VIT, Pune</p>
        </div>
        <button
          onClick={handlePrint}
          className="no-print flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          <FiPrinter />
          <span>Print</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-gray-700 mb-8">
        <p>
          <strong>Student Name:</strong> {result.studentName}
        </p>
        <p>
          <strong>Roll No:</strong> {result.regNo}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th className="py-3 px-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                Subject Name
              </th>
              <th className="py-3 px-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                MSE
              </th>
              <th className="py-3 px-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                ESE
              </th>
              <th className="py-3 px-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="py-3 px-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                Grade
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {result.subjectResults.map((subject) => (
              <tr key={subject.subjectCode}>
                <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {subject.subjectCode}
                </td>
                <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-600">
                  {subject.subjectName}
                </td>
                <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-600 text-center">
                  {subject.mseMarks}
                </td>
                <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-600 text-center">
                  {subject.eseMarks}
                </td>
                <td className="py-4 px-4 whitespace-nowrap text-sm font-bold text-gray-800 text-center">
                  {subject.totalMarks}
                </td>
                <td className="py-4 px-4 whitespace-nowrap text-sm font-bold text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getGradeColor(
                      subject.grade
                    )}`}
                  >
                    {subject.grade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 pt-6 border-t-2 border-gray-200 flex justify-end">
        <div className="text-right">
          <p className="text-gray-500 text-sm">
            Semester Grade Point Average (SGPA)
          </p>
          <h4 className="text-3xl font-extrabold text-blue-600">
            {result.sgpa.toFixed(2)}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
