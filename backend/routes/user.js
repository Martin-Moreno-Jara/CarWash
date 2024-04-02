const express = require("express");
const { loginUser, signupUser } = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signupUser);
//ruta para el login
router.post("/login", loginUser);

module.exports = router;
