import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getBabyDashboard } from "../services/baby.service";
import { updateSleep } from "../services/sleep.service";
import type { Sleep } from "../services/baby.service";

const EditSleepPage = () => {
  const { babyId, sleepId } = useParams();
  const navigate = useNavigate();

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSleep = async () => {
      if (!babyId || !sleepId) return;

      try {
        const baby = await getBabyDashboard(babyId);
        const sleep = baby.sleep.find(
          (s: Sleep) => s.id === sleepId
        );

        if (sleep) {
          setStartTime(sleep.startTime.slice(0, 16));
          setEndTime(sleep.endTime.slice(0, 16));
          setNote(sleep.note || "");
        }
      } catch (error) {
        console.error("Error loading sleep:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSleep();
  }, [babyId, sleepId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!sleepId) return;

    try {
      await updateSleep(sleepId, {
  startTime: new Date(startTime).toISOString(),
  endTime: new Date(endTime).toISOString(),
  note,
  babyId: babyId!,   
});
      navigate(`/baby/${babyId}`);
    } catch (error) {
      console.error("Error updating sleep:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Chargement...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-10 flex justify-center">
        <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-lg border border-gray-200">

          <h1 className="text-2xl font-bold text-blue-600 mb-6">
            Modifier l'enregistrement de sommeil
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Start Time */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Heure de début
              </label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* End Time */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Heure de fin
              </label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Note */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Note
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">

              <button
                type="button"
                onClick={() => navigate(`/baby/${babyId}`)}
                className="px-5 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                Annuler
              </button>

              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-md"
              >
                Enregistrer
              </button>

            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default EditSleepPage;