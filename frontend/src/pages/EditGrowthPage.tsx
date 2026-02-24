import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getBabyDashboard } from "../services/baby.service";
import { updateGrowth } from "../services/growth.service";
import type { Growth } from "../services/baby.service";

const EditGrowthPage = () => {
  const { babyId, growthId } = useParams();
  const navigate = useNavigate();

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [headSize, setHeadSize] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGrowth = async () => {
      if (!babyId || !growthId) return;

      try {
        const baby = await getBabyDashboard(babyId);
        const growth = baby.growth.find(
  (g: Growth) => g.id === growthId
);

        if (growth) {
          setWeight(growth.weight.toString());
          setHeight(growth.height.toString());
          setHeadSize(growth.headSize?.toString() || "");
        }
      } catch (error) {
        console.error("Error loading growth:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGrowth();
  }, [babyId, growthId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!growthId) return;

    try {
      await updateGrowth(growthId, {
        weight: Number(weight),
        height: Number(height),
        headSize: headSize ? Number(headSize) : undefined,
      });

      navigate(`/baby/${babyId}`);
    } catch (error) {
      console.error("Error updating growth:", error);
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
            Modifier la mesure de croissance
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Poids (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Taille (cm)
              </label>
              <input
                type="number"
                step="0.1"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Head Size */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Tour de tête (cm)
              </label>
              <input
                type="number"
                step="0.1"
                value={headSize}
                onChange={(e) => setHeadSize(e.target.value)}
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

export default EditGrowthPage;