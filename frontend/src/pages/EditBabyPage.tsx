import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getBabyDashboard, updateBaby } from "../services/baby.service";

const EditBabyPage = () => {
  const { babyId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBaby = async () => {
      if (!babyId) return;

      try {
        const baby = await getBabyDashboard(babyId);

        setName(baby.name);
        setBirthDate(baby.birthDate.slice(0, 10));
        setGender(baby.gender);
      } catch (error) {
        console.error("Error loading baby:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBaby();
  }, [babyId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!babyId) return;

    try {
      await updateBaby(babyId, {
        name,
        birthDate: new Date(birthDate).toISOString(),
        gender,
      });

      navigate("/parent-dashboard");
    } catch (error) {
      console.error("Error updating baby:", error);
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
            Modifier les informations de l’enfant
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Nom
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Birth Date */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Date de naissance
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Genre
              </label>
              <select
                value={gender}
                onChange={(e) =>
                  setGender(e.target.value as "MALE" | "FEMALE")
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="MALE">Garçon</option>
                <option value="FEMALE">Fille</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">

              <button
                type="button"
                onClick={() => navigate("/parent-dashboard")}
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

export default EditBabyPage;