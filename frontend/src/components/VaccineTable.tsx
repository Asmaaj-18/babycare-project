import React from "react";

interface Vaccine {
  id: string;
  name: string;
  date: string;
  status: "PENDING" | "DONE" | "MISSED";
  note?: string;
}

interface VaccineTableProps {
  vaccineData: Vaccine[];
  onEdit?: (vaccine: Vaccine) => void;
  onDelete?: (id: string) => void;
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case "DONE":
      return "bg-green-100 text-green-700";
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";
    case "MISSED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-200 text-gray-700";
  }
};

const VaccineTable: React.FC<VaccineTableProps> = ({
  vaccineData,
  onEdit,
  onDelete,
}) => {
  if (vaccineData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <p className="text-gray-500 text-center">
          Aucun vaccin enregistré.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-x-auto">

      <h2 className="text-xl font-semibold text-blue-600 p-6 border-b border-gray-200">
        💉 Vaccination
      </h2>

      <table className="w-full text-sm text-gray-700">

        {/* HEADER */}
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 text-left font-medium">Vaccin</th>
            <th className="p-3 text-left font-medium">Date</th>
            <th className="p-3 text-left font-medium">Statut</th>
            <th className="p-3 text-left font-medium">Note</th>
            {(onEdit || onDelete) && (
              <th className="p-3 text-center font-medium">Actions</th>
            )}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {vaccineData.map((vaccine, index) => (
            <tr
              key={vaccine.id}
              className={`border-b ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100 transition`}
            >
              <td className="p-3 font-medium text-gray-900">
                {vaccine.name}
              </td>

              <td className="p-3">
                {new Date(vaccine.date).toLocaleDateString()}
              </td>

              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                    vaccine.status
                  )}`}
                >
                  {vaccine.status}
                </span>
              </td>

              <td className="p-3">
                {vaccine.note || "-"}
              </td>

              {(onEdit || onDelete) && (
                <td className="p-3 text-center space-x-2">

                  {onEdit && (
                    <button
                      onClick={() => onEdit(vaccine)}
                      className="bg-yellow-400 text-black px-3 py-1 rounded-lg text-xs font-medium hover:bg-yellow-500 transition"
                    >
                      Edit
                    </button>
                  )}

                  {onDelete && (
                    <button
                      onClick={() => onDelete(vaccine.id)}
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

export default VaccineTable;