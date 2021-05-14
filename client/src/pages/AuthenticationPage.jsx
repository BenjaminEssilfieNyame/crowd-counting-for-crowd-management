import React from "react";
import "./AuthenticationPage.css";
import Logo from "../components/Logo";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";

const AuthenticationPage = ({ register }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { authCheck, logoutCheck } = useContext(AuthContext);
  const [_, setAuth] = authCheck;
  const [logout, setLogout] = logoutCheck;

  const [user, setUser] = useContext(UserContext);
  const history = useHistory();

  async function loginUser(credentials) {
    return fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }

  const handleLogin = (e) => {
    e.preventDefault();

    const getToken = async () => {
      const tokens = await loginUser({
        email,
        password,
      });
      setUser(tokens);
      localStorage.setItem("token", tokens);
    };
    getToken();
  };
  // if (user != null && !logout) {
  if (user != null && !logout) {
    setAuth(true);
    history.push("/");
  }

  return (
    <div id="auth-layout-container">
      <Logo />
      <div className="m-auto pt-48 h-3/4 w-2/4">
        <form className="h-5/6 p-24" onSubmit={handleLogin}>
          <div className="form-items-wrapper">
            <hr className="mt-24 border-solid border-black" />
            <div className="form-items">
              <label>Email</label>
              <input
                className="border-black input-button-decorator"
                type="text"
                name="email"
                value={email}
                placeholder="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-items">
              <label>Password</label>
              <input
                className="border-black input-button-decorator"
                type="password"
                name="password"
                value={password}
                placeholder="*******"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
            </div>
            <div id="lock" className="form-items">
              <div className="im-wrapper">
                <img src="padlock.svg" alt="lock" />
              </div>
              <div id="lock-buttons" className="pb-2 button-wrapper">
                <button
                  type="submit"
                  className="border-indigo-900 bg-indigo-300 border-solid input-button-decorator"
                >
                  <p>Login</p>
                </button>
                <button
                  className="ml-4 border-indigo-900 bg-indigo-300 border-solid input-button-decorator"
                  onClick={() => history.push("/register")}
                >
                  <p>Register</p>
                </button>
              </div>
            </div>
            <hr className="mt-3 border-solid border-black" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthenticationPage;
