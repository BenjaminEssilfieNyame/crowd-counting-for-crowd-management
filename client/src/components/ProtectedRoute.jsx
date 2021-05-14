import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ path, component: Component, ...rest }) => {
  const { authCheck, logoutCheck } = useContext(AuthContext);

  const [auth, setAuth] = authCheck;

  if (auth) {
    return <Route path={path} {...rest} render={() => <Component />} />;
  } else {
    return <Redirect to="/" />;
  }
};

export default ProtectedRoute;
