const pdf = require("html-pdf");
const path = require("path");
const pdfTemplate = require("../documents/template");

const createPDF = (req, res) => {
  console.log("it enters");
  pdf
    .create(pdfTemplate(req.body), {})
    .toFile(`controllers/report.pdf`, (err) => {
      if (err) {
        console.log(err.message);
        res.status(400).json({ err });
      }
      res.status(200).json({ mgs: "success " });
    });
};

const fetchPDF = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "report.pdf"));
  } catch (err) {
    res.json({ error: err.message });
  }
};

module.exports = { createPDF, fetchPDF };
