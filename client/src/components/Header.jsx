import React from "react";
import NavBar from "./NavBar";
import Logo from "./Logo";

const Header = () => {
  return (
    <div className="flex justify-center h-24 ">
      <div className="mt-4 h-16 w-18 bg-gray-300">
        <div className="" style={{ marginTop: -14 }}>
          <Logo />
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default Header;
