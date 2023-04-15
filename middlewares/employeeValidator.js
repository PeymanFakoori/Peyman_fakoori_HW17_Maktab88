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

  if (
    !req.body.dateOfBirth.match(
      /(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).([19]{2})?([1-9]{2})/
    )
  )
    return next(createError(400, "wrong format"));

  if (!req.body.phone) return next(createError(400, "phone is required"));
  try {
    const checkPhone = await employee.exists({
      phone: req.body.phone,
    });
    if (checkPhone) return next(createError(400, "phone is exists"));
  } catch (error) {
    return next(createError(500, "server errore!!!!!"));
  }

  if (!req.body.nationalId)
    return next(createError(400, "nationallId is required"));

  if (req.body.nationalId.length != 10)
    return next(createError(400, "nationallId   must have 10 characters"));

  const checkNationalId = await employee.exists({
    nationallId: req.body.nationallId,
  });

  if (checkNationalId) return next(createError(400, "nasionalId is exists"));

  if (!req.body.state) req.body.state = "not-set";

  const stateField = [
    "tehran",
    "karaj",
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
