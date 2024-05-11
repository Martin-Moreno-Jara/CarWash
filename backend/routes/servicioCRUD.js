const express = require("express");
const {
  getAllServices,
  getserviceByEmployee,
  getService,
  createService,
  patchService,
  deleteService,
  completeService,
} = require("../controllers/servicioCRUDController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
router.use(requireAuth);

//traer todos los servicios
router.get("/", getAllServices);

router.get("/employee/:id", getserviceByEmployee);
//traer un servicio
router.get("/:id", getService);
//crear servicio
router.post("/", createService);

//editar servicio
router.patch("/:id", patchService);
//eliminar servicio
router.delete("/:id", deleteService);

//Completar servicio
router.patch("/complete/:id", completeService);

module.exports = router;
