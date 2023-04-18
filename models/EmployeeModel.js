const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "not-set",
    },
    dateOfBirth: {
      type: Date,
      trim: true,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
      match: /^09[0-9]{9}$/,
    },
    nationalId: {
      type: Number,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 10,
    },
    state: {
      type: String,
      required: true,
      trim: true,
      enum: [
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
      ],
    },
    role: {
      type: String,
      enum: ["manager", "employee"],
      required: true,
      trim: true,
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: "company",
      trim: true,
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("employee", EmployeeSchema);
