import { useNavigate } from "react-router-dom";

function AuthChoice() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md text-center border border-primary/10">

        {/* TITLE */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
            🍼 Baby Health Tracker
          </h1>

          <div className="w-16 h-1 bg-secondary mx-auto mt-3 rounded-full"></div>

          <p className="text-gray-500 mt-4 text-sm">
            Suivi médical intelligent pour votre bébé
          </p>
        </div>

        {/* BUTTONS */}
        <div className="space-y-4">

          {/* PARENT BUTTON */}
          <button
            onClick={() => navigate("/login?role=PARENT")}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition duration-300"
          >
            👩‍👦 Espace Parent
          </button>

          {/* DOCTOR BUTTON */}
          <button
            onClick={() => navigate("/login?role=DOCTOR")}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition duration-300"
          >
            👨‍⚕️ Espace Médecin
          </button>

        </div>

      </div>
    </div>
  );
}

export default AuthChoice;