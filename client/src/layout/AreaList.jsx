// src/layout/AreaList.jsx
import React from "react";

export default function AreaList({ areas = [], onSelectArea }) {
  return (
    <div className="space-y-3">
      {areas.map((area) => (
        <div
          key={area.id}
          className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm"
        >
          <div>
            <p className="text-lg font-semibold text-sky-700">{area.name}</p>
            {/* <p className="text-xs text-gray-500">Tap to view colonies</p> */}
          </div>
          <button className="bg-sky-500 text-white px-3 py-2 cursor-pointer rounded-lg"
            onClick={() => onSelectArea(area)}
            // If any references to meal type or per meal quantity exist, change them to milk type and liters terminology.
          >
            View Colonies
          </button>
        </div>
      ))}
    </div>
  );
}
