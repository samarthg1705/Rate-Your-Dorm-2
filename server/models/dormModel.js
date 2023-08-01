const mongoose = require("mongoose");

const dormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    plot: {
      type: String,
      required: true,
    },
    hero: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "artists",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    dorminhabitants: {
      type: String,
      required: true,
    },
    posters: {
      type: [],
      required: false,
    },
    trailer: {
      type: String,
      required: false,
    },
    cast: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "artists",
      required: false,
    },
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("movies", dormSchema);
