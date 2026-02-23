import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../services/auth.service";
import { useAuth } from "../context/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Sécurisation du rôle
  const roleParam = searchParams.get("role");
  const role = roleParam === "DOCTOR" ? "DOCTOR" : "PARENT";

  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(formData.email, formData.password);

      // Vérifie que l'utilisateur correspond à l’espace choisi
      if (data.user.role !== role) {
        setError("Vous essayez de vous connecter dans le mauvais espace.");
        setLoading(false);
        return;
      }

      localStorage.setItem("accessToken", data.token);
      setUser(data.user);

      // Redirection forcée selon le rôle choisi
      if (role === "PARENT") {
        navigate("/parent-dashboard");
      } else {
        navigate("/doctor-dashboard");
      }

    } catch {
  setError("Email ou mot de passe incorrect.");
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md border border-blue-100">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 tracking-wide">
            🍼 Baby Health Tracker
          </h1>

          <div className="w-16 h-1 bg-yellow-400 mx-auto mt-3 rounded-full"></div>

          <p className="text-gray-500 mt-4 text-sm">
            Connexion {role === "DOCTOR" ? "Médecin" : "Parent"}
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="email"
            name="email"
            placeholder="Adresse email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />

          {/* MESSAGE ERREUR */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* BOUTON CONNEXION COLORÉ */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition duration-300 disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>

        </form>

        {/* REGISTER LINK */}
        <p className="text-sm mt-6 text-center text-gray-500">
          Pas encore de compte ?{" "}
          <span
            onClick={() => navigate(`/register?role=${role}`)}
            className="text-blue-600 font-medium cursor-pointer hover:underline"
          >
            Créer un compte
          </span>
        </p>

        {/* SECURITY MESSAGE */}
        <div className="mt-8 text-center text-xs text-gray-400 border-t pt-4">
          🔒 Plateforme sécurisée conforme aux normes médicales
        </div>

      </div>
    </div>
  );
};

export default Login;