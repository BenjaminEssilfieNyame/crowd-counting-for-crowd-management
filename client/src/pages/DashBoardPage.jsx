import React, { useState, useEffect, useContext } from "react";
import ArrowDown from "../components/ArrowDown";
import "./InputFile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/UserContext";

const vis = "visible";
const hid = "hidden";

const DashBoardPage = () => {
  const [user, setUser] = useContext(UserContext);

  const [crowdEvents, setCrowdEvents] = useState({});
  const [eventUpdate, setEventUpdate] = useState({
    crowdEventId: "",
    title: "",
    location: "",
    description: "",
    eventDate: "01/01/2021",
  });
  const [date, setDate] = useState();
  const [searchTitle, setSearchTitle] = useState("");

  const [dotVisible, setDotVisible] = useState(vis);
  const [arrowVisible, setArrowVisible] = useState(hid);
  const [detailVisible, setDetailVisible] = useState(hid);
  const [eventVisible, setEventVisible] = useState(vis);
  const [urlDisp, setUrlDisp] = useState({
    crowdEventId: "",
    title: "Event Title",
    location: "",
    description: "",
    eventDate: "",
    crowdImage: "crowd.svg",
    crowdCount: 0,
  });
  const [updateDisplay, setUpdateDisplay] = useState("none");

  const fetchQuery = async ({ uri, method = "GET", body = null }) => {
    const response = await fetch(uri, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: body !== null ? JSON.stringify(body) : null,
    });
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await fetchQuery({ uri: "http://localhost:4000/events" });
      setCrowdEvents(data.crowdEvents);
    };
    fetchEvents();
    setEventUpdate({
      ...eventUpdate,
      ["crowdEventId"]: urlDisp.crowdEventId,
    });
    if (date) {
      setEventUpdate({
        ...eventUpdate,
        ["eventDate"]: date,
      });
    }
  }, [crowdEvents]);

  // ============================
  const handleUpdate = (e) => {
    // e.preventDefault();

    const updateEvent = async (eventDetails) => {
      const updated = await fetchQuery({
        uri: `http://localhost:4000/events/${urlDisp.crowdEventId}`,
        method: "PATCH",
        body: eventDetails,
      });
    };
    updateEvent(eventUpdate);
    closeForm(e);
  };

  // ============================

  const handleChange = (e) => {
    const value = e.target.value;
    if (value != "") {
      setEventUpdate({ ...eventUpdate, [e.target.name]: value });
    }
  };

  // ============================

  const handleDelete = () => {
    // e.preventDefault();

    const deleteObject = { crowdEventId: urlDisp.crowdEventId };

    const deleteEvent = async () => {
      const deleted = await fetchQuery({
        uri: `http://localhost:4000/events/${urlDisp.crowdEventId}`,
        method: "DELETE",
        body: deleteObject,
      });
      console.log(deleted);
    };
    let delete_prompt = prompt(
      "Are you sure you want to delete this photo?",
      "YES"
    );
    let delete_check = false;
    if (delete_prompt !== null) {
      delete_check = delete_prompt.toLowerCase() === "yes";
    }

    if (delete_check) {
      deleteEvent();
      setUrlDisp({
        crowdEventId: "",
        title: "Event Title",
        location: "",
        description: "",
        eventDate: "",
        crowdImage: "crowd.svg",
        crowdCount: 0,
      });
    }
  };

  // =============================

  const handleSearch = () => {
    // e.preventDefault();
    console.log(searchTitle);
    const searchEvent = async (searchId) => {
      const searched = await fetchQuery({
        uri: `http://localhost:4000/events/${searchId.crowdEventId}`,
        method: "GET",
        body: searchId,
      });
      setUrlDisp(searched);
    };
    let searchId = "";
    Object.keys(crowdEvents).map((crowd) => {
      console.log(crowd);
      if (searchTitle.toLowerCase === crowdEvents[crowd].title.toLowerCase) {
        searchId = { crowdEventId: crowdEvents[crowd].crowdEventId };
        console.log(searchId);
      }
    });
    searchEvent(searchId);
  };

  console.log(searchTitle);
  // =============================
  function dotClick() {
    setDetailVisible(vis);
    setEventVisible(hid);
    setDotVisible(hid);
    setArrowVisible(vis);
  }

  function closeClick() {
    setDetailVisible(hid);
    setEventVisible(vis);
    setArrowVisible(hid);
    setDotVisible(vis);
  }

  function openForm() {
    setUpdateDisplay("block");
    // const nId = urlDisp.crowdEventId;
    // setEventUpdate({
    //   ...eventUpdate,
    //   [eventUpdate.crowdEventId]: nId,
    // });
  }

  function closeForm(e) {
    e.preventDefault();
    setUpdateDisplay("none");
  }

  return (
    <div className="flex h-5/6 w-full m-auto mt-4 ml-0 mr-0 bg-white">
      <div className="h-full w-2/3 m-auto ml-0 relative overflow-y-scroll bg-gray-800">
        <div className="shadow flex justify-between mt-4 mb-2 fixed w-2/4">
          {/* <form onSubmit={() => handleSearch()}> */}
          <input
            className="w-3/4 rounded p-2 m-auto mr-48 outline-none"
            type="text"
            placeholder="Search..."
            // value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <button
            className="bg-white m-auto flex justify-end items-center text-white p-2 hover:text-blue-400 "
            style={{ marginLeft: -230 }}
            onClick={() => handleSearch()}
          >
            <i>
              <FontAwesomeIcon
                icon={faSearch}
                className="text-xl text-blue-400"
              />
            </i>
          </button>
          {/* </form> */}
        </div>
        <div className="h-2/4 grid grid-cols-3 gap-4 mt-14 p-6 pl-16">
          {Object.keys(crowdEvents).map((crowdEvent, index) => {
            return (
              <div
                key={index}
                className="h-full w-5/6 bg-white font-mono cursor-pointer item-display"
                onClick={() =>
                  setUrlDisp({
                    crowdEventId: crowdEvents[crowdEvent]._id,
                    title: crowdEvents[crowdEvent].title,
                    location: crowdEvents[crowdEvent].location,
                    description: crowdEvents[crowdEvent].description,
                    eventDate: crowdEvents[crowdEvent].eventDate,
                    crowdImage: crowdEvents[crowdEvent].crowdImage,
                    crowdCount: crowdEvents[crowdEvent].crowdCount,
                  })
                }
              >
                <div className="flex">
                  <h1 className="ml-8 mr-8 font-bold">
                    {crowdEvents[crowdEvent].title}
                  </h1>
                </div>

                <div className="ml-2 mr-2 ">
                  <img
                    className="h-64 "
                    src={crowdEvents[crowdEvent].crowdImage}
                    alt="crowd-event"
                  />
                  <p className="animate-pulse font-black text-center text-blue-600">
                    Predicted{" "}
                    <span className="text-blue-900">
                      {crowdEvents[crowdEvent].crowdCount}
                    </span>{" "}
                    people
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ======================== */}

      <div className="h-full w-1/3 m-auto bg-gray-800">
        <div className="h-5/6 w-5/6 m-auto mt-14 bg-white font-mono">
          <div className="flex">
            <span
              className="ml-2 font-serif opacity-35"
              style={{ cursor: "pointer", visibility: arrowVisible }}
              onClick={() => closeClick()}
            >
              <FontAwesomeIcon icon={faTimes} className="text-2xl mt-2" />
            </span>
            <h1 className="ml-8 mr-6 title-font font-bold">{urlDisp.title}</h1>
            <span
              className="font-extrabold font-serif"
              style={{ cursor: "pointer", visibility: dotVisible }}
              onClick={() => dotClick()}
            >
              . . .
            </span>
          </div>

          <div
            className="h-5/6 ml-2 mr-2 mt-3"
            style={{ visibility: eventVisible }}
          >
            <img
              className="h-full w-full"
              src={urlDisp.crowdImage}
              alt="crowd-event"
            />
            <p className="animate-pulse font-black text-center count-font text-blue-600">
              Predicted{" "}
              <span className="text-blue-900">{urlDisp.crowdCount}</span> people
            </p>
          </div>
          <ul
            className="p-2 text-black font-mono count-font opacity-35"
            style={{ visibility: detailVisible, marginTop: -510 }}
          >
            <li className="">
              <p>
                Location:{" "}
                <span className="text-gray-400">{urlDisp.location}</span>
              </p>
            </li>
            <hr className="border-solid border-black" />
            <li className="">
              <p>
                Description:
                <br />
                <span className="text-gray-400">{urlDisp.description}</span>
              </p>
            </li>
            <hr className="border-solid border-black" />
            <li className="">
              <p>
                Date: <span className="text-gray-400">{urlDisp.eventDate}</span>
              </p>
            </li>
            <hr className="border-solid border-black" />
            <li className="">
              <p>
                Count:{" "}
                <span className="text-3x1 text-gray-400 font-extrabold">
                  {urlDisp.crowdCount}{" "}
                </span>
              </p>
            </li>
            <div className="flex mt-8">
              <button
                className="bg-gray-500 m-auto flex justify-end items-center text-white p-2 hover:text-blue-400 "
                onClick={() => openForm()}
              >
                Edit
              </button>
              <button
                className="bg-gray-500 m-auto flex justify-end items-center text-white p-2 hover:text-blue-400 "
                onClick={() => handleDelete()}
              >
                Delete
              </button>
            </div>
          </ul>
        </div>
      </div>

      {/* ============================ */}

      <div
        className="mr-24 form-popup"
        id="myForm"
        style={{ display: updateDisplay }}
      >
        <form className="form-container text-black" onSubmit={handleUpdate}>
          <h1 className="ml-32 text-2x1">Make Changes to this Event</h1>
          <label htmlFor="email">
            <b>Title</b>
          </label>
          <input
            type="text"
            placeholder={urlDisp.title}
            name="title"
            value={eventUpdate.title}
            onChange={handleChange}
          />
          <label htmlFor="location">
            <b>Location</b>
          </label>
          <input
            type="text"
            placeholder={urlDisp.location}
            name="location"
            value={eventUpdate.location}
            onChange={handleChange}
          />
          <label htmlFor="description">
            <b>Discription</b>
          </label>
          <input
            type="textarea"
            placeholder={urlDisp.description}
            name="description"
            value={eventUpdate.description}
            onChange={handleChange}
          />
          <label htmlFor="Date">
            <b>Date</b>
          </label>{" "}
          <br />
          <input type="date" onChange={(e) => setDate(e.target.value)} />
          <div className="flex mt-4">
            <button
              type="submit"
              className="bg-green-500 m-auto flex justify-end items-center text-white p-2 hover:text-blue-400 "
            >
              Update Event
            </button>
            <button
              type="submit"
              className="bg-red-500 m-auto flex justify-end items-center text-white p-2 hover:text-blue-400"
              onClick={(e) => closeForm(e)}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashBoardPage;
