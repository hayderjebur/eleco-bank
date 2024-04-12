import React, { useContext } from 'react';
import {
  Route,
  Redirect,
  useNavigate,
  useLocation,
  Navigate,
  BrowserRouter as Router,
} from 'react-router-dom';
import authContext from '../context/auth/authContext';
import Login from '../views/Login';

const PrivateRoute = ({ component: Component, children, ...rest }) => {
  const AuthContext = useContext(authContext);
  const navigate = useNavigate();
  let location = useLocation();

  const { isAuthenticated, loading } = AuthContext;

  return !isAuthenticated && !loading ? (
    <Navigate to='/login' state={{ from: location }} replace />
  ) : (
    children
  );
};

export default PrivateRoute;
