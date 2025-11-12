
import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  // Login function
  const login = (email, password) => {
    // Admin credentials (hardcoded for now)
    if (email === "admin@admin.com" && password === "admin123") {
      const adminUser = {
        email: "admin@admin.com",
        password: "admin123",
        role: "admin",
        name: "Admin"
      };
      setUser(adminUser);
      localStorage.setItem("user", JSON.stringify(adminUser));
      return { success: true, role: "admin" };
    }

    const registeredUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );
    if (!registeredUsers.length)
      return { success: false, message: "No registered user found" };

    const foundUser = registeredUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      return { success: true, role: foundUser.role };
    } else {
      return { success: false, message: "Invalid credentials" };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
