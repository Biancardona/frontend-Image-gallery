import { createContext, useState } from 'react';

//Crear una variable que almacene o cree el CreateContext
const AuthContext = createContext();
//Create a function o component father that it's going to wrap all the others apps
//Que retorne el context y el provider

//Inside the provider is going to be all the children components
//VALUE is a prop required in the AuthContext
//Pasandole un objeto con todos los valores que van estar disponibles cuando se llame el custom Hook
//auth, setAuth para que ese state este disponible en el context
const AuthProvider = ({ children }) => {
  //If the object has information, means the user is autenticated
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };
export default AuthContext;
