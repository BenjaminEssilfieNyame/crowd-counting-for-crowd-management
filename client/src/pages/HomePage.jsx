import React from "react";

const HomePage = () => {
  return (
    <div className="flex h-1/3 mt-6">
      <div className="w-1/2 mt-3 mr-6">
        <h1 className="mb-4 text-2xl text-center font-sans text-gray-200 font-extrabold">
          Know Your Crowd Size for Effective Crowd Management
        </h1>
        <div className="text-xl text-justify font-mono bg-gray-200">
          <p className="p-3">
            How do we estimate the number of people gathered at an event? In
            football games for instance one way of estimating the number of
            spectators is by knowing the number of tickets sold.
          </p>
          <p className="p-3 ">
            How about events organised openly for the general public. Events
            organised at beaches, on the streets, parks, etc.
          </p>
          <p className="p-3 ">
            It will definitely help a great deal to automate crowd counting to
            have a fair idea about the number of people available at the events.
          </p>
          <p className="p-3 ">
            Given a photo of the crowd our crowd counting app can estimate the
            number of people present. We also provide you with some space to
            keep track of crowd counts of recorded events.
          </p>
        </div>
      </div>
      <div className="h-screen w-4/5 float-right">
        <img className="" src="crowd.svg" alt="" />
      </div>
    </div>
  );
};

export default HomePage;
