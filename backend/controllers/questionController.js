const Question = require("../models/Question");

exports.getQuestions = async (req, res) => {
  const { module } = req.params;
  const { role } = req.query;

  let filter = { module };

  if (module === "DOMAIN" && role) {
    filter.role = role;
  }

  const questions = await Question.find(filter);
  res.json(questions);
};
