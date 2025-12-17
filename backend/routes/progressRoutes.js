const express = require("express");
const { updateProgress } = require("../controllers/progressController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/update", auth, updateProgress);

module.exports = router;
