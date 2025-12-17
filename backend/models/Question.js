const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    module: {
      type: String,
      enum: ["DSA", "CS", "APTITUDE", "HR", "DOMAIN"],
      required: true,
    },

    topic: {
      type: String,
      required: true,
    },

    questionText: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
    },

    role: {
      type: String, // only for DOMAIN module
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
