import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// Private Route
function PrivateRoute({ children, allowedRole }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (allowedRole && user.role !== allowedRole) return <Navigate to="/" replace />;
  return children;
}

// Default route: redirect according to role
function DefaultRoute() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "admin") navigate("/admin-dashboard", { replace: true });
      else if (user.role === "delivery") navigate("/delivery-dashboard", { replace: true });
      else navigate("/user-dashboard", { replace: true });
    }
  }, [user, navigate]);

  return user ? null : <Login />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-linear-to-b from-sky-100 to-white flex flex-col">
      <Routes>
        <Route path="/" element={<DefaultRoute />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/user-dashboard"
          element={
            <PrivateRoute allowedRole="user">
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/delivery-dashboard"
          element={
            <PrivateRoute allowedRole="delivery">
              <DeliveryDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute allowedRole="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
