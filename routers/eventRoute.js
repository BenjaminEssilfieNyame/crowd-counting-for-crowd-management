const express = require("express");
const eventController = require("../controllers/eventController");
const { verifyToken } = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(eventController.getAllEvents)
  .post(verifyToken, eventController.createEvent);

router
  .route("/:eventId")
  .get(eventController.getEvent)
  .patch(verifyToken, eventController.updateEvents)
  .delete(verifyToken, eventController.deleteEvents);

module.exports = router;
