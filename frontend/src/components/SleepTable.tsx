import React from "react";

interface Sleep {
  id: string;
  startTime: string;
  endTime: string;
  note?: string;
}

interface SleepTableProps {
  sleepData: Sleep[];
  onEdit?: (sleep: Sleep) => void;
  onDelete?: (id: string) => void;
}

const calculateDuration = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate.getTime() - startDate.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  return diffHours.toFixed(1);
};

const SleepTable: React.FC<SleepTableProps> = ({
  sleepData,
  onEdit,
  onDelete,
}) => {
  if (sleepData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <p className="text-gray-500 text-center">
          Aucun enregistrement de sommeil.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-x-auto">

      <h2 className="text-xl font-semibold text-blue-600 p-6 border-b border-gray-200">
        😴 Sleep Records
      </h2>

      <table className="w-full text-sm text-gray-700">

        {/* HEADER */}
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 text-left font-medium">Start</th>
            <th className="p-3 text-left font-medium">End</th>
            <th className="p-3 text-left font-medium">Duration (hours)</th>
            <th className="p-3 text-left font-medium">Note</th>
            {(onEdit || onDelete) && (
              <th className="p-3 text-center font-medium">Actions</th>
            )}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {sleepData.map((sleep, index) => (
            <tr
              key={sleep.id}
              className={`border-b ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100 transition`}
            >
              <td className="p-3">
                {new Date(sleep.startTime).toLocaleString()}
              </td>

              <td className="p-3">
                {new Date(sleep.endTime).toLocaleString()}
              </td>

              <td className="p-3 font-medium text-blue-600">
                {calculateDuration(
                  sleep.startTime,
                  sleep.endTime
                )}
              </td>

              <td className="p-3">
                {sleep.note || "-"}
              </td>

              {(onEdit || onDelete) && (
                <td className="p-3 text-center space-x-2">

                  {onEdit && (
                    <button
                      onClick={() => onEdit(sleep)}
                      className="bg-yellow-400 text-black px-3 py-1 rounded-lg text-xs font-medium hover:bg-yellow-500 transition"
                    >
                      Edit
                    </button>
                  )}

                  {onDelete && (
                    <button
                      onClick={() => onDelete(sleep.id)}
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

export default SleepTable;