import { useAuth } from "@/hooks/auth";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return (
      <div className="page flex flex-col min-h-screen bg-primary-foreground">
        <div className="flex-grow  px-2 py-3  mx-auto">
          <p className="font-bold text-2xl"></p>
        </div>
      </div>
    );
  } else {
    return signed ? <Outlet /> : <Navigate to="/login" />;
  }
};
