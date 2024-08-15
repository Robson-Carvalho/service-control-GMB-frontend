import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export const Api = axios.create({ baseURL });

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("@Auth:token");
      localStorage.removeItem("@Auth:user");
      window.location.reload();
    }

    return Promise.reject(error);
  }
);
