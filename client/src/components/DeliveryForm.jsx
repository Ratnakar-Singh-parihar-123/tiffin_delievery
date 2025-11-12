import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getDeliveries, saveDeliveries } from "@/utils/storage";

const mockAddresses = [
  { id: 1, state: "UP", city: "Lucknow", area: "Gomti Nagar", block: "B1", flat: "A-103", type: "Breakfast", mealsCount: 2 },
  { id: 2, state: "UP", city: "Lucknow", area: "Aliganj", block: "C2", flat: "B-45", type: "Lunch", mealsCount: 1 },
];

export default function DeliveryForm() {
  const [delivered, setDelivered] = useState([]);

  useEffect(() => {
    const savedDeliveries = getDeliveries();
    if (savedDeliveries.length) setDelivered(savedDeliveries);
  }, []);

  const handleDeliver = (id) => {
    if (!delivered.includes(id)) {
      const updated = [...delivered, id];
      setDelivered(updated);
      saveDeliveries(updated);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-center text-lg font-semibold text-sky-700">Delivery Overview 🚚</h2>
      <div className="space-y-3">
        {mockAddresses.map((addr) => {
          const isDelivered = delivered.includes(addr.id);
          return (
            <Card key={addr.id} className={`rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.01] ${isDelivered ? "bg-emerald-50 border border-emerald-200" : "bg-white"}`}>
              <CardHeader className="flex items-start justify-between gap-3 pb-2">
                <div className="text-sm text-gray-700">
                  <p className="font-semibold text-sky-800">{addr.state}, {addr.city}</p>
                  <p className="text-xs text-gray-500">{addr.area}, {addr.block}, {addr.flat}</p>
                </div>
                <div className="text-right mt-1">
                  <span className="text-sm text-sky-600 font-medium">{addr.mealsCount} x {addr.type}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex gap-2">
                  <Button
                    disabled={isDelivered}
                    onClick={() => handleDeliver(addr.id)}
                    className={`flex-1 h-9 rounded-xl text-sm font-medium ${isDelivered ? "bg-green-500 text-white cursor-default" : "bg-linear-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white"}`}
                  >
                    {isDelivered ? "Delivered ✅" : "Mark as Delivered"}
                  </Button>
                  <button className="px-3 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm">View</button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
