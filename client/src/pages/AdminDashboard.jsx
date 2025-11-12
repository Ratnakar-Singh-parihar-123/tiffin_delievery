import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAllUsers, toggleMealEatAtMess } from "@/utils/storage";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const { logout } = useAuth();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const allUsers = getAllUsers();
    setUsers(allUsers);
  };

  const handleToggleMealEatAtMess = (userId) => {
    toggleMealEatAtMess(userId);
    loadUsers(); // Refresh the list
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-sky-50 to-white p-6 sm:p-8">
      <header className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h1 className="text-2xl font-bold text-sky-700">Admin Dashboard</h1>
          <p className="text-xs text-gray-500">Manage all users and meal preferences</p>
        </div>
        <Button
          onClick={() => {
            logout();
            window.location.href = "/";
          }}
          className="bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md text-sm"
        >
          Logout
        </Button>
      </header>

      <main>
        <section>
          <h2 className="text-sm font-medium text-gray-600 mb-2">
            All Users ({users.length})
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <Card 
                key={user.id} 
                className={`rounded-2xl shadow-sm hover:shadow-md transition-shadow ${
                  user.mealEatAtMess ? 'bg-gray-100' : ''
                }`}
              >
                <CardContent className="p-4 flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-md font-semibold text-sky-700">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.address}</p>
                      <p className="text-xs text-gray-800 mt-1">
                        {user.areaName} • {user.colonyName}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-xs text-sky-600 font-medium bg-sky-50 px-2 py-1 rounded-lg">
                      {user.mealsCount} {user.mealsCount > 1 ? "meals" : "meal"}
                    </span>
                    <span className="text-xs text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded-lg capitalize">
                      {user.mealType}
                    </span>
                    <span className="text-xs text-red-600 font-medium bg-red-50 px-2 py-1 rounded-lg">
                      Due: ₹{user.due ?? 0}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                    <input
                      type="checkbox"
                      id={`meal-${user.id}`}
                      checked={user.mealEatAtMess || false}
                      onChange={() => handleToggleMealEatAtMess(user.id)}
                      className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <label 
                      htmlFor={`meal-${user.id}`}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      Meal eat at mess
                    </label>
                  </div>

                  {user.mealEatAtMess && (
                    <p className="text-xs text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded-lg mt-2">
                      This user won't appear in delivery dashboard
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {users.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No users found</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

