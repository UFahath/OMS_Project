import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema(
  {
    supplier_id: {
      type: String,          
      required: true,
      unique: true,
      index: true,
      trim: true
    },

    supplier_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },

    contact_number: {
      type: String,
      required: true,
      trim: true,
      unique: true, 
      match: [/^\+?[0-9]{7,15}$/, "Invalid contact number"]
    },

    address: {
      type: String,
      trim: true,
      maxlength: 500
    },

    useremail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"]
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false 
    }
  },
  {
    timestamps: { createdAt: "created_date", updatedAt: "updated_date" },
    versionKey: false
  }
);


SupplierSchema.index({ supplier_id: 1 }, { unique: true });
SupplierSchema.index({ useremail: 1 }, { unique: true });


const Supplier = mongoose.model("Supplier", SupplierSchema);
export default Supplier;