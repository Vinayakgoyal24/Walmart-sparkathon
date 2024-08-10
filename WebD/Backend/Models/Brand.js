const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    slug: {
      type: String,
      required: true,
      maxLength: 50,
      // unique: true,
    },
    image: {
      type: String,
      // required:true,
      maxLength: 200,
    },
    // category_id: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "Category",
    //   },
    // ],
    best_seller: {
      type: Boolean,
      default: false,
    },
    color: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Color",
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
    stock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
