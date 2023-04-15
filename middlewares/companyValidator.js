const createError = require("http-errors");
const company = require("../models/CompanyModel");

const creationValidator = async (req, res, next) => {
  if (!req.body.name) return next(createError(400, "name is required"));
  if (!req.body.registrationId)
    return next(createError(400, "registrationId is required"));
  if (!req.body.city) return next(createError(400, "city is required"));
  if (!req.body.state) return next(createError(400, "state is required"));
};
