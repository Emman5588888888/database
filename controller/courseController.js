const Course = require("../models/Course");

const getCourse = async (req, res) => {
  const courses = await Course.find({ price: { $gte: 100, $lte: 200 } });

  res.send(courses);
};

module.exports.getCourse = getCourse;
