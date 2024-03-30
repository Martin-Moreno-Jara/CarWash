//controlador de mostrar empleadoss

const getEmployees = (req, res) => {
  res.json({ msg: "mostrar empleados" });
};
//controlador de mostrar un solo empleado

const getEmployee = (req, res) => {
  res.json({ msg: "mostrar empleado" });
};

//controlador de crear empleado

const createEmployee = (req, res) => {
  res.json({ msg: "crear empleado" });
};

//controlador de editar empleado

const patchEmployee = (req, res) => res.json({ msg: "editar empleado" });

//controlador de eliminar empleado

const deleteEmployee = (req, res) => {
  res.json({ msg: "eliminar empleado" });
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  patchEmployee,
  deleteEmployee,
};
