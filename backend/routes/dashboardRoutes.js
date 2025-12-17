const express = require("express");
const {
  getDashboardData,
  getWeakAreas,
  getStreak
} = require("../controllers/dashboardController");

const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth, getDashboardData);
router.get("/weak-areas", auth, getWeakAreas);
router.get("/streak", auth, getStreak);


module.exports = router;
