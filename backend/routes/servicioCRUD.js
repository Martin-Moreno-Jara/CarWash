const express = require("express");

const router = express.Router();

//traer todos los empleados
router.get("/", (req, res) => {
  res.json({ msg: "trayendo a todos los registros" });
});
//traer un empleado
router.get("/:id", (req, res) => {
  res.json({ msg: `trayendo un registro de id: ${req.params.id}` });
});
//crear empleado
router.post("/", (req, res) => {
  res.json({ msg: "creando registro" });
});

//editar empleado
router.patch("/:id", (req, res) => {
  res.json({ msg: `editando un registro de id: ${req.params.id}` });
});
//eliminar empleado
router.delete("/:id", (req, res) => {
  res.json({ msg: `eliminando un registro de id: ${req.params.id}` });
});

module.exports = router;
