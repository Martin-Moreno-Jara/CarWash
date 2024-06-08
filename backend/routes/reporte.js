const express = require("express");
const router = express.Router();
const { createPDF, fetchPDF } = require("../controllers/pdfController");

module.exports = router;

router.post("/createPDF", createPDF);
router.get("/fetchPDF", fetchPDF);
