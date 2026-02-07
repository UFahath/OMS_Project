import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    OrderHeaderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderHeader",
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "UPI"],
      default: "Cash",
    },
    paymentStatus: {
      type: String,
      enum: ["Failed", "Paid"],
      default: "Failed",
    },
    paymentDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  },
);


export const Payment = mongoose.model("Payment", paymentSchema);


