import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
  {
    OrderHeaderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderHeader",
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    shipmentStatus: {
      type: String,
      enum: ["Shipped", "Delivered"],
      default: "Shipped",
    },
    shipmentDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export const Shipment = mongoose.model("Shipment", shipmentSchema);





