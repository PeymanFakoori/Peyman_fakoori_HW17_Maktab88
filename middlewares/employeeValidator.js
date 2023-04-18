const createError = require("http-errors");

const employee = require("../models/EmployeeModel");

const creationValidator = async (req, res, next) => {
  if (!req.body.firstName)
    return next(createError(400, "firstname is required"));
  if (!req.body.lastName) return next(createError(400, "lastname is required"));
  if (!req.body.gender) req.body.gender = "not-set";

  if (!["male", "female", "not-set"].includes(req.body.gender))
    return next(createError(400, " gender must be male or female"));

  if (!req.body.dateOfBirth)
    return next(createError(400, "dateOfBirth is required"));

  if (!req.body.phone) return next(createError(400, "phone is required"));
  try {
    const checkPhone = await employee.exists({
      phone: req.body.phone,
    });
    if (checkPhone) return next(createError(400, "phone is exists"));
  } catch (error) {
    return next(createError(500, "server error"));
  }

  if (!req.body.nationalId)
    return next(createError(400, "nationalId is required"));

  const checkID = await employee.exists({
    nationalId: req.body.nationalId,
  });

  if (checkID) return next(createError(400, "nationalCode is dublicate!!!!!!"));

  if (!req.body.state) req.body.state = "not-set";

  const stateField = [
    "tehran",
    "alborz",
    "khorasan",
    "fars",
    "azarbayjan sharghi",
    "azarbayjan gharbi",
    "ardebil",
    "isfahan",
    "khoozestan",
    "kermanshah",
    "gilan",
    "kerman",
    "sistan baloochestan",
    "yazd",
    "golestan",
    "chahrmahal bakhtiyari",
    "qazvin",
    "lorestan",
    "mazandaran",
    "Hamedan",
    "markazi",
    "hormozgan",
    "Qom",
    "zanjan",
  ].includes(req.body.state);
  if (!stateField) return next(createError(400, "state not found"));

  if (!req.body.company) return next(createError(400, "company is required"));

  if (!req.body.role) req.body.role = "employee";

  const roleField = ["employee", "manager"].includes(req.body.role);
  if (!roleField)
    return next(createError(400, "role is not manager or employee"));

  next();
};

module.exports = creationValidator;
