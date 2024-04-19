const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const secureModel = require("./secureModel");
const logModel = require("./logModel");

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
      type: String,
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
    await logModel.create({
      madeBy: "No user",
      action: "LOGIN",
      action_detail: `user didn't fill the login fields`,
      status: "FAILED",
    });
    throw Error("Debe diligenciar todos los campos");
  }
  const existsUsuario = await this.findOne({ usuario });
  if (!existsUsuario) {
    await logModel.create({
      madeBy: `${usuario} (doesn't exist)`,
      action: "LOGIN",
      action_detail: `Tried to login with inexistent user`,
      status: "FAILED",
    });
    throw Error("El usuario no existe");
  }
  const validacionPassword = await bcrypt.compare(
    contrasena,
    existsUsuario.contrasena
  );
  if (!validacionPassword) {
    await logModel.create({
      madeBy: usuario,
      action: "LOGIN",
      action_detail: `Incorrect password`,
      status: "FAILED",
    });
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
  contrasena,
  passConfirm,
  loggedUser
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
    await logModel.create({
      madeBy: loggedUser,
      action: "CREATE EMPLOYEE",
      action_detail: `Tried to create employee, but not all fields are filled`,
      status: "FAILED",
    });
    throw Error("Todos los campos deben ser diligenciados");
  }

  const existsUsuario = await this.findOne({ usuario });
  if (existsUsuario) {
    await logModel.create({
      madeBy: loggedUser,
      action: "CREATE EMPLOYEE",
      action_detail: `Tried to create employee, but username already exists`,
      status: "FAILED",
    });
    throw Error("El usuario ya existe");
  }
  const existsCedula = await this.findOne({ cedula });
  if (existsCedula) {
    await logModel.create({
      madeBy: loggedUser,
      action: "CREATE EMPLOYEE",
      action_detail: `Tried to create employee, but document already exists`,
      status: "FAILED",
    });

    throw Error("La cedula no puede estar repetida");
  }

  const existsTelefono = await this.findOne({ telefono });
  if (existsTelefono) {
    await logModel.create({
      madeBy: loggedUser,
      action: "CREATE EMPLOYEE",
      action_detail: `Tried to create employee, but phone number already exists`,
      status: "FAILED",
    });
    throw Error("El telefono no puede estar repetido");
  }
  if (contrasena !== passConfirm) {
    await logModel.create({
      madeBy: loggedUser,
      action: "CREATE EMPLOYEE",
      action_detail: `Tried to create employee, but password doesn't match`,
      status: "FAILED",
    });
    throw Error("Las contraseñas no coinciden");
  }
  if (!validator.isStrongPassword(contrasena)) {
    await logModel.create({
      madeBy: loggedUser,
      action: "CREATE EMPLOYEE",
      action_detail: `Tried to create employee, but password is weak`,
      status: "FAILED",
    });
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
  loggedUser
) {
  if (!nombre || !apellido || !cedula || !direccion || !telefono || !usuario) {
    await logModel.create({
      madeBy: loggedUser,
      action: "UPDATE EMPLOYEE",
      action_detail: `Tried to update employee, but not all fields are filled`,
      status: "FAILED",
    });
    throw Error("Todos los campos deben ser diligenciados");
  }
  const existsUsuario = await this.findOne({ usuario });
  const newId = new mongoose.Types.ObjectId(id);
  if (existsUsuario && !existsUsuario._id.equals(newId)) {
    await logModel.create({
      madeBy: loggedUser,
      action: "UPDATE EMPLOYEE",
      action_detail: `Tried to update employee, but new username is already in use`,
      status: "FAILED",
    });
    throw Error("El usuario ya existe");
  }
  const existsCedula = await this.findOne({ cedula });
  if (existsCedula && !existsCedula._id.equals(newId)) {
    await logModel.create({
      madeBy: loggedUser,
      action: "UPDATE EMPLOYEE",
      action_detail: `Tried to update employee, but new document is already in use`,
      status: "FAILED",
    });
    throw Error("La cedula no puede estar repetida");
  }

  const existsTelefono = await this.findOne({ telefono });
  if (existsTelefono && !existsTelefono._id.equals(newId)) {
    await logModel.create({
      madeBy: loggedUser,
      action: "UPDATE EMPLOYEE",
      action_detail: `Tried to update employee, but new cellphone number is already in use`,
      status: "FAILED",
    });
    throw Error("El telefono no puede estar repetido");
  }

  const user = await this.findOneAndUpdate(
    { _id: id },
    {
      nombre,
      apellido,
      cedula,
      direccion,
      telefono,
      usuario,
    }
  );
  console.log(user);
  const updated = await this.findOne({ _id: id });
  return updated;
};

module.exports = mongoose.model("userModel", userSchema);
