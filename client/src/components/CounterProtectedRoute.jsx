import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const CounterProtectedRoute = ({ path, component: Component }) => {
  const { authCheck, logoutCheck } = useContext(AuthContext);

  const [auth, setAuth] = authCheck;

  if (auth) {
    return <Route path={path} render={() => <Component />} />;
  } else {
    return <Redirect to="/" />;
  }
};

export default CounterProtectedRoute;
