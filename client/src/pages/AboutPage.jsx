import React from "react";
import Arrow from "../components/Arrow";
import { Element } from "react-scroll";

const AboutPage = () => {
  return (
    <div className="h-1/3 ">
      <Element id="how-it-works" name="how-it-works">
        <h1 className="text-3xl text-center font-sans text-gray-200 font-extrabold pt-2">
          How it Works
        </h1>
      </Element>
      <div className="flex h-full text-2xl text-center font-mono">
        <div className="h-full m-24 mt-12">
          <p className="bg-black rounded-full text-center text-gray-200">1</p>
          <h1 className="bg-gray-200">
            Select photo of crowd to count and click on "count crowd"
          </h1>
          <div className="flex h-3/4">
            <div className="h-full w-full relative ">
              <img src="c11.jpg" alt="" className="h-1/3 w-3/4 m-auto mt-8" />
              <img src="c12.jpg" alt="" className="h-1/3 w-3/4 m-auto mt-12" />
            </div>
            <div className="mt-64 text-gray-200">
              <Arrow />
            </div>
          </div>
        </div>
        <div className="h-full m-24 ml-12 mt-12">
          <p className="bg-black rounded-full text-center text-gray-200">2</p>
          <h1 className="bg-gray-200">
            Click on "Save" to add to your DashBoard
          </h1>
          <div className="flex h-3/4">
            <div className="h-full w-full relative ">
              <img src="c13.jpg" alt="" className="h-2/4 w-4/5 m-auto mt-24" />
            </div>
            <div className="mt-64 text-gray-200">
              <Arrow />
            </div>
          </div>
        </div>
        <div className="h-full mt-12 ml-12 mr-24">
          <p className="bg-black rounded-full text-center text-gray-200">3</p>
          <h1 className="bg-gray-200">Add event details and submit</h1>
          <div className="h-2/3 w-full">
            <div className="h-full w-full relative ">
              <img src="c4.jpg" alt="" className="h-2/4 w-full m-auto mt-8" />
              <img src="c15.jpg" alt="" className="h-1/4 w-3/4 m-auto mt-12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
