import { Api } from "@/services/api";
import { IUser } from "./types";
import axios from "axios";
import { toast } from "react-toastify";

export function setUserLocalStorage(user: IUser | null) {
  localStorage.setItem("u", JSON.stringify(user));
}

export function getUserLocalStorage() {
  const json = localStorage.getItem("u");

  if (!json) {
    return null;
  }

  const user = JSON.parse(json);

  return user ?? null;
}

export async function LoginRequest(email: string, password: string) {
  try {
    const response = await Api.post("/auth", { email, password });
    toast.success("Seja bem-vindo(a)!");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status == 404) {
        toast.warning("E-mail e/ou senha incorretos!");
      } else if (error.status === 500) {
        toast.error("Erro no servidor. Tente novamente mais tarde.");
      } else {
        toast.error("Erro inesperado. Tente novamente mais tarde.");
      }
    } else {
      toast.error("Erro inesperado. Tente novamente mais tarde.");
    }
    return null;
  }
}
