const createError = require("http-errors");
const company = require("../models/CompanyModel");

const creationValidator = async (req, res, next) => {
  if (!req.body.name) return next(createError(400, "name is required"));

  if (!req.body.registrationId)
    return next(createError(400, "registrationId is required"));

  if (!req.body.city) return next(createError(400, "city is required"));

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

  if (!req.body.phone) return next(createError(400, "phone is required"));
  try {
    const checkPhone = await company.exists({
      phone: req.body.phone,
    });

    if (checkPhone) return next(createError(400, "phone is exists"));
  } catch (error) {
    return next(createError(500, "server errore!!!!!"));
  }

  // if (
  //   !req.body.dateOfBirth.match(
  //     /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
  //   )
  // )
  //   return next(createError(400, "wrong format"));
  next();
};

module.exports = creationValidator;
