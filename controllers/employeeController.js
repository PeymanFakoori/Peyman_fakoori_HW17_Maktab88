const createError = require("http-errors");
const employee = require("../models/EmployeeModel");

const creatEmployee = async (req, res, next) => {
  try {
    const newEmployee = new employee({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      dateOfBirth: req.body.dateOfBirth,
      phone: req.body.phone,
      nationalId: req.body.nationalId,
      state: req.body.state,
      company: req.body.company,
      role: req.body.role,
    });

    const savedEmployee = await newEmployee.save();
    const populatedEmployee = await savedEmployee.populate({
      path: "company",
      select: { __v: 0 },
    });
    return res.json(populatedEmployee);
  } catch (error) {
    return next(createError(500, "somthing went wrong"));
  }
};

const readEmployee = async (req, res, next) => {
  try {
    const allEmployee = await employee.find({});
    res.json(allEmployee);
  } catch (error) {
    next(createError(500, "somthing went wrong"));
  }
};

const findEmployeeById = async (req, res, next) => {
  try {
    const employeeID = req.params.id;
    const found = await employee
      .findById(employeeID)
      .populate({ path: "company", select: { __v: 0 } });
    res.json(found);
  } catch (error) {
    console.log(error);
    next(createError(500, "somthing went wrong"));
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const fields = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      dateOfBirth: req.body.dateOfBirth,
      phone: req.body.phone,
      nationalId: req.body.nationalId,
      state: req.body.state,
      company: req.body.company,
      role: req.body.role,
    };
    const employeeID = req.params.id;
    const findEmployee = await employee.findByIdAndUpdate(employeeID, fields, {
      new: true,
    });
    res.json(findEmployee);
  } catch (error) {
    console.log(error);
    return next(createError(500, error.message));
  }
};

const removeEmployee = async (req, res, next) => {
  try {
    const employeeID = req.params.id;
    const removedEmployee = await employee.findByIdAndDelete(employeeID);
    res.json(removedEmployee);
  } catch (error) {
    next(createError(500, "somthing went wrong"));
  }
};

module.exports = {
  creatEmployee,
  readEmployee,
  findEmployeeById,
  updateEmployee,
  removeEmployee,
};
