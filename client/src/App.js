import { BrowserRouter, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import LandingPage from "./layouts/LandingPage";
import CrowdCounter from "./layouts/CrowdCounter";
import DashBoard from "./layouts/DashBoard";
import Login from "./layouts/Login";
import Register from "./layouts/Register";
import NavContextProvider from "./context/NavContext";
import AuthContextProvider from "./context/AuthContext";
import UserContextProvider from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";

library.add(fab);

function App() {
  return (
    <div>
      <AuthContextProvider>
        <UserContextProvider>
          <NavContextProvider>
            <BrowserRouter>
              <Switch>
                <Route path="/" exact component={LandingPage} />
                <ProtectedRoute path="/count" component={CrowdCounter} />
                <ProtectedRoute path="/events" component={DashBoard} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
              </Switch>
            </BrowserRouter>
          </NavContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
