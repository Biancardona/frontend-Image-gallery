//Context its going to extract all the info (state) from the AuthContext
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

//UseContext is going to make available the values of the provider(AuthContext)
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
