import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getUser, saveUser, updateUserQtyAndType, markDeliveredForUser, toggleDeliveryForUser } from "@/utils/storage";
import { calculatePrice } from "@/utils/pricing";
import { useAuth } from "@/context/AuthContext";
import BottomNav from "@/components/BottomNav";

export default function UserDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [userData, setUserData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user } = useAuth();

  // Format address object into a readable string
  const formatAddress = (addr) => {
    if (!addr || typeof addr !== 'object') return 'N/A';
    const parts = [addr.flat, addr.block, addr.area, addr.city, addr.state].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : 'N/A';
  };

  useEffect(() => {
    const savedPrefs = getUser();
    // Get registered user data
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const registeredUser = registeredUsers.find(u => u.email === user?.email);
    
    const address = registeredUser?.address || savedPrefs?.address;
    const formattedAddress = formatAddress(address);

    setUserData({
      name: registeredUser?.name || user?.name || "User Name",
      email: registeredUser?.email || user?.email || "user@example.com",
      role: registeredUser?.role || user?.role || "N/A",
      joined: registeredUser?.joined || new Date().toLocaleDateString() || "N/A",
      address: formattedAddress,
      mealType: registeredUser?.mealType || savedPrefs?.mealType || "breakfast",
      mealsCount: registeredUser?.mealsCount || savedPrefs?.mealsCount || 1,
      lastMonthTotal: savedPrefs?.lastMonthTotal || 0,
      due: savedPrefs?.due || 0,
      deliveryLog: savedPrefs?.deliveryLog || {},
      phone: registeredUser?.mobile || savedPrefs?.phone || "N/A",
    });
  }, [user]);

  const handleUpdate = () => {
    if (!userData) return;
    const updated = { mealType: userData.mealType, mealsCount: userData.mealsCount };
    saveUser(updated);
    updateUserQtyAndType(user?.id, userData.mealsCount, userData.mealType);
    alert("Preferences updated successfully!");
  };

  const handleToggleDay = (dateStr) => {
    if (!userData) return;
    toggleDeliveryForUser(user?.id, dateStr);
    const updatedUser = { ...userData, deliveryLog: { ...userData.deliveryLog, [dateStr]: !userData.deliveryLog[dateStr] } };
    setUserData(updatedUser);
  };

  const handleMarkDelivered = () => {
    if (!userData) return;
    markDeliveredForUser(user?.id, selectedDate);
    setUserData({ ...userData, deliveryLog: { ...userData.deliveryLog, [selectedDate]: true } });
  };

  const daysWindow = [];
  for (let i = -3; i <= 3; i++) {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + i);
    daysWindow.push(d);
  }

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-gray-50 relative pb-16 md:pb-0 flex">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm px-4 py-3 md:hidden">
        <div className="flex items-center justify-between">
          <button
            className="p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setSidebarOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-lg font-semibold text-white">
              {userData?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="text-right">
              <h2 className="font-semibold text-gray-900">{userData.name}</h2>
              <p className="text-xs text-gray-500">{userData.role}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-full sm:w-80 bg-white transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static md:shrink-0`}>
        <div className="h-full flex flex-col overflow-y-auto border-r">
          {/* Close button - mobile only */}
          <button
            className="md:hidden absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setSidebarOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Profile Section */}
          <div className="p-6">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-linear-to-r from-sky-500 to-sky-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
              {userData?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 text-center">{userData.name}</h2>
            <p className="text-gray-500 text-center mt-1">{userData.email}</p>
          </div>

          {/* User Details */}
          <div className="px-6 py-4 bg-gray-50 mx-4 rounded-xl">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-medium text-gray-900">{userData.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Joined</p>
                  <p className="font-medium text-gray-900">{userData.joined}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{userData.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium text-gray-900 text-sm">{userData.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto p-6">
            <Button
              onClick={() => { logout(); window.location.href = "/"; }}
              className="w-full bg-red-500 hover:bg-red-600 text-white gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Welcome Banner */}
          <div className="bg-linear-to-r from-sky-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {userData.name.split(' ')[0]}! 👋</h1>
            <p className="text-sky-100">Manage your meals and track deliveries easily.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-sky-100 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Daily Price</p>
                    <p className="text-xl font-bold text-sky-600">₹{calculatePrice(userData.mealType, userData.mealsCount)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Month</p>
                    <p className="text-xl font-bold text-emerald-600">₹{userData.lastMonthTotal}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Due Amount</p>
                    <p className="text-xl font-bold text-red-600">₹{userData.due}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Meal Plan</p>
                    <p className="text-xl font-bold text-purple-600 capitalize">{userData.mealType}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Actions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Meal Preferences Card */}
            <Card className="bg-white rounded-xl shadow-md overflow-hidden">
              <CardHeader className="bg-linear-to-r from-sky-50 to-sky-100 p-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <span role="img" aria-label="meal">🍽️</span>
                  Meal Preferences
                </h2>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Meal Type Selection */}
                <div className="space-y-3">
                  <Label className="text-gray-700 font-medium">Select Meal Type</Label>
                  <Select value={userData.mealType} onValueChange={(v) => setUserData({ ...userData, mealType: v })}>
                    <SelectTrigger className="w-full h-12 border-gray-200 rounded-lg hover:border-sky-500 transition-colors">
                      <SelectValue placeholder="Choose your meal type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breakfast">🍳 Breakfast</SelectItem>
                      <SelectItem value="lunch">🍱 Lunch</SelectItem>
                      <SelectItem value="dinner">🍲 Dinner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Meals Count */}
                <div className="space-y-3">
                  <Label className="text-gray-700 font-medium">Number of Meals</Label>
                  <div className="flex items-center justify-center bg-gray-50 p-4 rounded-xl">
                    <Button
                      onClick={() => setUserData(prev => ({ ...prev, mealsCount: Math.max(1, prev.mealsCount - 1) }))}
                      className="h-12 w-12 rounded-lg bg-white border hover:bg-gray-50 text-gray-600"
                    >
                      -
                    </Button>
                    <span className="w-20 text-center text-2xl font-bold text-gray-700">
                      {userData.mealsCount}
                    </span>
                    <Button
                      onClick={() => setUserData(prev => ({ ...prev, mealsCount: Math.min(5, prev.mealsCount + 1) }))}
                      className="h-12 w-12 rounded-lg bg-white border hover:bg-gray-50 text-gray-600"
                    >
                      +
                    </Button>
                  </div>
                </div>

                <Button 
                  onClick={handleUpdate}
                  className="w-full h-12 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium"
                >
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            {/* Delivery Calendar Card */}
            <Card className="bg-white rounded-xl shadow-md overflow-hidden">
              <CardHeader className="bg-linear-to-r from-sky-50 to-sky-100 p-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <span role="img" aria-label="calendar">📅</span>
                  Delivery Schedule
                </h2>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Week View */}
                  <div className="grid grid-cols-7 gap-2">
                    {daysWindow.map((date) => {
                      const dateStr = date.toISOString().slice(0, 10);
                      const isDelivered = userData.deliveryLog[dateStr];
                      const isSelected = dateStr === selectedDate;
                      const isToday = dateStr === new Date().toISOString().slice(0, 10);

                      return (
                        <button
                          key={dateStr}
                          onClick={() => setSelectedDate(dateStr)}
                          className={`p-3 rounded-xl text-center transition-all ${
                            isSelected
                              ? "bg-sky-500 text-white shadow-lg ring-2 ring-sky-300"
                              : isDelivered
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "hover:bg-gray-50 border"
                          } ${isToday ? "ring-2 ring-sky-500 ring-offset-2" : ""}`}
                        >
                          <p className="text-xs font-medium mb-1">
                            {date.toLocaleDateString("en-US", { weekday: "short" })}
                          </p>
                          <p className="text-base font-semibold">{date.getDate()}</p>
                          {isDelivered && (
                            <svg className="w-4 h-4 mx-auto mt-1 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Date Actions */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-sm text-gray-500">Selected Date</p>
                      <p className="font-medium text-gray-900">
                        {new Date(selectedDate).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <Button
                      onClick={handleMarkDelivered}
                      disabled={userData.deliveryLog[selectedDate]}
                      className={`${
                        userData.deliveryLog[selectedDate]
                          ? "bg-emerald-500"
                          : "bg-sky-600 hover:bg-sky-700"
                      } text-white px-6 py-2 rounded-lg flex items-center gap-2`}
                    >
                      {userData.deliveryLog[selectedDate] ? (
                        <>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Delivered
                        </>
                      ) : (
                        "Mark Delivered"
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}