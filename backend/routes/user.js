const express = require("express");
const {
  loginUser,
  logoutUser,
  updatePassword,
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/change-password", updatePassword);

module.exports = router;
