import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema(
  {
    warehouse_name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
      default: "India",
    },
    pincode: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Warehouse = mongoose.model("Warehouse", warehouseSchema);
















