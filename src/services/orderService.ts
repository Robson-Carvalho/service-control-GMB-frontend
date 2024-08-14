import axios from "axios";
import { Api } from "./api";
import {
  ICreateOrderDTO,
  IOrderDataTable,
  IOrderWithCommunity,
  IUpdateOrderDTO,
} from "@/interfaces/orderDTOs";

export const orderService = {
  async create(createData: ICreateOrderDTO) {
    try {
      const response = await Api.post("/order", createData);
      const { data } = response;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const message = error.response.data.error;

          const statusCode = error.response.status;

          if (statusCode === 400) {
            throw new Error(message);
          } else if (statusCode == 401) {
            throw new Error(message);
          } else if (statusCode === 500) {
            throw new Error(message);
          } else {
            throw new Error(message);
          }
        } else if (error.request) {
          throw new Error(
            "Não foi possível conectar ao servidor. Por favor, tente novamente mais tarde."
          );
        } else {
          throw new Error(
            "Ocorreu um erro desconhecido ao processar a solicitação."
          );
        }
      } else {
        throw new Error(
          "Ocorreu um erro desconhecido ao processar a solicitação."
        );
      }
    }
  },

  async getOrdersQuantity(): Promise<IOrderWithCommunity[]> {
    try {
      const response = await Api.get<IOrderWithCommunity[]>(
        "/order/with/community"
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const message = error.response.data.error;

          const statusCode = error.response.status;

          if (statusCode === 400) {
            throw new Error(message);
          } else if (statusCode == 401) {
            throw new Error(message);
          } else if (statusCode === 500) {
            throw new Error(message);
          } else {
            throw new Error(message);
          }
        } else if (error.request) {
          throw new Error(
            "Não foi possível conectar ao servidor. Por favor, tente novamente mais tarde."
          );
        } else {
          throw new Error(
            "Ocorreu um erro desconhecido ao processar a solicitação."
          );
        }
      } else {
        throw new Error(
          "Ocorreu um erro desconhecido ao processar a solicitação."
        );
      }
    }
  },

  async getAll(): Promise<IOrderDataTable[]> {
    try {
      const response = await Api.get<IOrderDataTable[]>("/order/data/view");
      const { data } = response;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const message = error.response.data.error;

          const statusCode = error.response.status;

          if (statusCode === 400) {
            throw new Error(message);
          } else if (statusCode == 401) {
            throw new Error(message);
          } else if (statusCode === 500) {
            throw new Error(message);
          } else {
            throw new Error(message);
          }
        } else if (error.request) {
          throw new Error(
            "Não foi possível conectar ao servidor. Por favor, tente novamente mais tarde."
          );
        } else {
          throw new Error(
            "Ocorreu um erro desconhecido ao processar a solicitação."
          );
        }
      } else {
        throw new Error(
          "Ocorreu um erro desconhecido ao processar a solicitação."
        );
      }
    }
  },

  async update(_id: string, updateData: IUpdateOrderDTO) {
    try {
      const response = await Api.put(`/order/${_id}`, { ...updateData });
      const { data } = response;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const message = error.response.data.error;

          const statusCode = error.response.status;

          if (statusCode === 400) {
            throw new Error(message);
          } else if (statusCode == 401) {
            throw new Error(message);
          } else if (statusCode === 500) {
            throw new Error(message);
          } else {
            throw new Error(message);
          }
        } else if (error.request) {
          throw new Error(
            "Não foi possível conectar ao servidor. Por favor, tente novamente mais tarde."
          );
        } else {
          throw new Error(
            "Ocorreu um erro desconhecido ao processar a solicitação."
          );
        }
      } else {
        throw new Error(
          "Ocorreu um erro desconhecido ao processar a solicitação."
        );
      }
    }
  },
};
