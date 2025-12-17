require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const Question = require("../models/Question");


mongoose.connect(process.env.MONGO_URI);

const questions = [
  // DSA
  {
    module: "DSA",
    topic: "Arrays",
    questionText: "Find the maximum subarray sum",
    difficulty: "Medium",
  },
  {
    module: "DSA",
    topic: "Trees",
    questionText: "Check if a binary tree is balanced",
    difficulty: "Medium",
  },

  // CS
  {
    module: "CS",
    topic: "DBMS",
    questionText: "What is normalization?",
  },
  {
    module: "CS",
    topic: "OS",
    questionText: "Explain deadlock",
  },

  // Aptitude
  {
    module: "APTITUDE",
    topic: "Percentages",
    questionText: "Calculate percentage increase",
  },

  // HR
  {
    module: "HR",
    topic: "HR Basics",
    questionText: "Tell me about yourself",
  },

  // Domain
  {
    module: "DOMAIN",
    topic: "React",
    role: "Full Stack Developer",
    questionText: "Explain useEffect hook",
  },
];

const seedQuestions = async () => {
  try {
    await Question.deleteMany();
    await Question.insertMany(questions);
    console.log("Questions seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedQuestions();
