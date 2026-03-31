import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('/user/me');
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  if (!authChecked) return null;
  if (!isLoggedIn) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
};

const AdminRoute = ({ children }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get('/user/me');
        setIsAdmin(res.data.role === 'admin');
      } catch {
        setIsAdmin(false);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAdmin();
  }, []);

  if (!authChecked) return null;
  if (!isAdmin) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
};

export { ProtectedRoute, AdminRoute };