import axios from "axios";
import { Api } from "./api";
import { IOrder } from "@/interfaces/IOrder";

export const orderService = {
  async getOrders(): Promise<IOrder[]> {
    try {
      const response = await Api.get<IOrder[]>("/order");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const statusCode = error.response.status;
          if (statusCode === 400) {
            throw new Error("Erro ao solicitar orders");
          } else if (statusCode === 500) {
            throw new Error("Erro no servidor!");
          } else {
            throw new Error("Erro inesperado!");
          }
        } else if (error.request) {
          throw new Error("Erro no servidor!");
        } else {
          throw new Error("Erro no servidor!");
        }
      } else {
        throw new Error("Erro no servidor!");
      }
    }
  },
};
