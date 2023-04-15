const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const employeeValidator = require("../middlewares/employeeValidator");

const {
  creatEmployee,
  readEmployee,
  findEmployeeById,
  updateEmployee,
  removeEmployee,
} = require("../controllers/employeeController");

router.post("/new", employeeValidator, creatEmployee);

router.get("/all", readEmployee);

router.get("/:id", findEmployeeById);

router.put("/update/:id", updateEmployee);

router.delete("/remove/:id", removeEmployee);

module.exports = router;
