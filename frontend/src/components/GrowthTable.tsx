import React from "react";
import type { Growth } from "../services/baby.service";

interface GrowthTableProps {
  growthData: Growth[];
  onEdit?: (growth: Growth) => void;
  onDelete?: (id: string) => void;
}

const GrowthTable: React.FC<GrowthTableProps> = ({
  growthData,
  onEdit,
  onDelete,
}) => {
  if (growthData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <p className="text-gray-500 text-center">
          Aucun enregistrement de croissance.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-x-auto">

      <h2 className="text-xl font-semibold text-blue-600 p-6 border-b border-gray-200">
        📏 Growth Records
      </h2>

      <table className="w-full text-sm text-gray-700">

        {/* HEADER */}
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 text-left font-medium">Date</th>
            <th className="p-3 text-left font-medium">Weight (kg)</th>
            <th className="p-3 text-left font-medium">Height (cm)</th>
            <th className="p-3 text-left font-medium">Head Size (cm)</th>
            {(onEdit || onDelete) && (
              <th className="p-3 text-center font-medium">Actions</th>
            )}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {growthData.map((growth, index) => (
            <tr
              key={growth.id}
              className={`border-b ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100 transition`}
            >
              <td className="p-3">
                {new Date(growth.createdAt).toLocaleDateString()}
              </td>

              <td className="p-3 font-medium text-blue-600">
                {growth.weight}
              </td>

              <td className="p-3">
                {growth.height}
              </td>

              <td className="p-3">
                {growth.headSize ?? "-"}
              </td>

              {(onEdit || onDelete) && (
                <td className="p-3 text-center space-x-2">

                  {onEdit && (
                    <button
                      onClick={() => onEdit(growth)}
                      className="bg-yellow-400 text-black px-3 py-1 rounded-lg text-xs font-medium hover:bg-yellow-500 transition"
                    >
                      Edit
                    </button>
                  )}

                  {onDelete && (
                    <button
                      onClick={() => onDelete(growth.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  )}

                </td>
              )}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default GrowthTable;