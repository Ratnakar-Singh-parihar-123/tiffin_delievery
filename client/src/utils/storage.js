import data from "./data.json";

// LocalStorage keys
const KEY_AREAS = "meal_app_areas_v2";
const KEY_COLONIES = "meal_app_colonies_v2";
const KEY_USERS = "meal_app_users_v2";

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    console.error("storage read error", e);
    return fallback;
  }
}

function write(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Initialize localStorage with JSON data if not already stored
(function init() {
  // Clear old version storage keys to ensure clean state
  localStorage.removeItem("meal_app_areas_v1");
  localStorage.removeItem("meal_app_colonies_v1");
  localStorage.removeItem("meal_app_users_v1");
  localStorage.removeItem("userPreferences");

  if (!localStorage.getItem(KEY_AREAS)) write(KEY_AREAS, data.areas);
  if (!localStorage.getItem(KEY_COLONIES)) write(KEY_COLONIES, data.colonies);

  if (!localStorage.getItem(KEY_USERS)) {
    const users = (data.users || []).map((u) => ({
      ...u,
      mealType: u.mealType || "breakfast",
      mealsCount: u.mealsCount || 1,
      mealEatAtMess: false,
    }));
    write(KEY_USERS, users);
  } else {
    // Add mealEatAtMess property to existing users if it doesn't exist
    const existingUsers = read(KEY_USERS, []);
    const updatedUsers = existingUsers.map((u) => ({
      ...u,
      mealEatAtMess: u.mealEatAtMess !== undefined ? u.mealEatAtMess : false,
    }));
    write(KEY_USERS, updatedUsers);
  }
})();

// ===== Area and Colony =====
export function getAreas() {
  return read(KEY_AREAS, []);
}

export function getColoniesByArea(areaId) {
  const cols = read(KEY_COLONIES, []);
  return cols.filter((c) => c.areaId === areaId);
}

// ===== Users =====
export function getUsersByColony(colonyId) {
  const users = read(KEY_USERS, []);
  return users.filter((u) => u.colonyId === colonyId);
}

export function getUserById(userId) {
  const users = read(KEY_USERS, []);
  return users.find((u) => u.id === userId) || null;
}

export function markDeliveredForUser(userId, dateStr = null) {
  const users = read(KEY_USERS, []);
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return null;
  const d = dateStr || new Date().toISOString().slice(0, 10);
  users[idx].deliveryLog = users[idx].deliveryLog || {};
  users[idx].deliveryLog[d] = true;
  write(KEY_USERS, users);
  return users[idx];
}

export function toggleDeliveryForUser(userId, dateStr) {
  const users = read(KEY_USERS, []);
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return null;
  users[idx].deliveryLog = users[idx].deliveryLog || {};
  users[idx].deliveryLog[dateStr] = !users[idx].deliveryLog[dateStr];
  write(KEY_USERS, users);
  return users[idx];
}

export function updateUserQtyAndType(userId, newQty, newType) {
  const users = read(KEY_USERS, []);
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return null;
  users[idx].mealsCount = Number(newQty);
  users[idx].mealType = newType;
  write(KEY_USERS, users);
  return users[idx];
}

// Optional: store user preferences
export const getUser = () => {
  try {
    const data = localStorage.getItem("userPreferences_v2");
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error getting user preferences:", error);
    return null;
  }
};

export const saveUser = (userData) => {
  try {
    const payload = {
      ...userData,
      mealType: userData.mealType || "breakfast",
      mealsCount: userData.mealsCount || 1,
    };
    localStorage.setItem("userPreferences_v2", JSON.stringify(payload));
  } catch (error) {
    console.error("Error saving user preferences:", error);
  }
};

export function toggleMealEatAtMess(userId) {
  const users = read(KEY_USERS, []);
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return null;
  users[idx].mealEatAtMess = users[idx].mealEatAtMess || false;
  users[idx].mealEatAtMess = !users[idx].mealEatAtMess;
  write(KEY_USERS, users);
  return users[idx];
}

export function getAllUsers() {
  const users = read(KEY_USERS, []);
  const areas = read(KEY_AREAS, []);
  const colonies = read(KEY_COLONIES, []);
  
  return users.map(user => {
    const colony = colonies.find(c => c.id === user.colonyId);
    const area = colony ? areas.find(a => a.id === colony.areaId) : null;
    
    return {
      ...user,
      colonyName: colony?.name || 'N/A',
      areaName: area?.name || 'N/A'
    };
  });
}