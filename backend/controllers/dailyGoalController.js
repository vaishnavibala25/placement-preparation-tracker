const DailyGoal = require("../models/DailyGoal");
const UserProgress = require("../models/UserProgress");

const today = () => new Date().toISOString().slice(0, 10);

// SET GOAL
exports.setDailyGoal = async (req, res) => {
  const { targetCount } = req.body;
  const date = today();

  const goal = await DailyGoal.findOneAndUpdate(
    { userId: req.user, date },
    { targetCount },
    { upsert: true, new: true }
  );

  res.json(goal);
};

// GET TODAY GOAL STATUS
exports.getTodayGoal = async (req, res) => {
  const date = today();

  const goal = await DailyGoal.findOne({ userId: req.user, date });

  const completedToday = await UserProgress.countDocuments({
    userId: req.user,
    status: "COMPLETED",
    updatedAt: {
      $gte: new Date(date),
    },
  });

  res.json({
    target: goal?.targetCount || 0,
    completed: completedToday,
    remaining: Math.max((goal?.targetCount || 0) - completedToday, 0),
  });
};
