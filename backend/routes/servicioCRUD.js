const express = require("express");
const {
  getServices,
  getService,
  createService,
  patchService,
  deleteService,
} = require("../controllers/servicioCRUDController");

const router = express.Router();

//traer todos los empleados
router.get("/", getServices);
//traer un empleado
router.get("/:id", getService);
//crear empleado
router.post("/", createService);

//editar empleado
router.patch("/:id", patchService);
//eliminar empleado
router.delete("/:id", deleteService);

module.exports = router;
