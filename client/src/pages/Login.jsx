import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const res = login(email, password);
    if (res.success) {
      if (res.role === "admin") navigate("/admin-dashboard");
      else if (res.role === "user") navigate("/user-dashboard");
      else navigate("/delivery-dashboard");
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col md:flex-row">
      {/* Left side image (visible on all screens) */}
      <div className="w-full md:w-2/5 h-60 md:h-screen mt-20 md:mt-0 md:ml-14 flex-shrink-0">
        <img
          src="/login-img2.png"
          alt="Login Illustration"
          className="md:object-cover object-contain w-full h-full"
        />
      </div>

      {/* Right side form */}
      <div className="flex items-center justify-center w-full md:w-3/5 h-auto md:h-screen px-6 py-10 md:px-16">
        <div className="p-8 bg-white md:p-12 rounded-3xl shadow-2xl w-full max-w-lg space-y-7 animate-fadeIn">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-sky-700">
            Login
          </h2>

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-sky-200 rounded-lg px-4 h-11 focus:ring-2 focus:ring-sky-300 transition"
          />

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-sky-200 rounded-lg px-4 h-11 focus:ring-2 focus:ring-sky-300 transition"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <Button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-semibold py-3 rounded-xl text-lg transition-all duration-300"
          >
            Login
          </Button>

          <p className="text-center text-gray-500 text-base">
            Not registered yet?{" "}
            <span
              className="text-sky-600 hover:underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
