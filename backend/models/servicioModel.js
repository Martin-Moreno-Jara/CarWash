const mongoose = require("mongoose");
const logModel = require("./logModel");
const Schema = mongoose.Schema;

const encargadoSchema = new Schema({
  encargadoId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  encargadoNombre: {
    type: String,
    required: true,
  },
  encargadoUsuario: {
    type: String,
    required: true,
  },
});

const servicioSchema = new Schema(
  {
    cliente: {
      type: String,
      required: true,
    },
    placa: {
      type: String,
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
      default: Date.now,
    },
    tipoAuto: {
      type: String,
      required: true,
    },
    tipoServicio: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    encargado: {
      type: [encargadoSchema],
      required: true,
    },
    carInfo: {
      type: String,
      required: false,
      default: "",
    },
    estado: {
      type: String,
      required: true,
      default: "En proceso",
    },
    calificacion: {
      type: Number,
      required: false,
    },
    historial: {
      type: [],
      required: false,
    },
  },
  { timestamps: true }
);

//TODO: enviar el token de autenticacion luego de hacer front
servicioSchema.statics.insertService = async function (
  cliente,
  placa,
  tipoAuto,
  tipoServicio,
  precio,
  encargado,
  carInfo,
  loggedUser,
  historial
) {
  if (
    !cliente ||
    !placa ||
    !tipoAuto ||
    !tipoServicio ||
    !precio ||
    !encargado
  ) {
    await logModel.create({
      //TODO: cambiar madeby
      madeBy: loggedUser,
      action: "CREATE SERVICE",
      action_detail: `user ${loggedUser} tried to create service, but didn't fill mandatory fields`,
      status: "FAILED",
    });
    throw Error("Diligencie los campos obligatorios");
  }
  const previousServices = await this.find({ placa });
  previousServices.forEach((service) => {
    if (service.estado === "En proceso") {
      logModel.create({
        //TODO: cambiar madeby
        madeBy: loggedUser,
        action: "CREATE SERVICE",
        action_detail: `user ${loggedUser} tried to create service, but there's alreay an opened service with this car`,
        status: "FAILED",
      });
      throw Error("Este carro ya tiene un servicio abierto.");
    }
  });

  const servicio = await this.create({
    cliente,
    placa,
    tipoAuto,
    tipoServicio,
    precio,
    encargado,
    carInfo,
    historial
  });
  return servicio;
};

servicioSchema.statics.updateService = async function (
  id,
  cliente,
  placa,
  tipoAuto,
  tipoServicio,
  precio,
  encargado,
  carInfo,
  loggedUser,
  historial
) {
  if (!cliente || !placa || !tipoAuto || !tipoServicio || !encargado) {
    await logModel.create({
      //TODO: cambiar madeby
      madeBy: loggedUser,
      action: "UPDATE SERVICE",
      action_detail: `Tried to update service, but not all required fields are filled`,
      status: "FAILED",
    });
    throw Error("Todos los campos obligatorios deben ser diligenciados");
  }
  const existsSERVICE = await this.findOne({ placa });
  const newId = new mongoose.Types.ObjectId(id);

  const previousServices = await this.find({ placa });
  previousServices.forEach((service) => {});

  if (existsSERVICE && !existsSERVICE._id.equals(newId)) {
    if (existsSERVICE.estado === "En proceso") {
      await logModel.create({
        //TODO: cambiar madeby
        madeBy: loggedUser,
        action: "UPDATE SERVICE",
        action_detail: `Tried to update service, but new vehicle has a service already in process`,
        status: "FAILED",
      });
      //TODO: cambiar el throw
      throw Error(`El vehículo "${placa}" ya tiene un servicio abierto`);
    }
  }

  console.log(encargado);

  const newEntry = historial;

  const service = await this.findOneAndUpdate(
    { _id: id },
    {
      id,
      cliente,
      placa,
      tipoAuto,
      tipoServicio,
      precio,
      encargado,
      carInfo,
      $push: { historial: newEntry },
    }
  );
  
  console.log(service);
  const updated = await this.findOne({ _id: id });
  return updated;
};

module.exports = mongoose.model("servicioModel", servicioSchema);
