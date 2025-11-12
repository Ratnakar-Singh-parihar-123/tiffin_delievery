// src/layout/ColonyList.jsx
import React from "react";

export default function ColonyList({ colonies = [], onBack, onSelectColony }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-3 py-2 rounded-lg bg-white shadow text-sm"
        >
          ← Back
        </button>
        <p className="text-sm text-gray-600">Colonies</p>
        <div className="w-10" /> {/* spacer */}
      </div>

      {colonies.map((c) => (
        <div
          key={c.id}
          className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm"
        >
          <div>
            <p className="text-md font-medium text-sky-700">{c.name}</p>
            <p className="text-xs text-gray-500">Click to see customers</p>
          </div>
          <button
            onClick={() => onSelectColony(c)}
            className="px-3 py-2 bg-sky-500 text-white rounded-xl text-sm shadow hover:brightness-95"
          >
            View Users
          </button>
        </div>
      ))}
    </div>
  );
}
