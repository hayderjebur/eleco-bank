import React, { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import authContext from '../context/auth/authContext';

const PrivateRoute = ({ component: Component, children, ...rest }) => {
  const AuthContext = useContext(authContext);
  let location = useLocation();

  const { isAuthenticated, loading } = AuthContext;

  return !isAuthenticated && !loading ? (
    <Navigate to='/login' state={{ from: location }} replace />
  ) : (
    children
  );
};

export default PrivateRoute;
