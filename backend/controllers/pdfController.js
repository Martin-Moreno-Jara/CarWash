const pdf = require("html-pdf");
const path = require("path");

const createPDF = (req, res) => {
    console.log(req.body.list);
    pdf
    .create(pdfTemplate(req.body), {})
    .toFile(`controllers/...`, (err) => { // falta colocar la ruta de destino
        if (err) {
            res.status(400).json({ err });
        }
        res.status(200).json({ mgs: "success" });
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