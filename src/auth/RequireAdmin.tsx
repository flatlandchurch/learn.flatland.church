import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from './Auth';

const RequireAdmin = ({ children }: { children: ReactElement }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user.isAdmin) {
    return <Navigate to="/classes" replace />;
  }

  return children;
};

export default RequireAdmin;
