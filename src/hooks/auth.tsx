import { AuthContext } from "../context/auth";
import { useContext } from "react";

export const useAuth = () => {
  const conetxt = useContext(AuthContext);

  return conetxt;
};
