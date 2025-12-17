const Question = require("../models/Question");
const UserProgress = require("../models/UserProgress");
const DailyGoal = require("../models/DailyGoal");

exports.getStreak = async (req, res) => {
  const userId = req.user;

  const goals = await DailyGoal.find({ userId }).sort({ date: -1 });

  let streak = 0;

  for (let i = 0; i < goals.length; i++) {
    const date = goals[i].date;

    const completedToday = await UserProgress.countDocuments({
      userId,
      status: "COMPLETED",
      updatedAt: {
        $gte: new Date(date),
        $lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000),
      },
    });

    if (completedToday >= goals[i].targetCount) {
      streak++;
    } else {
      break;
    }
  }

  res.json({ streak });
};

exports.getDashboardData = async (req, res) => {
  const userId = req.user;

  const modules = ["DSA", "CS", "APTITUDE", "HR", "DOMAIN"];
  let dashboard = [];

  for (let module of modules) {
    const questions = await Question.find({ module }).select("_id");

    const completed = await UserProgress.countDocuments({
      userId,
      questionId: { $in: questions },
      status: "COMPLETED",
    });

    const total = questions.length;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

    dashboard.push({
      module,
      totalQuestions: total,
      completedQuestions: completed,
      progress,
    });
  }

  res.json(dashboard);
};

exports.getWeakAreas = async (req, res) => {
  const userId = req.user;

  const questions = await Question.find();
  const progress = await UserProgress.find({ userId });

  let topicMap = {};

  // initialize topics
  questions.forEach(q => {
    if (!topicMap[q.topic]) {
      topicMap[q.topic] = { total: 0, completed: 0, module: q.module };
    }
    topicMap[q.topic].total += 1;
  });

  // mark completed
  progress.forEach(p => {
    if (p.status === "COMPLETED") {
      const q = questions.find(q => q._id.toString() === p.questionId.toString());
      if (q) {
        topicMap[q.topic].completed += 1;
      }
    }
  });

  // find weak areas
  const weakAreas = [];

  for (let topic in topicMap) {
    const data = topicMap[topic];
    const percentage = (data.completed / data.total) * 100;

    if (percentage < 40) {
      weakAreas.push({
        topic,
        module: data.module,
        progress: Math.round(percentage),
      });
    }
  }

  res.json(weakAreas);
};
