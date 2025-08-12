import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message = error.response.data?.message || "Erro ao buscar dados";
      return Promise.reject(new Error(message));
    }
    return Promise.reject(error);
  },
);

export default api;
