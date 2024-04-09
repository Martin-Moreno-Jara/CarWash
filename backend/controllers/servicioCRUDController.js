//controlador de mostrar servicios

const getServices = (req, res) => {
  res.json({ msg: "mostrar servicios" });
};

//controlador de mostrar un servicio

const getService = (req, res) => {
  res.json({ msg: "mostrar servicio" });
};

//controlador de crear servicio

const createService = (req, res) => {
  res.json({ msg: "crear servicio" });
};

//controlador de editar servicio

const patchService = (req, res) => res.json({ msg: "editar servicio" });

//controlador de eliminar servicio

const deleteService = (req, res) => {
  res.json({ msg: "eliminar servicio" });
};

module.exports = {
  getServices,
  getService,
  createService,
  patchService,
  deleteService,
};
