import mongoose from "mongoose";

const supportTicketSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    orderDetailsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderDetails",
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    status: {
      type: String,
      enum: ["Pending", "Resolved", "Closed"],
      default: "Pending",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },
  },
  {
    timestamps: true,
  },
);

export const SupportTicket = mongoose.model(
  "SupportTicket",
  supportTicketSchema,
);


