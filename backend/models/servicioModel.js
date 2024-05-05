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
  carInfo
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
      madeBy: "Yet no authentication",
      action: "CREATE SERVICE",
      action_detail: `user USUARIO tried to create service, but didn't fill mandatory fields`,
      status: "FAILED",
    });
    throw Error("Diligencie los campos obligatorios");
  }
  const previousServices = await this.find({ placa });
  previousServices.forEach((service) => {
    if (service.estado === "En proceso") {
      logModel.create({
        //TODO: cambiar madeby
        madeBy: "Yet no authentication",
        action: "CREATE SERVICE",
        action_detail: `user USUARIO tried to create service, but there's alreay an opened service with this car`,
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
  });
  return servicio;
};

module.exports = mongoose.model("servicioModel", servicioSchema);
