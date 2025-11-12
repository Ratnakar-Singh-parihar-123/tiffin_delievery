import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressDropdown from "../components/AddressDropdown";

export default function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    role: "user",
    mealType: "breakfast",
    mealsCount: 1,
    address: {},
  });

  const handleAddress = (addr) =>
    setUserData((prev) => ({ ...prev, address: addr }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const allUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    allUsers.push(userData);
    localStorage.setItem("registeredUsers", JSON.stringify(allUsers));

    alert("Registration successful!");
    navigate("/");
  };

  return (
    <div className="min-h-screen py-6 flex flex-col md:flex-row bg-sky-100">
      {/* Left Image Section */}
      <div className="md:w-1/2 w-full flex items-center justify-center relative">
        <img
          src="/login-img.png"
          alt="Register Banner"
          className="md:object-cover object-contain w-[90%] md:w-[85%] h-[250px] md:h-[90vh]  mt-2 md:mt-0 md:ml-14"
        />
      </div>

      {/* Right Form Section */}
      <div className="md:w-1/2 w-full flex items-center justify-center px-4 py-8 md:py-0">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white shadow-xl rounded-3xl px-8 py-4 space-y-5 animate-fadeIn"
        >
          <h2 className="text-2xl font-bold text-sky-700 text-center">
            Create Account
          </h2>

          {/* Role */}
          <div>
            <label className="block text-gray-600 mb-1">Register As</label>
            <select
              value={userData.role}
              onChange={(e) =>
                setUserData({ ...userData, role: e.target.value })
              }
              className="w-full border border-sky-200 rounded-lg h-10 px-3 focus:ring-2 focus:ring-sky-300 transition"
            >
              <option value="user">User</option>
              <option value="delivery">Delivery Man</option>
            </select>
          </div>

          {/* Two Columns Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              className="border border-sky-200 rounded-lg h-10 px-3 focus:ring-2 focus:ring-sky-300 transition"
              required
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={userData.mobile}
              onChange={(e) =>
                setUserData({ ...userData, mobile: e.target.value })
              }
              className="border border-sky-200 rounded-lg h-10 px-3 focus:ring-2 focus:ring-sky-300 transition"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              className="border border-sky-200 rounded-lg h-10 px-3 focus:ring-2 focus:ring-sky-300 transition"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              className="border border-sky-200 rounded-lg h-10 px-3 focus:ring-2 focus:ring-sky-300 transition"
              required
            />
          </div>

          {/* Meal Type & Count (for user role only) */}
          {userData.role === "user" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-1">Meal Type</label>
                  <select
                    value={userData.mealType}
                    onChange={(e) =>
                      setUserData({ ...userData, mealType: e.target.value })
                    }
                    className="w-full border border-sky-200 rounded-lg h-10 px-2 focus:ring-2 focus:ring-sky-300 transition"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">
                    Meals per day
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={userData.mealsCount}
                    onChange={(e) =>
                      setUserData({ ...userData, mealsCount: e.target.value })
                    }
                    className="w-full border border-sky-200 rounded-lg h-10 px-2 focus:ring-2 focus:ring-sky-300 transition"
                  />
                </div>
              </div>

              {/* Address Dropdown */}
              <AddressDropdown onSelect={handleAddress} />
            </>
          )}

          {/* Register Button */}
          <button className="w-full bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-semibold py-2.5 rounded-xl transition-all duration-300">
            Register
          </button>

          <p className="text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <span
              className="text-sky-600 hover:underline cursor-pointer"
              onClick={() => navigate("/")}
            >
              Login here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
