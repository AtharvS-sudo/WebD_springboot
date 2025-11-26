import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // 1. Import AuthProvider
import Header from "./pages/Header";
import ProtectedRoute from "./components/ProtectedRoute"; // 2. Import ProtectedRoute
import SearchPage from "./pages/SearchPage";
import AdminLogin from "./pages/AdminLogin"; // 3. Import AdminLogin
import AdminDashboard from "./pages/AdminDashboard";
import AddStudent from "./pages/AddStudent";
import AddSubject from "./pages/AddSubject";
import AddMark from "./pages/AddMark";

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* 4. Wrap everything in AuthProvider */}
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <main>
          <Routes>
            {/* Public Route */}
            <Route path="/" element={<SearchPage />} />

            {/* Admin Login Route (not protected) */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-student"
              element={
                <ProtectedRoute>
                  <AddStudent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-subject"
              element={
                <ProtectedRoute>
                  <AddSubject />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-mark"
              element={
                <ProtectedRoute>
                  <AddMark />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
