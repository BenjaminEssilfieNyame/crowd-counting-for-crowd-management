import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavContext } from "../context/NavContext";

const NavBar = () => {
  const { authCheck, logoutCheck } = useContext(AuthContext);
  const [auth, setAuth] = authCheck;
  const [logout, setLogout] = logoutCheck;

  const history = useHistory();

  const {
    homeCheck,
    crowdCountCheck,
    dashBoardCheck,
    contactCheck,
  } = useContext(NavContext);

  const [home, setHome] = homeCheck;
  const [crowdCount, setCrowdCount] = crowdCountCheck;
  const [dashBoard, setDashBoard] = dashBoardCheck;
  const [contact, setContact] = contactCheck;

  const handleLogout = () => {
    setAuth(false);
    setLogout(true);
  };

  return (
    <div>
      <div className="container flex items-center justify-between flex-wrap p-6 ml-18 ">
        <ul className="flex items-center flex-shrink-0 text-xl font-sans text-gray-200 font-extrabold ">
          {home && (
            <li className="ml-6">
              <NavLink to="/">Home</NavLink>
            </li>
          )}
          {crowdCount && (
            <li className="ml-6">
              <NavLink to="/count">Crowd Count</NavLink>
            </li>
          )}
          {dashBoard && (
            <li className="ml-6">
              <NavLink to="/events">My Dashboard</NavLink>
            </li>
          )}
          {/* {contact && (
            <li className="ml-6 mr-64">
              <NavLink to="/">Contact</NavLink>
            </li>
          )} */}
          <div className="flex items-center flex-shrink-0 ml-60">
            {auth ? (
              <li className="ml-24" onClick={handleLogout}>
                <NavLink to="/">Logout</NavLink>
              </li>
            ) : (
              <div className="flex">
                <li className="ml-24">
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li className="ml-6">
                  <NavLink to="/register">Register</NavLink>
                </li>
              </div>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
