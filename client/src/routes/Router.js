import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.js';

/****Layouts*****/
const FullLayout = lazy(() => import('../layouts/FullLayout.js'));

/***** Pages ****/

const Starter = lazy(() => import('../views/Starter.js'));
const Login = lazy(() => import('../views/Login.js'));
const Register = lazy(() => import('../views/Register.js'));

/*****Routes******/

const ThemeRoutes = [
  {
    path: '/',
    element: (
      <PrivateRoute>
        <FullLayout />
      </PrivateRoute>
    ),
    children: [
      { path: '/', element: <Navigate to='/starter' /> },
      { path: '/starter', exact: true, element: <Starter /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
];

export default ThemeRoutes;
