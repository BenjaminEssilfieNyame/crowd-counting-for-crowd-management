// import { intersects } from "semver";

const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required."],
    },
    location: {
      type: String,
      required: [true, "Event location is required."],
    },
    description: {
      type: String,
    },
    eventDate: {
      type: Date,
      required: [true, "Event date is required."],
    },
    crowdImage: {
      type: String,
      required: [true, "Crowd image is required."],
    },
    crowdCount: {
      type: Number,
      required: [true, "Crowd count is required."],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Event manager is required."],
    },
  },
  { timestamps: true }
);

module.exports = model("Event", eventSchema);
