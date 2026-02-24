import { useNavigate, useParams } from "react-router-dom";
import GrowthForm from "../components/GrowthForm";
import { createGrowth } from "../services/growth.service";


const AddGrowthPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleSubmit = async (data: {
    height: number;
    weight: number;
    headSize?: number;
  }) => {
    if (!id) return;

    await createGrowth({
      ...data,
      babyId: id,
    });

    navigate(`/baby/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 w-full max-w-lg">

        <h1 className="text-2xl font-bold text-blue-600 mb-6">
          ➕ Ajouter une mesure de croissance
        </h1>

        <GrowthForm onSubmit={handleSubmit} />

      </div>
    </div>
  );
};

export default AddGrowthPage;