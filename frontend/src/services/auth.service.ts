import api from "./api";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "PARENT" | "DOCTOR";
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "PARENT" | "DOCTOR";
  };
}

// 📝 REGISTER
export const register = async (
  data: RegisterData
): Promise<AuthResponse> => {
  const res = await api.post("/auth/register", data);

  // 🔐 Sauvegarde token
  localStorage.setItem("accessToken", res.data.token);

  // 👤 Sauvegarde user
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res.data;
};

// 🔑 LOGIN
export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", {
    email,
    password,
  });

  // 🔐 Sauvegarde token
  localStorage.setItem("accessToken", res.data.token);

  // 👤 Sauvegarde user
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res.data;
};