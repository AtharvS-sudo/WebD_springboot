import React from "react";

const ResultDisplay = ({ result }) => {
  if (!result) {
    return null;
  }

  return (
    <div className="mt-8 w-full max-w-4xl bg-white p-6 shadow-lg rounded-lg animate-fadeIn">
      {/* ... all your JSX for the table and student details ... */}
      <div className="border-b-2 pb-4 mb-6 text-center">
        <h3 className="text-2xl font-bold text-gray-800">Semester Result</h3>
      </div>

      <div className="flex justify-between flex-wrap text-gray-700 mb-6">
        <p>
          <strong>Name:</strong> {result.studentName}
        </p>
        <p>
          <strong>Roll No:</strong> {result.regNo}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase border-b">
                Code
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase border-b">
                Subject Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase border-b">
                MSE
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase border-b">
                ESE
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase border-b">
                Total
              </th>
              <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600 uppercase border-b">
                Grade
              </th>
            </tr>
          </thead>
          <tbody>
            {result.subjectResults.map((subject) => (
              <tr key={subject.subjectCode} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{subject.subjectCode}</td>
                <td className="py-3 px-4 border-b">{subject.subjectName}</td>
                <td className="py-3 px-4 border-b">{subject.mseMarks}</td>
                <td className="py-3 px-4 border-b">{subject.eseMarks}</td>
                <td className="py-3 px-4 border-b">{subject.totalMarks}</td>
                <td className="py-3 px-4 border-b text-center font-bold">
                  {subject.grade}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 pt-4 border-t-2 text-right">
        <h4 className="text-xl font-bold text-blue-600">
          SGPA: {result.sgpa.toFixed(2)}
        </h4>
      </div>
    </div>
  );
};

// 👇 ADD THIS MISSING LINE AT THE END OF THE FILE
export default ResultDisplay;
