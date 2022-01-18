import React, { ReactElement, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from './Auth';

const RequireAdmin = ({ children }: { children: ReactElement }) => {
  const { user, verify } = useAuth();
  const location = useLocation();

  useEffect(() => {
    verify();
  }, []);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user.isAdmin) {
    return <Navigate to="/classes" replace />;
  }

  return children;
};

export default RequireAdmin;
