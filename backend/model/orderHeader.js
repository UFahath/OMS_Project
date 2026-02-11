
import mongoose from "mongoose";

const orderHeaderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer", 
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Shipped","Completed", "Cancelled"],
    default: "Pending" 
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 1 
  },
  orderDate: {
    type: Date,
    default: Date.now,
    required: true
  }
},{
  timestamps: true
});

export const OrderHeader = mongoose.model("OrderHeader", orderHeaderSchema); // Fixed: PascalCase



