import React from "react";
import "./AuthenticationPage.css";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../components/Logo";

const RegistrationPage = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [credentials, setCredentials] = useState(null);

  const history = useHistory();

  async function RegisterUser(credentials) {
    return fetch("http://localhost:4000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }

  const handleRegister = (e) => {
    e.preventDefault();
    const sendCredentials = async () => {
      const data = await RegisterUser({
        firstName,
        lastName,
        email,
        password,
      });
      setCredentials(data);
    };
    sendCredentials();
    // if (credentials != null) {
    history.push("/login");
    alert("Hurray!!! You Registered Successfully!");
    // }
  };

  return (
    <div id="auth-layout-container">
      <Logo />
      <div className="m-auto h-5/6 w-2/4">
        <form className="h-3/4 mt-12 p-24 pt-48" onSubmit={handleRegister}>
          <div className="form-items-wrapper">
            <hr className="border-solid border-black" />
            <div className="form-items">
              <label>First Name</label>
              <input
                className="border-black input-button-decorator"
                type="text"
                name="firstName"
                value={firstName}
                placeholder="First Name"
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-items">
              <label>Last Name</label>
              <input
                className="border-black input-button-decorator"
                type="text"
                name="lastName"
                value={lastName}
                placeholder="Last Name"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
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
                  className="border-indigo-900 border-solid bg-indigo-300 input-button-decorator"
                >
                  <p className="">Register</p>
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

export default RegistrationPage;
