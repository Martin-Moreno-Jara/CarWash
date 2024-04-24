const express = require("express");
const {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  patchEmployee,
} = require("../controllers/empleadoCRUDController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
//requerir estar logeado
router.use(requireAuth);

//traer todos los empleados
router.get("/", getEmployees);
//traer un empleado
router.get("/:id", getEmployee);

//crear empleado
router.post("/signupEmployee", createEmployee);

//editar empleado
router.patch("/:id", patchEmployee);
//eliminar empleado
router.delete("/:id", deleteEmployee);

module.exports = router;
