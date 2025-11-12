import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddressDropdown({ onSelect }) {
  const [form, setForm] = useState({
    state: "",
    city: "",
    area: "",
    block: "",
    flat: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
    const isValid = Object.values(form).every((v) => v.trim() !== "");
    if (!isValid) {
      alert("Please fill all address fields.");
      return;
    }
    onSelect(form);
  };

  return (
    <div className="space-y-4 mt-3">
      {/* First Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="state" className="text-sm text-gray-600 mb-1 block">
            State
          </Label>
          <Input
            id="state"
            name="state"
            type="text"
            value={form.state}
            onChange={handleChange}
            className="border border-sky-200 rounded-lg h-10 px-3 focus:ring-2 focus:ring-sky-300 transition w-full"
            placeholder="Enter State"
            required
          />
        </div>

        <div>
          <Label htmlFor="city" className="text-sm text-gray-600 mb-1 block">
            City / District
          </Label>
          <Input
            id="city"
            name="city"
            type="text"
            value={form.city}
            onChange={handleChange}
            className="border border-sky-200 rounded-lg h-10 px-3 focus:ring-2 focus:ring-sky-300 transition w-full"
            placeholder="Enter City / District"
            required
          />
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="area" className="text-sm text-gray-600 mb-1 block">
            Area / Colony
          </Label>
          <Input
            id="area"
            name="area"
            type="text"
            value={form.area}
            onChange={handleChange}
            className="border border-sky-200 rounded-lg h-10 px-3 focus:ring-2 focus:ring-sky-300 transition w-full"
            placeholder="Enter Area / Colony"
            required
          />
        </div>

        <div>
          <Label htmlFor="block" className="text-sm text-gray-600 mb-1 block">
            Block
          </Label>
          <Input
            id="block"
            name="block"
            type="text"
            value={form.block}
            onChange={handleChange}
            className="border border-sky-200 rounded-lg h-10 px-3 focus:ring-2 focus:ring-sky-300 transition w-full"
            placeholder="Enter Block"
            required
          />
        </div>
      </div>

      {/* Third Row (Full Width) */}
      <div>
        <Label htmlFor="flat" className="text-sm text-gray-600 mb-1 block">
          Flat / House / Apartment
        </Label>
        <Input
          id="flat"
          name="flat"
          type="text"
          value={form.flat}
          onChange={handleChange}
          className="border border-sky-200 rounded-lg h-10 px-3 focus:ring-2 focus:ring-sky-300 transition w-full"
          placeholder="Enter Flat / House / Apartment"
          required
        />
      </div>

      <Button
        type="button"
        onClick={handleConfirm}
        className="w-full mt-2 bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white rounded-xl h-10 text-sm font-medium transition-all duration-300"
      >
        Save Address
      </Button>
    </div>
  );
}
