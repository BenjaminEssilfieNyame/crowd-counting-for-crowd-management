import React from "react";
import { useState, useContext } from "react";
import assert from "assert";
import axios from "axios";
import Arrow from "../components/Arrow";
import "./InputFile.css";
import { UserContext } from "../context/UserContext";

const CrowdCounterPage = () => {
  const [user, setUser] = useContext(UserContext);

  const [imageUrl, setImages] = useState([]);
  const [uploadedUrl, setUploadedImages] = useState([]);
  const [counts, setCounts] = useState({});
  const [loader, setLoader] = useState("hidden");
  const [fColor, setfColor] = useState("white");
  const [saveDisplay, setSaveDisplay] = useState("none");
  const [notLoaded, setNotLoaded] = useState(true);
  const [notCounted, setNotCounted] = useState(true);

  // ===========================
  const [title, setTitle] = useState();
  const [location, setLocation] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();

  async function postEvent(eventDetails) {
    return fetch("http://localhost:4000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(eventDetails),
    }).then((data) => data.json());
  }

  const handleEventPost = (e) => {
    e.preventDefault();

    const sendEvent = async () => {
      const newEvent = await postEvent({
        title: title,
        location: location,
        description: description,
        eventDate: date,
        crowdImage: uploadedUrl[0],
        crowdCount: counts.count,
        userId: user.userId,
      });
    };
    sendEvent();
    closeForm(e);
  };

  var invalid_file = "Check File Type; input should be jpg, jpeg or png";

  const handleOnChange = (e) => {
    e.preventDefault();

    async function readMultiFiles(files) {
      let reader = new FileReader();
      function readFile(index, images = [], uploadedImages = []) {
        if (index >= files.length) {
          setImages([].concat(images));
          setUploadedImages([].concat(uploadedImages));
          return;
        }
        let file = files[index];
        reader.onload = () => {
          let image = reader.result;
          var bas64Image;
          var jpegRegex = new RegExp("([a-zA-Z0-9s_\\.-:])+(.jpeg)$");
          var jpgRegex = new RegExp("([a-zA-Z0-9s_\\.-:])+(.jpg)$");
          var pngRegex = new RegExp("([a-zA-Z0-9s_\\.-:])+(.png)$");

          try {
            assert.notEqual(image, null);
            if (jpegRegex.test(file.name.toLowerCase())) {
              bas64Image = image.replace("data:image/jpeg;base64,", "");
            }
            if (jpgRegex.test(file.name.toLowerCase())) {
              bas64Image = image.replace("data:image/jpeg;base64,", "");
            }
            if (pngRegex.test(file.name.toLowerCase())) {
              bas64Image = image.replace("data:image/png;base64,", "");
            }
            assert.notEqual(bas64Image, null);
            images.push(bas64Image);
            uploadedImages.push(image);
            readFile(index + 1, images, uploadedImages);
          } catch (err) {
            alert(invalid_file);
            setImages(null);
          }
        };
        reader.readAsDataURL(file);
      }
      readFile(0);
    }
    readMultiFiles(e.target.files);
    setCounts({});
    setfColor("red");
    setNotLoaded(false);
    setLoader("hidden");
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const postData = (message) => {
      axios
        .post("http://fb262194b473.ngrok.io/counts", { message })
        .then((res) => {
          const counts = res.data;
          setCounts(counts);
          setLoader("hidden");
          setfColor("green");
          setNotCounted(false);
          alert(`Predicted ${counts["count"]} people`);
        });
    };

    if (imageUrl != null) {
      setfColor("yellow");
      setLoader("visible");
      setCounts({ count: "  Counting; please wait" });
      postData(imageUrl[0]);
    } else {
      alert(invalid_file);
      setCounts({ count: " Error! invalid input" });
    }
  };

  function cursorType(bType) {
    const curDisabled = "not-allowed";
    if (bType === "count") {
      if (notLoaded) {
        return curDisabled;
      }
    } else if (bType === "save") {
      if (notCounted) {
        return curDisabled;
      }
    } else {
      return "pointer";
    }
  }

  function openForm() {
    setSaveDisplay("block");
  }

  function closeForm(e) {
    e.preventDefault();
    setSaveDisplay("none");
  }

  return (
    <div className="h-4/5 relative">
      <div className="w-72 m-auto text-gray-200 ">
        <input
          type="file"
          name="count-file"
          multiple
          onChange={handleOnChange}
          className="file-input"
        />
      </div>
      <div className="h-5/6 w-2/3 m-auto mt-4 pt-6 bg-gray-800">
        <div className="h-5/6 w-2/3 m-auto bg-gray-200">
          {uploadedUrl.map((url, index) => {
            return (
              <img
                className="h-full w-full"
                key={index}
                src={url}
                alt="count-file"
              />
            );
          })}
        </div>
        <div
          className="h-1/6 w-2/3 flex m-auto text-2xl font-mono text-gray-200"
          style={{ color: fColor }}
        >
          <div className="ml-32 mt-8 ">
            <div className="float-right mt-1 pl-2">
              <Arrow />
            </div>
            <h1 className="float-left text-gray-200">Count</h1>
          </div>
          <div className="flex mt-8">
            <div id="loader" style={{ visibility: loader }}></div>
            <ul className="text-3x1 font-extrabold">
              {Object.keys(counts).map((count, index) => {
                return <li key={index}>{counts[count]}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex ml-96 mt-4 w-36 text-gray-200 ">
        <form className="bg-transparent" onSubmit={handleOnSubmit}>
          <button
            type="submit"
            className="file-button-count ml-24 mr-24"
            style={{ cursor: cursorType("count") }}
            disabled={notLoaded}
          ></button>
        </form>
        <button
          className="file-button ml-24"
          onClick={() => openForm()}
          // disabled={notCounted}
          // style={{ cursor: cursorType("save") }}
        ></button>
        {/* ================================= */}
        <div
          className="form-popup"
          id="myForm"
          style={{ display: saveDisplay }}
        >
          <form
            className="form-container text-black "
            onSubmit={handleEventPost}
          >
            <h1 className="ml-32 text-2x1">Add Event to Your DashBoard</h1>
            <label htmlFor="email">
              <b>Title</b>
            </label>
            <input
              type="text"
              placeholder="Enter Event Title"
              name="title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="location">
              <b>Location</b>
            </label>
            <input
              type="text"
              placeholder="Enter Event Location"
              name="location"
              required
              onChange={(e) => setLocation(e.target.value)}
            />
            <label htmlFor="description">
              <b>Discription</b>
            </label>
            <input
              type="textarea"
              placeholder="Describe Event"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="Date">
              <b>Date</b>
            </label>{" "}
            <br />
            <input
              type="date"
              required
              onChange={(e) => setDate(e.target.value)}
            />
            <div className="flex mt-4">
              <button
                type="submit"
                className="bg-green-500 m-auto flex justify-end items-center text-gray-200 p-2 hover:text-blue-400 "
              >
                Add to Events
              </button>
              <button
                type="submit"
                className="bg-red-500 m-auto flex justify-end items-center text-gray-200 p-2 hover:text-blue-400"
                onClick={(e) => closeForm(e)}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrowdCounterPage;
