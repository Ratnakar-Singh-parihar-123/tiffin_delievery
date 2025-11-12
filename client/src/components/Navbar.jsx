import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-linear-to-r from-sky-500 to-sky-400 px-4 py-3 shadow-md rounded-b-2xl sticky top-0 z-50">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="MealEase" className="w-7 h-7" />
        <h1 className="text-white font-semibold text-lg tracking-wide">
          Meal Delivery
        </h1>
      </div>

      {/* Menu / Future Options */}
      <Button
        size="icon"
        className="bg-white/80 hover:bg-white rounded-full shadow-sm transition-all"
      >
        <Menu className="text-sky-600" size={20} />
      </Button>
    </nav>
  );
}
