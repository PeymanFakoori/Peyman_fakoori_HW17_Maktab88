const createError = require("http-errors");
const company = require("../models/CompanyModel");

const createCompany = async (req, res, next) => {
  try {
    const newCompany = new company({
      name: req.body.name,
      registrationId: req.body.registrationId,
      city: req.body.city,
      state: req.body.state,
      phone: req.body.phone,
      registrationDate: req.body.registrationDate,
    });

    const savedCompany = await newCompany.save();

    const result = await res.json(savedCompany);
  } catch (error) {
    next(createError(500, "somthing went wrong"));
  }
};

const readCompanies = async (req, res, next) => {
  try {
    const allCompanies = await company.find({});
    res.json(allCompanies);
  } catch (error) {
    next(createError(500, "somthing went wrong"));
  }
};

const readCompanyById = async (req, res, next) => {
  try {
    const companyID = req.params.id;
    const foundCompany = await company.findById(companyID);
    res.json(foundCompany);
  } catch (error) {
    next(createError(500, "somthing went wrong"));
  }
};

const updateCompany = async (req, res, next) => {
  try {
    const fields = {
      name: req.body.name,
      registrationId: req.body.registrationId,
      city: req.body.city,
      state: req.body.state,
      phone: req.body.phone,
      registrationDate: req.body.registrationDate,
    };
    const companyID = req.params.id;
    const findCompany = await company.findByIdAndUpdate(companyID, fields, {
      new: true,
    });
    res.json(findCompany);
  } catch (error) {
    next(createError(500, "somthing went wrong"));
  }
};

const removeCompany = async (req, res, next) => {
  try {
    const companyID = req.params.id;
    const removedCompany = await company.findByIdAndDelete(companyID);
    res.json(removedCompany);
  } catch (error) {
    next(createError(500, "somthing went wrong"));
  }
};

module.exports = {
  createCompany,
  readCompanies,
  readCompanyById,
  updateCompany,
  removeCompany,
};
