import mongoose from "mongoose";

const refundSchema = new mongoose.Schema(
  {
    returnID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Return",
      required: true,
    },
    paymentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    refundAmount : {
        type : Number,
        required : true,
        min : 1
    },
    refundStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    }
  },
  {
    timestamps: true,
  },
);

export const Refund = mongoose.model("Refund", refundSchema);

