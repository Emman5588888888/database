const express = require("express");
const { getCourse } = require("../controller/courseController");

const router = express.Router();

router.get("/", getCourse);

module.exports = router;
