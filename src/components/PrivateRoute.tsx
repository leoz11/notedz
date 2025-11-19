import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen font-fira">
        <div className="text-xl">Carregando...</div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
