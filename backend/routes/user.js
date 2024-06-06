const express = require("express");
const {
  loginUser,
  logoutUser,
  updatePassword,
  getUsuarioByUser,
  actualizarPrimeraVez,
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/change-password", updatePassword);
router.get("/:user", getUsuarioByUser);
router.post("/update-first-time", actualizarPrimeraVez);
module.exports = router;
