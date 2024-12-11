const express = require("express");
const router = express.Router();

//Insert Employee Model
const Employee = require("../Models/EmployeeModel");

//Insert Employee Comtroller
const EmployeeController = require("../Controllers/EmployeeController");

router.get("/",EmployeeController.getAllEmployees);
router.post("/",EmployeeController.addEmployees);
router.get("/:emp_id",EmployeeController.getEmployeeById);
router.put("/:emp_id",EmployeeController.updateEmployee);
router.delete("/:emp_id",EmployeeController.deleteEmployee);

//export
module.exports = router;