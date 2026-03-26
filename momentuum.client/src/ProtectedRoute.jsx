import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

/**
 * ProtectedRoute
 *
 * Renders child routes if the user is authenticated, otherwise redirects to the login page.
 *
 * Authentication check is intentionally simple and based on presence of an "authToken" in localStorage.
 * Replace the check with your app's auth logic (context, redux selector, hook, etc.) as needed.
 */
export default function ProtectedRoute({ redirectTo = '/login' }) {
  const location = useLocation();

  const isAuthenticated = (() => {
    try {
      const token = localStorage.getItem('authToken');
      return Boolean(token);
    } catch {
      return false;
    }
  })();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <Outlet />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  redirectTo: PropTypes.string,
};