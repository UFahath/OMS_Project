import mongoose from "mongoose";

const ProductCategorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500
    },
    status: {
      type: String,
      required: true,
      enum: ["ACTIVE", "INACTIVE", "OUT_OF_STOCK"],
      default: "ACTIVE"
    }
  },
  {
    timestamps: true
  }
);


export const ProductCategory = mongoose.model("ProductCategory", ProductCategorySchema);
