const express = require("express");
const {
  setDailyGoal,
  getTodayGoal,
} = require("../controllers/dailyGoalController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/set", auth, setDailyGoal);
router.get("/today", auth, getTodayGoal);

module.exports = router;
