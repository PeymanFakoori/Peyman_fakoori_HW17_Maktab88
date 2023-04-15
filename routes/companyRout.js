const express = require("express");
const router = express.Router();

const {
  createCompany,
  readCompanies,
  readCompanyById,
  updateCompany,
  removeCompany,
} = require("../controllers/companyController");

const companyValidator = require("../middlewares/companyValidator");

router.post("/new", companyValidator, createCompany);

router.get("/all", readCompanies);

router.get("/:id", readCompanyById);

router.put("/update/:id", updateCompany);

router.delete("/remove/:id", removeCompany);

module.exports = router;
