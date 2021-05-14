import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [auth, setAuth] = useState(false);
  const [logout, setLogout] = useState(false);

  return (
    <div>
      <AuthContext.Provider
        value={{ authCheck: [auth, setAuth], logoutCheck: [logout, setLogout] }}
      >
        {props.children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthContextProvider;
