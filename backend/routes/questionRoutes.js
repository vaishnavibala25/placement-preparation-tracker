const express = require("express");
const { getQuestions } = require("../controllers/questionController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:module", auth, getQuestions);

module.exports = router;
