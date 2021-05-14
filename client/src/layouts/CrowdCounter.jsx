import "./CrowdCounter.css";
import Header from "../components/Header";
import CrowdCounterPage from "../pages/CrowdCounterPage";
import React from "react";
import { useContext } from "react";
import { NavContext } from "../context/NavContext";

const CrowdCounter = () => {
  const {
    homeCheck,
    crowdCountCheck,
    dashBoardCheck,
    contactCheck,
  } = useContext(NavContext);

  const [crowdCount, setCrowdCount] = crowdCountCheck;
  const [contact, setContact] = contactCheck;
  const [home, setHome] = homeCheck;
  const [dashBoard, setDashBoard] = dashBoardCheck;

  setCrowdCount(false);
  setContact(false);
  setHome(true);
  setDashBoard(true);

  return (
    <div id="crowd-layout-container">
      <Header />
      <CrowdCounterPage />
    </div>
  );
};

export default CrowdCounter;
