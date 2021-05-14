const express = require("express");
require("./config/dbConnect");
const eventRoute = require("./routers/eventRoute");
const authRoute = require("./routers/authRoute");
const cors = require("cors");

const app = express();

// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb" }));

var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());

app.use("/auth", authRoute);
app.use("/events", eventRoute);

// app.all("*", (req, res, next) => {
//   res
//     .status(404)
//     .json({ message: `Cannot find ${req.originalUrl} on the server` });
// });

// app.use((error, req, res, next) => {
//   res.status(errors.status || 500).json({ message: error.message });
// });

module.exports = app.listen(4000, () =>
  console.log("Server is up and running!")
);
