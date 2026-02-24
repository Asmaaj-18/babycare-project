import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BabyCard from "../components/BabyCard";
import BabyForm from "../components/BabyForm";
import {
  getBabies,
  createBaby,
  deleteBaby,
} from "../services/baby.service";

import type { Baby } from "../services/baby.service";

const ParentDashboard = () => {
  const [babies, setBabies] = useState<Baby[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadBabies = async () => {
      try {
        const data = await getBabies();
        setBabies(data);
      } catch (error) {
        console.error("Error loading babies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBabies();
  }, []);

  const handleCreate = async (data: {
    name: string;
    birthDate: string;
    gender: "MALE" | "FEMALE";
  }) => {
    const newBaby = await createBaby(data);
    setBabies((prev) => [...prev, newBaby]);
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    await deleteBaby(id);
    setBabies((prev) => prev.filter((b) => b.id !== id));
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Chargement des données...
      </div>
    );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-10 max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            Espace Parent
          </h1>

          <p className="text-gray-500">
            Gérez et consultez le suivi médical de votre enfant
          </p>

          <div className="w-20 h-1 bg-yellow-400 mt-4 rounded-full"></div>
        </div>

        {/* ACTION BAR */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="
          flex items-center gap-2
          bg-gradient-to-r from-blue-600 to-indigo-600
          text-white 
          px-6 py-3 
          rounded-2xl 
          shadow-lg 
          hover:from-blue-700 hover:to-indigo-700
          hover:shadow-xl 
          transform hover:-translate-y-1 
          transition-all duration-300 
          font-semibold
          "
        >
          <span className="text-lg">+</span>
          {showForm ? "Annuler" : "Ajouter un enfant"}
        </button>

        {/* FORM */}
        {showForm && (
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-10 mt-6">
            <h2 className="text-lg font-semibold text-blue-600 mb-6">
              Informations de l’enfant
            </h2>

            <BabyForm onSubmit={handleCreate} />
          </div>
        )}

        {/* BABY LIST */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mt-10">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-blue-600">
              Enfants enregistrés
            </h2>

            <span className="text-sm text-gray-400">
              {babies.length} dossier(s)
            </span>
          </div>

          <div className="border-t border-gray-100 pt-6">

            {babies.length === 0 ? (
              <p className="text-gray-500 text-center">
                Aucun enfant enregistré pour le moment.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {babies.map((baby) => (
                  <BabyCard
                    key={baby.id}
                    {...baby}
                    onSelect={(id: string) =>
                      navigate(`/baby/${id}`)
                    }
                    onEdit={(id: string) =>
                      navigate(`/baby/${id}/edit`)
                    }
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}

          </div>
        </div>

      </div>
    </>
  );
};

export default ParentDashboard;