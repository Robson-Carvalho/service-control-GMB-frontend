import { createContext, useEffect, useState } from "react";
import { IAuthProvider, IContext, IUser } from "./types";
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from "./util";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const user = getUserLocalStorage();

    if (user) {
      setIsAuthenticated(true);
      setUser(user);
    }
  }, []);

  async function authenticate(email: string, password: string) {
    const response = await LoginRequest(email, password);

    const paylod = { token: response.token, user: response.user };

    setUser(paylod);
    setUserLocalStorage(paylod);
    setIsAuthenticated(true);
  }

  async function logout() {
    setUser(null);
    setUserLocalStorage(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{ ...user, isAuthenticated, authenticate, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
