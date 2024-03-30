const express = require("express");

const router = express.Router();

//traer todos los empleados
router.get("/", (req, res) => {
  res.json({ msg: "trayendo a todos los empleados" });
});
//traer un empleado
router.get("/:id", (req, res) => {
  res.json({ msg: `trayendo un empleado de id: ${req.params.id}` });
});
//crear empleado
router.post("/", (req, res) => {
  res.json({ msg: "creando empleado" });
});

//editar empleado
router.patch("/:id", (req, res) => {
  res.json({ msg: `editando un empleado de id: ${req.params.id}` });
});
//eliminar empleado
router.delete("/:id", (req, res) => {
  res.json({ msg: `eliminando un empleado de id: ${req.params.id}` });
});

module.exports = router;
