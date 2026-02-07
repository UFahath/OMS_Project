import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    supplier_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    contact_number: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [/^\+?[0-9]{7,15}$/, "Invalid contact number"],
    },

    address: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    useremail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Supplier = mongoose.model("Supplier", supplierSchema);




