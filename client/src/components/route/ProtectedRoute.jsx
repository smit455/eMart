import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({isAdmin}) => {
  const { isAuthenticated, loading,user } = useSelector(state => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }
  if(isAdmin===true && user.role!=='admin'){
    return <Navigate to="/" />
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
