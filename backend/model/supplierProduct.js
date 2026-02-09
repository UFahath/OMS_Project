import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema({
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },
  Product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  leadTimeDays: {
    type: Number,
    required: true,
  },
});
export const Supplier = mongoose.model("SupplierProduct", SupplierSchema);





