import { createContext, useState } from "react";

export const NavContext = createContext({});

const NavContextProvider = (props) => {
  const [home, setHome] = useState(true);
  const [crowdCount, setCrowdCount] = useState(true);
  const [dashBoard, setDashBoard] = useState(true);
  const [contact, setContact] = useState(true);

  return (
    <NavContext.Provider
      value={{
        homeCheck: [home, setHome],
        crowdCountCheck: [crowdCount, setCrowdCount],
        dashBoardCheck: [dashBoard, setDashBoard],
        contactCheck: [contact, setContact],
      }}
    >
      {props.children}
    </NavContext.Provider>
  );
};

export default NavContextProvider;
