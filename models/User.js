const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Provide fisrt name"],
    },
    lastName: {
      type: String,
      required: [true, "Provide last name"],
    },
    email: {
      type: String,
      required: [true, "Provide email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Provide password"],
    },
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: "Events",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
