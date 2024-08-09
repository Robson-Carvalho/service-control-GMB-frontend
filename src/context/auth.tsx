import axios from "axios";
import { Api } from "../services/api";

import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IAuthProvider {
  children?: JSX.Element;
}

interface IUser {
  _id?: string;
  name?: string;
  email?: string;
  userType?: string;
}

export interface IContext extends IUser {
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signed: boolean;
  loading: boolean;
}

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingStoreData = async () => {
      const storageUser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:token");

      const localUser = JSON.parse(storageUser as string);

      if (localUser && storageToken) {
        setUser(localUser);

        Api.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`;
      }
      setLoading(false);
    };
    loadingStoreData();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await Api.post("/auth", {
        email,
        password,
      });

      const { userData, token } = response.data;

      setUser(userData);

      Api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      localStorage.setItem("@Auth:token", token);

      localStorage.setItem("@Auth:user", JSON.stringify(userData));

      toast.success("Seja bem-vindo(a)!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const statusCode = error.response.status;

          if (statusCode === 400) {
            throw new Error("E-mail e/ou senha inválidos!");
          } else if (statusCode === 500) {
            throw new Error("Error no servidor!");
          } else {
            throw new Error("Erro na inesperado!");
          }
        } else if (error.request) {
          throw new Error("Error no servidor!");
        } else {
          throw new Error("Error no servidor!");
        }
      } else {
        throw new Error("Error no servidor!");
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("@Auth:token");
    localStorage.removeItem("@Auth:user");
  };

  return (
    <AuthContext.Provider
      value={{ signIn, loading, logout, signed: !!user, ...user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
