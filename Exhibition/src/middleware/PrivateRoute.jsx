import {Navigate} from 'react-router-dom';
export default function PrivateRoute({ element ,redirectTo}){
  const isAuth = () => {return !!JSON.parse(localStorage.getItem('Auth'))}

  return isAuth() ? element : <Navigate to={redirectTo} />;;
};
