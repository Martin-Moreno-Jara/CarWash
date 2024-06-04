const pdf = require("html-pdf");
const path = require("path");
const pdfTemplate = require("../documents/template");
const empleadoModel = require("../models/userModel");
const servicioModel = require("../models/servicioModel");
const tarfiasModel = require("../models/tarifasModel");

const calcDataCells = (servicesList, vehicleData) => {
  const returnData = [];
  servicesList.forEach((name) => {
    const carByService = vehicleData.filter(
      (ser) => name.servicio === ser.tipoServicio
    );
    returnData.push(carByService.length);
  });
  const total = returnData.reduce((acc, sum) => acc + sum, 0);
  returnData.push(total);
  return returnData;
};
const searchServices = async (initDate, endDate, servicios) => {
  let servicesReturn = {};
  const InitISO = new Date(initDate).toISOString();
  const endISO = new Date(endDate).toISOString();
  try {
    const search = await servicioModel.find({
      createdAt: {
        $gte: InitISO,
        $lt: endISO,
      },
    });
    //SECCION RECAUDO
    if (servicios.recaudo) {
      const pricesa = search.map((priceInstance) => priceInstance.precio);
      const prices = pricesa.reduce((acc, price) => acc + price, 0);
      servicesReturn.recaudo = prices;
    }
    //SECCION NUMERO DE SERVICIOS
    if (servicios.numServicios) {
      servicesReturn.numServicios = {};
      const numS = search.length;
      servicesReturn.numServicios.total = numS;
      const servicesAcabados = search.filter(
        (ser) => ser.estado === "Terminado"
      );
      servicesReturn.numServicios.acabados = servicesAcabados.length;
      const servicesStill = search.filter((ser) => ser.estado === "En proceso");
      servicesReturn.numServicios.still = servicesStill.length;
    }
    //SECCION TABLA DE INFORMACION DE SERVICIO SEGUN CARRO
    if (servicios.servicesPerCar) {
      const serviciosNames = await tarfiasModel
        .find()
        .select({ _id: 0, servicio: 1 })
        .sort({ servicio: 1 });
      servicesReturn.servicesPerCar = {};
      servicesReturn.servicesPerCar.servicesNames = serviciosNames;
      const servicesCar = search.filter((ser) => ser.tipoAuto === "Carro");
      const servicesCamioneta = search.filter(
        (ser) => ser.tipoAuto === "Camioneta"
      );
      servicesReturn.servicesPerCar.carData = calcDataCells(
        serviciosNames,
        servicesCar
      );
      servicesReturn.servicesPerCar.camionetaData = calcDataCells(
        serviciosNames,
        servicesCamioneta
      );
      servicesReturn.servicesPerCar.totalData = calcDataCells(
        serviciosNames,
        search
      );
    }
    return servicesReturn;
  } catch (error) {
    console.log(error);
  }
};

const createPDF = async (req, res) => {
  const { initDate, endDate, servicios, empleados } = req.body;
  let serviceData;
  let employeeData;
  if (servicios) {
    serviceData = await searchServices(initDate, endDate, servicios);
  }

  pdf
    .create(pdfTemplate(initDate, endDate, serviceData, empleados), {
      type: "pdf",
      timeout: "100000",
    })
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
