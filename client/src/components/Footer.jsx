import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faEnvelopeSquare } from "@fortawesome/free-solid-svg-icons";
import { faPhoneSquare } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div>
      <hr className="border-solid border-black" />
      <div className="flex m-24 bg-gray-200">
        <div className="mr-48 w-2/4 font-mono">
          <h1 className="text-3xl pl-12 font-sans mt-12 font-extrabold">
            Contact Us
          </h1>
          <p className="text-xl p-3 pl-12 text-justify">
            University of Cape Coast
          </p>
          <p className="text-xl p-3 pl-12 text-justify">
            Adjacent the Science Taxi Station
          </p>
          <p className="text-xl p-3 pl-12 text-justify">
            <FontAwesomeIcon icon={faPhoneSquare} /> +233 2040985
          </p>
          <ul className="flex text-xl mt-12 ml-24 ">
            <li className="p-5">
              <FontAwesomeIcon icon={faFacebook} />
            </li>
            <li className="p-5">
              <FontAwesomeIcon icon={faEnvelopeSquare} />
            </li>
            <li className="p-5">
              <FontAwesomeIcon icon={faTwitter} />
            </li>
          </ul>
        </div>
        <div className="ml-48">
          <img src="contact.jpg" alt="contact" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
