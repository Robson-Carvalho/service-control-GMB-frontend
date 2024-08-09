import { useContext } from "react";
import { AuthContext } from ".";

export const useAuth = () => {
  const conetxt = useContext(AuthContext);

  return conetxt;
};
