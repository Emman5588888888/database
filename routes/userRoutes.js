const express = require("express");
const {
  createUser,
  getUsers,
  signin,
  deleteUser,
  getUsersByLocation,
  getSingleUser,
  updateUser,
  getUserBy,
} = require("../controller/userController");

const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", signin);
router.put("/:id/update", updateUser);
router.get("/", getUsers);
router.get("/location", getUsersByLocation);
router.get("/:id", getSingleUser);
router.delete("/:id/delete", deleteUser);
router.get("/test/example", getUserBy);

module.exports = router;
