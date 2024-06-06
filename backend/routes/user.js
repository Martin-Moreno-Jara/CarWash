const express = require("express");
const {
  loginUser,
  logoutUser,
  updatePassword,
  getUsuarioByUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/change-password", updatePassword);
router.get("/:user", getUsuarioByUser);

module.exports = router;
