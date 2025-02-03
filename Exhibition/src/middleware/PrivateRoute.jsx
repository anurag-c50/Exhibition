import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function PrivateRoute({ element, redirectTo, requiredRole }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('Auth'))
    const role = JSON.parse(localStorage.getItem('UserData'))?.userType
    setIsAuthenticated(!!auth);
    setUserRole(role)
    console.log('private')
  }, [])

  if (isAuthenticated === null) {
    return null 
  }
  if (!isAuthenticated || (requiredRole && userRole !== requiredRole)) {
    return <Navigate to={redirectTo} />
  }

  return element;
}