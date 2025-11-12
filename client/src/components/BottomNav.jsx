import { NavLink } from "react-router-dom";
import { Home, Truck, User } from "lucide-react";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-inner flex justify-around py-2 sm:hidden">
      <NavLink
        to="/user-dashboard"
        className={({ isActive }) =>
          `flex flex-col items-center text-xs ${
            isActive ? "text-sky-600" : "text-gray-500"
          }`
        }
      >
        <Home size={20} />
        Home
      </NavLink>
      <NavLink
        to="/delivery-dashboard"
        className={({ isActive }) =>
          `flex flex-col items-center text-xs ${
            isActive ? "text-sky-600" : "text-gray-500"
          }`
        }
      >
        <Truck size={20} />
        Delivery
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `flex flex-col items-center text-xs ${
            isActive ? "text-sky-600" : "text-gray-500"
          }`
        }
      >
        <User size={20} />
        Profile
      </NavLink>
    </nav>
  );
}
