import "./CrowdCounter.css";
import Header from "../components/Header";
import DashBoardPage from "../pages/DashBoardPage";
import React from "react";
import { useContext } from "react";
import { NavContext } from "../context/NavContext";

const DashBoard = () => {
  const {
    homeCheck,
    crowdCountCheck,
    dashBoardCheck,
    contactCheck,
  } = useContext(NavContext);

  const [dashBoard, setDashBoard] = dashBoardCheck;
  const [contact, setContact] = contactCheck;
  const [home, setHome] = homeCheck;
  const [crowdCount, setCrowdCount] = crowdCountCheck;

  setDashBoard(false);
  setContact(false);
  setHome(true);
  setCrowdCount(true);

  return (
    <div id="crowd-layout-container">
      <Header />
      <DashBoardPage />
    </div>
  );
};

export default DashBoard;
