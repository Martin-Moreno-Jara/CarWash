const pdf = require("html-pdf");
const path = require("path");
const pdfTemplate = require("../documents/template");
const empleadoModel = require("../models/userModel");
const servicioModel = require("../models/servicioModel");

const searchServices = async (initDate, endDate, servicios) => {
  let servicesReturn = {};
  const InitISO = new Date(initDate).toISOString();
  const endISO = new Date(endDate).toISOString();
  // try {
  const search = await servicioModel.find({
    createdAt: {
      $gte: InitISO,
      $lt: endISO,
    },
  });

  if (servicios.recaudo) {
    const pricesa = search.map((priceInstance) => priceInstance.precio);
    const prices = pricesa.reduce((acc, price) => acc + price, 0);
    console.log(prices);
    servicesReturn.recaudo = prices;
  }
  if (servicios.numServicios) {
    console.log("numservicios");
    const numS = search.length;
    servicesReturn.numServiciosTotal = numS;
    const servicesAcabados = search.filter((ser) => ser.estado === "Terminado");
    servicesReturn.numServiciosAcabados = servicesAcabados.length;
    const servicesStill = search.filter((ser) => ser.estado === "En proceso");
    servicesReturn.numServiciosStill = servicesStill.length;
  }
  return servicesReturn;
  // } catch (error) {
  //   console.log(error);
  // }
};

const createPDF = async (req, res) => {
  const { initDate, endDate, servicios, empleados } = req.body;
  let serviceData = await searchServices(initDate, endDate, servicios);
  pdf
    .create(pdfTemplate(initDate, endDate, serviceData, empleados), {})
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
