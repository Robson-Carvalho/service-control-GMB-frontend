import axios from "axios";
import { Api } from "./api";

import {
  ICommunity,
  ICreateCommunityDTO,
  IUpdateCommunityDTO,
} from "@/interfaces/communityDTOs";

export const communityService = {
  async create(community: ICreateCommunityDTO) {
    try {
      const response = await Api.post("/community", community);
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

  async getAll(): Promise<ICommunity[]> {
    try {
      const response = await Api.get<ICommunity[]>("/community");
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

  async update(_id: string, inhabitant: IUpdateCommunityDTO) {
    try {
      const response = await Api.put(`/community/${_id}`, inhabitant);

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

  async delete(_id: string) {
    try {
      const response = await Api.delete(`/community/${_id}`);

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
