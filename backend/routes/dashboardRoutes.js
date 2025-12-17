const express = require("express");
const {
  getDashboardData,
  getWeakAreas,
} = require("../controllers/dashboardController");


const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth, getDashboardData);
router.get("/weak-areas", auth, getWeakAreas);

module.exports = router;
