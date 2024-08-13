import axios from "axios";
import { Api } from "./api";
import { IOrderWithCommunity } from "@/interfaces/orderDTOs";

export const orderService = {
  async getOrdersQuantity(): Promise<IOrderWithCommunity[]> {
    try {
      const response = await Api.get<IOrderWithCommunity[]>(
        "/order/with/community"
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const statusCode = error.response.status;
          if (statusCode === 400) {
            throw new Error("Erro ao solicitar Order With Community");
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
