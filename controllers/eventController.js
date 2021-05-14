const Events = require("../models/Events");
const User = require("../models/User");

const getAllEvents = async (req, res) => {
  try {
    const crowdEvents = await Events.find();
    res.status(200).json({ crowdEvents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEvent = async (req, res) => {
  try {
    const { crowdEventId } = req.params;
    console.log(crowdEventId);
    const crowdEvent = await Events.findById(crowdEventId);
    console.log("search here");
    res.status(200).json({ crowdEvent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const {
      title,
      location,
      description,
      eventDate,
      crowdImage,
      crowdCount,
    } = req.body;

    const userId = req.user;

    const crowdEvent = await Events.create({
      title,
      location,
      description,
      eventDate,
      crowdImage,
      crowdCount,
      user: userId,
    });
    console.log(crowdEvent.title);
    const user = await User.findById(userId);

    user.events.push(crowdEvent._id);
    await user.save();
    console.log("done");

    res.status(201).json({ crowdEvent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEvents = async (req, res) => {
  try {
    // const { crowdEventId } = req.params;
    const { crowdEventId } = req.body;
    console.log(crowdEventId);
    const crowdEvent = await Events.findByIdAndUpdate(crowdEventId, req.body, {
      new: true,
    });
    res.status(200).json({ crowdEvent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEvents = async (req, res) => {
  try {
    const { crowdEventId } = req.body;
    console.log(crowdEventId);
    await Events.findByIdAndDelete(crowdEventId);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvents,
  deleteEvents,
};
