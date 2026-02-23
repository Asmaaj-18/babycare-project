import { useNavigate, useParams } from "react-router-dom";
import SleepForm from "../components/SleepForm";
import { createSleep } from "../services/sleep.service";

const AddSleepPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleSubmit = async (data: {
    startTime: string;
    endTime: string;
    note?: string;
  }) => {
    if (!id) return;

    await createSleep({
      ...data,
      babyId: id,
    });

    navigate(`/baby/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 w-full max-w-lg">

        <h1 className="text-2xl font-bold text-blue-600 mb-6">
          ➕ Ajouter un enregistrement de sommeil
        </h1>

        <SleepForm onSubmit={handleSubmit} />

      </div>
    </div>
  );
};

export default AddSleepPage;