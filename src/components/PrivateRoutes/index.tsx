import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth/index";

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
