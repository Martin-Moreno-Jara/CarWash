const express = require("express");
const {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  patchEmployee,
} = require("../controllers/empleadoCRUDController");

const router = express.Router();

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
