import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUser, saveUser } from "@/utils/storage";

export default function UserForm() {
  const [mealType, setMealType] = useState("breakfast");
  const [mealsCount, setMealsCount] = useState(1);

  useEffect(() => {
    const userPrefs = getUser();
    if (userPrefs?.mealType) setMealType(userPrefs.mealType);
    if (userPrefs?.mealsCount) setMealsCount(userPrefs.mealsCount);
  }, []);

  const handleSubmit = () => {
    saveUser({ mealType, mealsCount });
    alert("Preferences saved!");
  };

  return (
    <div className="flex justify-center p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-sm">
        <CardHeader className="pb-2 text-center">
          <h2 className="text-lg font-semibold text-sky-700">Meal Preferences 🍽️</h2>
          <p className="text-xs text-gray-500">Set your daily meal preferences.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm text-gray-600">Meal Type</Label>
            <Select value={mealType} onValueChange={setMealType}>
              <SelectTrigger className="mt-1 h-10 text-sm border-sky-200 focus:border-sky-400">
                <SelectValue placeholder="Select Meal Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm text-gray-600">Meals per day</Label>
            <Input
              type="number"
              min="1"
              step="1"
              value={mealsCount}
              onChange={(e) => setMealsCount(e.target.value)}
              className="mt-1 h-10 text-sm border-sky-200 focus:border-sky-400"
            />
          </div>
          <Button
            onClick={handleSubmit}
            className="w-full h-10 text-sm font-medium text-white rounded-xl bg-linear-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 transition-all duration-300"
          >
            Save Preferences
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
