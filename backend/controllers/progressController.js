const UserProgress = require("../models/UserProgress");

exports.updateProgress = async (req, res) => {
  const { questionId, status, notes } = req.body;

  const progress = await UserProgress.findOneAndUpdate(
    { userId: req.user, questionId },
    { status, notes },
    { upsert: true, new: true }
  );

  res.json(progress);
};
