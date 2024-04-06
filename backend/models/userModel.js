const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const secureModel = require("./secureModel");

const userSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    cedula: {
      type: Number,
      required: true,
      unique: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    telefono: {
      type: Number,
      required: true,
      unique: true,
    },
    rol: {
      type: String,
      required: true,
      default: "empleado",
    },
    usuario: {
      type: String,
      required: true,
      unique: true,
    },
    contrasena: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//hacer login
userSchema.statics.login = async function (usuario, contrasena) {
  if (!usuario || !contrasena) {
    throw Error("Debe diligenciar todos los campos");
  }
  const existsUsuario = await this.findOne({ usuario });
  if (!existsUsuario) {
    throw Error("El usuario no existe");
  }
  const validacionPassword = await bcrypt.compare(
    contrasena,
    existsUsuario.contrasena
  );
  if (!validacionPassword) {
    throw Error("La contraseña es incorrecta");
  }
  return existsUsuario;
};
//TODO hacer lo de strong password con validator
//hacer signup

userSchema.statics.signup = async function (
  nombre,
  apellido,
  cedula,
  direccion,
  telefono,
  rol,
  usuario,
  contrasena
) {
  if (
    !nombre ||
    !apellido ||
    !cedula ||
    !direccion ||
    !telefono ||
    !usuario ||
    !contrasena
  ) {
    throw Error("Todos los campos deben ser diligenciados");
  }
  const existsUsuario = await this.findOne({ usuario });
  if (existsUsuario) {
    throw Error("El usuario ya existe");
  }
  const existsCedula = await this.findOne({ cedula });
  if (existsCedula) {
    throw Error("La cedula no puede estar repetida");
  }

  const existsTelefono = await this.findOne({ telefono });
  if (existsTelefono) {
    throw Error("El telefono no puede estar repetido");
  }
  if (!validator.isStrongPassword(contrasena)) {
    throw Error(
      "La contraseña es debil. Incluir mayúsculas,minúsculas, números y caracter especial"
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(contrasena, salt);

  const user = await this.create({
    nombre,
    apellido,
    cedula,
    direccion,
    telefono,
    rol,
    usuario,
    contrasena: hashedPassword,
  });
  const secureCopy = await secureModel.create({
    id: user._id,
    key: contrasena,
  });
  return user;
};

userSchema.statics.updateEmployee = async function (
  id,
  nombre,
  apellido,
  cedula,
  direccion,
  telefono,
  usuario,
  contrasena
) {
  const existsUsuario = await this.findOne({ usuario });
  if (existsUsuario && existsUsuario.usuario !== usuario) {
    throw Error("El usuario ya existe");
  }
  const existsCedula = await this.findOne({ cedula });
  if (existsCedula && existsCedula.cedula !== cedula) {
    throw Error("La cedula no puede estar repetida");
  }

  const existsTelefono = await this.findOne({ telefono });
  if (existsTelefono && existsTelefono.telefono !== telefono) {
    throw Error("El telefono no puede estar repetido");
  }
  if (!validator.isStrongPassword(contrasena)) {
    throw Error(
      "La contraseña es debil. Incluir mayúsculas,minúsculas, números y caracter especial"
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(contrasena, salt);

  const user = await this.findOneAndUpdate(
    { _id: id },
    {
      nombre,
      apellido,
      cedula,
      direccion,
      telefono,
      usuario,
      contrasena: hashedPassword,
    }
  );
  const updated = await this.findOne({ _id: id });
  const secureCopy = await secureModel.updateOne({ id }, { key: contrasena });
  return updated;
};

module.exports = mongoose.model("userModel", userSchema);
