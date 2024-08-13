import axios from "axios";
import { Api } from "./api";
import {
  ICreateInhabitantDTO,
  IInhabitant,
  IUpdateInhabitantDTO,
} from "@/interfaces/inhabitantDTOs";

export const inhabitantService = {
  async create(data: ICreateInhabitantDTO) {
    try {
      const response = await Api.post("/inhabitant", data);
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

  async getAll(): Promise<IInhabitant[]> {
    try {
      const response = await Api.get<IInhabitant[]>("/inhabitant");
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

  async update(_id: string, inhabitant: IUpdateInhabitantDTO) {
    try {
      const response = await Api.put(`/inhabitant/${_id}`, inhabitant);

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
