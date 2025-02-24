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
import Notifications from './pages/Notifications';
import { useAuth, AuthProvider } from './components/authContext';
import YummyTerms from './pages/Yummy_terms';



//protect route
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated === null) {
    return <div className="flex items-center justify-center"><p className='loader'></p></div>;
  }

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
        element: <ProtectedRoute><Recipe /></ProtectedRoute>
      },
      {
        path: 'about_us',
        element: <AboutUs />
      },
      {
        path: 'terms',
        element: <Terms />
      },
      {
        path: 'yummy_terms',
        element: <YummyTerms />
      },
      {
        path: 'notifications',
        element: <ProtectedRoute><Notifications /></ProtectedRoute>
      },
    ],
    errorElement: <NotFound />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
