import mongoose from "mongoose";

const returnSchema = new mongoose.Schema(
  {
    OrderDetailsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderDetails",
      required: true,
    },
    returnReason: {
      type: String,
      required: true,
      maxlength: 500,
    },
    returnStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    returnDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export const Return = mongoose.model("Return", returnSchema);








