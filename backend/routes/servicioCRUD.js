const express = require("express");
const {
  getAllServices,
  getserviceByEmployee,
  getService,
  createService,
  patchService,
  deleteService,
} = require("../controllers/servicioCRUDController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
//TODO: Habilitar requireAuth luego del front
router.use(requireAuth);

//traer todos los empleados
router.get("/", getAllServices);

router.get("/employee/:id", getserviceByEmployee);
//traer un empleado
router.get("/:id", getService);
//crear empleado
router.post("/", createService);

//editar empleado
router.patch("/:id", patchService);
//eliminar empleado
router.delete("/:id", deleteService);

module.exports = router;
