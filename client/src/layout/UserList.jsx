// src/layout/UserList.jsx

export default function UserList({ users = [], onBack, onOpenUser }) {
  return (
    <div className="space-y-3 pb-20">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-3 py-2 rounded-lg bg-white shadow text-sm"
        >
          ← Back
        </button>
        <p className="text-sm text-gray-600">Customers</p>
        <div className="w-10" />
      </div>

      {users.map((u) => (
        <div
          key={u.id}
          className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm"
        >
          <div>
            <p className="text-md font-semibold text-sky-700">{u.name}</p>
            <p className="text-xs text-gray-500">{u.address}</p>
              <p className="text-xs text-sky-600 mt-1">
              {u.mealsCount} • {u.mealType} (Breakfast, Lunch, Dinner)
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <button
              onClick={() => onOpenUser(u)}
              className="px-3 py-2 bg-emerald-500 text-white rounded-xl text-sm shadow hover:brightness-95"
            >
              Details
            </button>
              <p className="text-xs text-gray-500">Due: ₹{u.due ?? 0} per meal</p>
          </div>
        </div>
      ))}
    </div>
  );
}
