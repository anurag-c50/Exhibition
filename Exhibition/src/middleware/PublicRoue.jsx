import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function PublicRoute({ element, redirectTo }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('Auth'))
    if (auth) {
      setIsAuthenticated(true)
      const userRole = JSON.parse(localStorage.getItem('UserData'))?.userType;
      setRole(userRole);
    } else {  
      setIsAuthenticated(false)
    }
    console.log('public')
  }, []);

  if (isAuthenticated === null) {
    console.log(isAuthenticated)
    return null
  }
  if (isAuthenticated) {
    console.log(role)
    if (role === '1') {
      return <Navigate to="/admindashbord" />
    } else if (role === '3') {
      return <Navigate to="/branddashbord" />
    } else if (role === '4') {
      return <Navigate to="/staffdashbord" />
    } else {
      return <Navigate to={redirectTo} />
    }
  }
  return element
}
