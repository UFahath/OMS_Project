import mongoose from "mongoose";

const ProductCategorySchema = new mongoose.Schema(
  {
    category_id: {
      type: String,           
      required: true,
      unique: true,
      index: true,
      trim: true
    },

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

   
    parent_category_id: {
      type: String,           
      default: null,
      index: true
    },

    status: {
      type: String,
      required: true,
      enum: ["ACTIVE", "INACTIVE", "OUT_OF_STOCK"],
      default: "ACTIVE"
    }
  },
  {
    timestamps: { createdAt: "created_date", updatedAt: "updated_date" },
    versionKey: false
  }
);

ProductCategorySchema.index({ category_id: 1 }, { unique: true });


ProductCategorySchema.index(
  { category_name: 1, parent_category_id: 1 },
  { unique: true }
);

const ProductCategory = mongoose.model("ProductCategory", ProductCategorySchema);
export default ProductCategory;