const express = require("express");
const router = express.Router();
const { createPDF, fetchPDF } = require("../controllers/pdfController");
const requireAuth = require("../middleware/requireAuth");

module.exports = router;
router.use(requireAuth);

router.post("/createPDF", createPDF);
router.get("/fetchPDF", fetchPDF);
