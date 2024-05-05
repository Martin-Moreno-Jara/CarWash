const express = require("express");
const { getTarifas, postTarifas } = require("../controllers/tarifasController");

const router = express.Router();

router.get("/", getTarifas);

router.post("/", postTarifas);

module.exports = router;
