import { useEffect, useState } from "react";

import { getAreas, getColoniesByArea, getUsersByColony, getUserById, updateUserQtyAndType } from "@/utils/storage";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { calculatePrice } from "@/utils/pricing";

export default function DeliveryDashboard() {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [colonies, setColonies] = useState([]);
  const [selectedColony, setSelectedColony] = useState(null);
  const [users, setUsers] = useState([]);
  const [expandedUsers, setExpandedUsers] = useState({});
  const [userEdits, setUserEdits] = useState({}); // Track local edits
  const { logout } = useAuth();

  useEffect(() => {
    setAreas(getAreas());
  }, []);

  //   useEffect(() => {
  //   const loadedAreas = getAreas();
  //   setAreas(loadedAreas);

  //   // Auto-select first area and first colony if available
  //   if (loadedAreas.length > 0) {
  //     const firstArea = loadedAreas[0];
  //     setSelectedArea(firstArea);

  //     const loadedColonies = getColoniesByArea(firstArea.id);
  //     setColonies(loadedColonies);

  //     if (loadedColonies.length > 0) {
  //       const firstColony = loadedColonies[0];
  //       setSelectedColony(firstColony);

  //       // Load users immediately
  //       setUsers(getUsersByColony(firstColony.id));
  //     }
  //   }
  // }, []);

  const handleSelectArea = (area) => {
    setSelectedArea(area);
    setColonies(getColoniesByArea(area.id));
    setSelectedColony(null);
    setUsers([]);
  };

  const handleBackToAreas = () => {
    setSelectedArea(null);
    setColonies([]);
    setSelectedColony(null);
    setUsers([]);
  };

  const handleSelectColony = (colony) => {
    setSelectedColony(colony);
    const allUsers = getUsersByColony(colony.id);
    // Filter out users who eat at mess
    const filteredUsers = allUsers.filter(user => !user.mealEatAtMess);
    setUsers(filteredUsers);
    // Reset expanded users and edits when changing colony
    setExpandedUsers({});
    setUserEdits({});
  };

  const handleBackToColonies = () => {
    setSelectedColony(null);
    setUsers([]);
    setExpandedUsers({});
    setUserEdits({});
  };

  const toggleUserExpansion = (userId) => {
    setExpandedUsers(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const handleSaveUserChanges = (userId) => {
    const editedUser = userEdits[userId];
    if (editedUser) {
      updateUserQtyAndType(userId, editedUser.mealsCount, editedUser.mealType);
      // Clear the edit for this user
      setUserEdits(prev => {
        const newEdits = { ...prev };
        delete newEdits[userId];
        return newEdits;
      });
      // Refresh users list
      if (selectedColony) {
        const allUsers = getUsersByColony(selectedColony.id);
        const filteredUsers = allUsers.filter(user => !user.mealEatAtMess);
        setUsers(filteredUsers);
      }
      alert("Changes saved successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-sky-50 to-white p-6 sm:p-4">
      <header className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-700">Meal Deliveries</h1>
          <p className="text-xs text-gray-500">
            Select area → colony → customer
          </p>
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
        {!selectedArea && (
          <section className="mt-6">
            {/* Welcome Banner */}
            <div className="bg-linear-to-r from-cyan-500 to-slate-600 rounded-3xl p-6 mb-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Select an Area</h2>
                  <p className="text-cyan-100 text-sm">Choose an area to view colonies and manage deliveries</p>
                  <p className="text-cyan-200 text-xs mt-1">{areas.length} areas available</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Areas Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {areas.map((area) => {
                const colonyCount = getColoniesByArea(area.id).length;
                return (
                  <Card
                    key={area.id}
                    className="rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-cyan-300 border-transparent"
                    onClick={() => handleSelectArea(area)}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-cyan-700 mb-1">{area.name}</h3>
                          <p className="text-xs text-gray-500">{colonyCount} {colonyCount === 1 ? 'colony' : 'colonies'}</p>
                        </div>
                        <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-cyan-600">
                        <span className="text-sm font-medium">View Colonies →</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {selectedArea && !selectedColony && (
          <section className="mt-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={handleBackToAreas}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-sm hover:bg-gray-50 transition-colors text-sm font-medium text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Areas
              </button>
              <div className="h-1 w-1 rounded-full bg-gray-400"></div>
              <span className="text-sm font-medium text-gray-600">{selectedArea.name}</span>
            </div>

            {/* Area Info Card */}
            <div className="bg-linear-to-br from-sky-500 to-blue-600 rounded-3xl p-6 mb-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedArea.name}</h2>
                  <p className="text-sky-100 text-sm">Select a colony to view customers</p>
                  <p className="text-sky-200 text-xs mt-1">{colonies.length} colonies available</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Colonies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {colonies.map((colony) => (
                <Card
                  key={colony.id}
                  className="rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-sky-300 border-transparent"
                  onClick={() => handleSelectColony(colony)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-sky-700 mb-1">{colony.name}</h3>
                        <p className="text-xs text-gray-500">Click to view customers</p>
                      </div>
                      <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sky-600">
                      <span className="text-sm font-medium">View →</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {selectedArea && selectedColony && (
          <section className="mt-6">
            {/* Breadcrumb and Colony Info */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={handleBackToColonies}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-sm hover:bg-gray-50 transition-colors text-sm font-medium text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Colonies
                </button>
                <div className="h-1 w-1 rounded-full bg-gray-400"></div>
                <span className="text-sm font-medium text-gray-600">{selectedArea.name}</span>
                <div className="h-1 w-1 rounded-full bg-gray-400"></div>
                <span className="text-sm font-medium text-sky-600">{selectedColony.name}</span>
              </div>

              <div className="bg-linear-to-br from-emerald-500 to-green-600 rounded-3xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedColony.name}</h2>
                    <p className="text-emerald-100 text-sm">{selectedArea.name}</p>
                    <p className="text-emerald-200 text-xs mt-1">{users.length} active customers</p>
                  </div>
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Users Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map((u) => {
                const isExpanded = expandedUsers[u.id];
                const fullUser = getUserById(u.id) || u;
                // Get edited version if exists, otherwise use fullUser
                const editedUser = userEdits[u.id] || fullUser;
                
                return (
                  <Card key={u.id} className="rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <CardContent className="p-0">
                      {/* User Info Header */}
                      <div className="p-4 flex flex-col gap-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-md font-semibold text-sky-700">{fullUser.name}</p>
                            <p className="text-xs text-gray-500 mt-1">{fullUser.address}</p>
                          </div>
                          <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center ml-2">
                            <span className="text-xl font-bold text-sky-600">{fullUser.name[0]}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="text-xs text-sky-600 font-medium bg-sky-50 px-2 py-1 rounded-lg">
                            {editedUser.mealsCount} {editedUser.mealsCount > 1 ? "meals" : "meal"}
                          </span>
                          <span className="text-xs text-cyan-600 font-medium bg-cyan-50 px-2 py-1 rounded-lg capitalize">
                            {editedUser.mealType}
                          </span>
                          <span className="text-xs text-red-600 font-medium bg-red-50 px-2 py-1 rounded-lg">
                            Due: ₹{fullUser.due ?? 0}
                          </span>
                        </div>

                        <button
                          onClick={() => toggleUserExpansion(u.id)}
                          className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-colors mt-2"
                        >
                          {isExpanded ? (
                            <>
                              <span>Hide Details</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            </>
                          ) : (
                            <>
                              <span>View Details</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <div className="px-4 pb-4 space-y-4 border-t border-gray-100 bg-gray-50">
                          <div className="pt-4 space-y-3">
                            {/* Meal Preferences */}
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                              <h3 className="text-sm font-semibold text-gray-700 mb-3">Meal Preferences</h3>
                              
                              <div className="space-y-3">
                                <div>
                                  <label className="text-xs text-gray-500 mb-1 block">Meal Type</label>
                                  <select
                                    value={editedUser.mealType}
                                    onChange={(e) => {
                                      setUserEdits(prev => ({
                                        ...prev,
                                        [u.id]: { ...editedUser, mealType: e.target.value }
                                      }));
                                    }}
                                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-sky-500"
                                  >
                                    <option value="breakfast">Breakfast</option>
                                    <option value="lunch">Lunch</option>
                                    <option value="dinner">Dinner</option>
                                  </select>
                                </div>

                                <div>
                                  <label className="text-xs text-gray-500 mb-1 block">Number of Meals</label>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => {
                                        setUserEdits(prev => ({
                                          ...prev,
                                          [u.id]: { ...editedUser, mealsCount: Math.max(1, editedUser.mealsCount - 1) }
                                        }));
                                      }}
                                      className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold"
                                    >
                                      -
                                    </button>
                                    <input
                                      type="number"
                                      min="1"
                                      max="5"
                                      value={editedUser.mealsCount}
                                      onChange={(e) => {
                                        const value = Number(e.target.value);
                                        if (value >= 1 && value <= 5) {
                                          setUserEdits(prev => ({
                                            ...prev,
                                            [u.id]: { ...editedUser, mealsCount: value }
                                          }));
                                        }
                                      }}
                                      className="flex-1 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-sky-500 text-center"
                                    />
                                    <button
                                      onClick={() => {
                                        setUserEdits(prev => ({
                                          ...prev,
                                          [u.id]: { ...editedUser, mealsCount: Math.min(5, editedUser.mealsCount + 1) }
                                        }));
                                      }}
                                      className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>

                                <div className="pt-2 border-t border-gray-100">
                                  <p className="text-xs text-gray-500">Price per day</p>
                                  <p className="text-lg font-bold text-sky-600">₹{calculatePrice(editedUser.mealType, editedUser.mealsCount)}</p>
                                </div>
                              </div>
                            </div>

                            {/* Additional Info */}
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                              <h3 className="text-sm font-semibold text-gray-700 mb-3">Additional Information</h3>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-xs text-gray-500">Phone</span>
                                  <span className="text-xs font-medium text-gray-700">{fullUser.phone}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-xs text-gray-500">Last Month Total</span>
                                  <span className="text-xs font-medium text-green-600">₹{fullUser.lastMonthTotal ?? 0}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-xs text-gray-500">Current Due</span>
                                  <span className="text-xs font-medium text-red-600">₹{fullUser.due ?? 0}</span>
                                </div>
                              </div>
                            </div>

                            {/* Save Button */}
                            <button
                              onClick={() => handleSaveUserChanges(u.id)}
                              disabled={!userEdits[u.id]}
                              className="w-full px-4 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
