const express = require("express");
const router = express.Router();
const { createPDF, fetchPDF } = require("../controllers/pdfController");

router.post("/createPDF", createPDF);
router.get("/fetchPDF", fetchPDF);

module.exports = router;
