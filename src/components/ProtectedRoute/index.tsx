import { useAuth } from "@/hooks/auth";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center bg-primary-foreground">
        <p className="font-bold text-2xl">Carregando!</p>
      </div>
    );
  } else {
    return signed ? <Outlet /> : <Navigate to="/login" />;
  }
};
