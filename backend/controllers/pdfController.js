const pdf = require("html-pdf");
const path = require("path");
const pdfTemplate = require("../documents/template");
const empleadoModel = require("../models/userModel");
const servicioModel = require("../models/servicioModel");
const tarfiasModel = require("../models/tarifasModel");
const mongoose = require("mongoose");
const logModel = require("../models/logModel");
const fs = require("fs");

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
    const serviciosNames = await tarfiasModel
      .find()
      .select({ _id: 0, servicio: 1 })
      .sort({ servicio: 1 });
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
    if (servicios.ranking) {
      const promedioArray = [];
      serviciosNames.forEach((ser) => {
        const filter = search.filter(
          (dat) => ser.servicio === dat.tipoServicio
        );
        const sumaCalificacion = filter.reduce((acc, nota) => {
          if (!nota.calificacion) {
            nota.calificacion = 0;
          }
          return acc + nota.calificacion;
        }, 0);
        const divisor = filter.length === 0 ? 1 : filter.length;
        const promedio = parseFloat(sumaCalificacion / divisor).toFixed(1);
        promedioArray.push({
          servicio: ser.servicio,
          times: filter.length,
          promedio,
        });
      });
      promedioArray.sort((a, b) => {
        return b.promedio - a.promedio;
      });
      servicesReturn.ranking = promedioArray;
    }
    return servicesReturn;
  } catch (error) {
    console.log(error);
  }
};
const searchEmployees = async (initDate, endDate, empleados) => {
  let employeesReturn = {};
  employeesReturn.eachEmployee = [];
  employeesReturn.empleadosDespedidos = [];
  const despedidos = [];
  const InitISO = new Date(initDate).toISOString();

  const endISO = new Date(endDate).toISOString();

  const employees = await empleadoModel
    .find({
      createdAt: {
        $lt: endISO,
      },
    })
    .sort({ _id: -1 });
  console.log(employees);
  const allServices = await servicioModel.find({
    createdAt: {
      $gte: InitISO,
      $lt: endISO,
    },
  });

  allServices.forEach((service) => {
    let coincidencia = 0;
    employees.forEach((empleado) => {
      if (
        empleado._id.equals(
          new mongoose.Types.ObjectId(service.encargado[0].encargadoId)
        )
      ) {
        coincidencia += 1;
      }
    });
    if (coincidencia === 0) {
      despedidos.push(service);
    }
  });
  employeesReturn.displayDespedidos = false;
  if (despedidos.length > 0) {
    employeesReturn.displayDespedidos = true;
  }

  despedidos.forEach((serviceDespedido) => {
    const despedidoData = {};
    const usuarioDespedido = serviceDespedido.encargado[0].encargadoUsuario;
    const despedidosFiltered = despedidos.filter(
      (d) => d.encargado[0].encargadoUsuario === usuarioDespedido
    );
    despedidoData.empleadoName = `${serviceDespedido.encargado[0].encargadoNombre} (${usuarioDespedido})`;

    if (empleados.recaudoEmpleado) {
      const pricesa = despedidosFiltered.map(
        (priceInstance) => priceInstance.precio
      );
      const prices = pricesa.reduce((acc, price) => acc + price, 0);
      despedidoData.recaudoEmpleado = prices;
    }
    if (empleados.numServiciosEmpleado) {
      const numS = despedidosFiltered.length;
      despedidoData.numServiciosEmpleado = numS;
    }
    if (empleados.calificacion) {
      const sumaCalificacion = despedidosFiltered.reduce((acc, nota) => {
        if (!nota.calificacion) {
          nota.calificacion = 0;
        }
        return acc + nota.calificacion;
      }, 0);
      const divisor =
        despedidosFiltered.length === 0 ? 1 : despedidosFiltered.length;
      const promedio = parseFloat(sumaCalificacion / divisor).toFixed(1);
      despedidoData.calificacion = promedio;
    }
    employeesReturn.empleadosDespedidos.push(despedidoData);
  });

  if (empleados.numEmpleados) {
    employeesReturn.numEmpleados = employees.length;
  }

  for (let i = 0; i < employees.length; i++) {
    const empleadoData = {};
    empleadoData.empleadoName = `${employees[i].nombre} ${employees[i].apellido}`;

    const search = await servicioModel.find({
      createdAt: {
        $gte: InitISO,
        $lt: endISO,
      },
      "encargado.encargadoId": new mongoose.Types.ObjectId(employees[i]._id), // Filter by employee
    });

    //SECCION RECAUDO
    if (empleados.recaudoEmpleado) {
      const pricesa = search.map((priceInstance) => priceInstance.precio);
      const prices = pricesa.reduce((acc, price) => acc + price, 0);
      empleadoData.recaudoEmpleado = prices;
      employeesReturn.displayRecaudo = true;
    }

    //SECCION NUMERO DE SERVICIOS
    if (empleados.numServiciosEmpleado) {
      const numS = search.length;
      empleadoData.numServiciosEmpleado = numS;
      employeesReturn.displayNumServicios = true;
    }

    // RANKING
    if (empleados.calificacion) {
      employeesReturn.displayCalificacion = true;
      const sumaCalificacion = search.reduce((acc, nota) => {
        if (!nota.calificacion) {
          nota.calificacion = 0;
        }
        return acc + nota.calificacion;
      }, 0);
      const divisor = search.length === 0 ? 1 : search.length;
      const promedio = parseFloat(sumaCalificacion / divisor).toFixed(1);
      empleadoData.calificacion = promedio;
    }
    employeesReturn.eachEmployee.push(empleadoData);
  }

  return employeesReturn;
};

const createPDF = async (req, res) => {
  const { initDate, endDate, servicios, empleados } = req.body;
  let serviceData;
  let employeeData;
  if (servicios) {
    serviceData = await searchServices(initDate, endDate, servicios);
  }
  if (empleados) {
    employeeData = await searchEmployees(initDate, endDate, empleados);
  }

  try {
    if (checkDocument()) {
      fs.unlinkSync(path.join(__dirname, "report.pdf"));
    }
    console.log(employeeData);
    pdf
      .create(pdfTemplate(initDate, endDate, serviceData, employeeData), {
        type: "pdf",
        timeout: "100000",
        format: "Letter",
        childProcessOptions: {
          env: {
            OPENSSL_CONF: "/dev/null",
          },
        },
      })
      .toFile(`controllers/report.pdf`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("sin errores en crear pdf");
        }

        return;
      });
    await logModel.create({
      madeBy: req.loggedUser.usuario,
      action: "GENERATE REPORT",
      action_detail: `Admin ${req.loggedUser.usuario} Generated report`,
      status: "SUCCESSFUL",
    });
    res.status(200).json({ mgs: `File created at ${__dirname}/report.pdf` });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const checkDocument = () => {
  const docPath = path.join(__dirname, "report.pdf");
  try {
    if (fs.existsSync(docPath)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

const fetchPDF = async (req, res) => {
  try {
    await logModel.create({
      madeBy: req.loggedUser.usuario,
      action: "FETCH REPORT",
      action_detail: `Admin ${req.loggedUser.usuario} fetched report`,
      status: "SUCCESSFUL",
    });
    let check = false;

    while (!check) {
      check = checkDocument();
      console.log(check);
    }
    res.sendFile(path.join(__dirname, "report.pdf"));
  } catch (err) {
    await logModel.create({
      madeBy: req.loggedUser.usuario,
      action: "FETCH REPORT",
      action_detail: `Admin ${req.loggedUser.usuario} tried to fetch report`,
      status: "FAILED",
    });
    res.json({ error: err.message });
  }
};

module.exports = { createPDF, fetchPDF };
