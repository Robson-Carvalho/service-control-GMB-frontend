import axios from "axios";
import { Api } from "./api";
import { IInhabitant } from "@/interfaces/IInhabitant";

interface IUpdateInhabitantResponse {
  message: string;
  inhabitant: {
    _id: string;
    name: string;
    cpf: string;
    numberPhone: string;
    address: {
      community: string;
      street: string;
      number: string;
    };
  };
}

export interface IUpdateInhabitantRequest {
  _id: string;
  name: string;
  cpf: string;
  numberPhone: string;
  address: {
    community: string;
    street: string;
    number: string;
  };
}

export const inhabitantService = {
  async getAllInhabitant(): Promise<IInhabitant[]> {
    try {
      const response = await Api.get<IInhabitant[]>("/inhabitant");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const statusCode = error.response.status;
          if (statusCode === 400) {
            throw new Error("Erro ao buscar todos os habitantes");
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

  async updateInhabitant(
    _id: string,
    inhabitant: IUpdateInhabitantRequest
  ): Promise<IUpdateInhabitantResponse> {
    try {
      const response = await Api.put<IUpdateInhabitantResponse>(
        `/inhabitant/${_id}`,
        inhabitant
      );
      const { data } = response;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const statusCode = error.response.status;
          if (statusCode === 400) {
            throw new Error("Erro ao atualizar habitante");
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
