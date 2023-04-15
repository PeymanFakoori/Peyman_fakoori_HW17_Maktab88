const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    registrationId: {
      type: Number,
      unique: true,
      required: true,
    },
    city: {
      type: String,
      trim: true,
      required: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
      enum: [
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
      ],
    },
    phone: {
      type: Number,
      unique: true,
      required: true,
    },
    registrationDate: {
      type: Date,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("company", CompanySchema);
