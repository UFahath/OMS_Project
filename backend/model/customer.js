import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      match: [/^\+?[0-9]{7,15}$/, "Invalid contact number"]
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
    useremail: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"]
    },
    password: {
      type: String,
      required: true,
    }
  },
  { timestamps: true } 
);

// Helpful indexes
// customerSchema.index({ useremail: 1 }, { unique: true });
customerSchema.index({ phoneno: 1 }); // optional (remove if not needed)

export const Customer = mongoose.model("Customer", customerSchema);






