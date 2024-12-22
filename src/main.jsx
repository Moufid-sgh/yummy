import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Navigate, useLocation } from "react-router-dom";

import Login from './pages/Login.jsx';
import Compte from './pages/Compte.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Layout from '../Layout';
import MyRecipes from './pages/MyRecipes';
import Recipe from './pages/recipe';
import Category from './pages/Category';
import AboutUs from './pages/AboutUs';
import Terms from './pages/Terms';


//check cookies
// const checkAuthCookie = () => {
//   const cookies = document.cookie.split(';');
//   const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth'));
//   return !!authCookie;
// };

const checkAuthCookie = () => {
  const cookies = document.cookie.split(';');
  console.log('Tous les cookies:', cookies);
  
  const authCookie = cookies.find(cookie => 
    cookie.trim().startsWith('auth=')
  );
  
  console.log('Cookie auth trouvé:', authCookie);
  return !!authCookie;
};

//protect route
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = checkAuthCookie();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'compte',
        element: <ProtectedRoute><Compte /></ProtectedRoute>
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'MyRecipes',
        element: <ProtectedRoute><MyRecipes /></ProtectedRoute>
      },
      {
        path: 'category/:category',
        element: <Category />
      },
      {
        path: 'recipe/:id',
        element: <Recipe />
      },
      {
        path: 'about_us',
        element: <AboutUs />
      },
      {
        path: 'terms',
        element: <Terms />
      },
    ],
    errorElement: <NotFound />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
