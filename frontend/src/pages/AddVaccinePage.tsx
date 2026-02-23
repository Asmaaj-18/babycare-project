import { useNavigate, useParams } from "react-router-dom";
import VaccineForm from "../components/VaccineForm";
import { createVaccine } from "../services/vaccine.service";

const AddVaccinePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleSubmit = async (data: {
    name: string;
    date: string;
    status: "PENDING" | "DONE" | "MISSED";
    note?: string;
  }) => {
    if (!id) return;

    await createVaccine({
      ...data,
      babyId: id,
    });

    navigate(`/baby/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 w-full max-w-lg">

        <h1 className="text-2xl font-bold text-blue-600 mb-6">
          💉 Ajouter un vaccin
        </h1>

        <VaccineForm onSubmit={handleSubmit} />

        <button
          onClick={() => navigate(-1)}
          className="mt-6 text-blue-600 hover:text-blue-800 font-medium transition"
        >
          Annuler
        </button>

      </div>
    </div>
  );
};

export default AddVaccinePage;