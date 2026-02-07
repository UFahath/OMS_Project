import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", 
      required: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse", 
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Inventory = mongoose.model("Inventory", inventorySchema); 
