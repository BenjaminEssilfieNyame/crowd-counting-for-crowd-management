import "./LandingPage.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import { useContext } from "react";
import { NavContext } from "../context/NavContext";

const LandingPage = () => {
  const {
    homeCheck,
    crowdCountCheck,
    dashBoardCheck,
    contactCheck,
  } = useContext(NavContext);

  const [home, setHome] = homeCheck;
  const [crowdCount, setCrowdCount] = crowdCountCheck;
  const [contact, setContact] = contactCheck;
  const [dashBoard, setDashBoard] = dashBoardCheck;

  setHome(false);
  setCrowdCount(true);
  setContact(true);
  setDashBoard(true);

  return (
    <div id="layout-container">
      <Header />
      <HomePage />
      <AboutPage />
      <Footer />
    </div>
  );
};

export default LandingPage;
