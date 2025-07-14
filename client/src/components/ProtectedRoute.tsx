import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
