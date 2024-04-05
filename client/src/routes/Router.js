import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

/****Layouts*****/
const FullLayout = lazy(() => import('../layouts/FullLayout.js'));

/***** Pages ****/

const Starter = lazy(() => import('../views/Starter.js'));
const Login = lazy(() => import('../views/Login.js'));
const Register = lazy(() => import('../views/Register.js'));

const Tables = lazy(() => import('../views/ui/Tables'));

/*****Routes******/

const ThemeRoutes = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to='/starter' /> },
      { path: '/starter', exact: true, element: <Starter /> },
      { path: '/table', exact: true, element: <Tables /> },
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
