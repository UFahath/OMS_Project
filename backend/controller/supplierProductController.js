import mongoose from "mongoose";
import {Supplier} from "../model/supplierProduct.js";


const getSupplierProduct = async (req, res) => {
  try {
    const {id:supplierIdStr} = req.user;

    if (!supplierIdStr) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    if (!mongoose.Types.ObjectId.isValid(supplierIdStr)) {
      return res.status(400).json({ msg: "Invalid supplier id" });
    }

    const supplierId = new mongoose.Types.ObjectId(supplierIdStr);

    const supplierProducts = await Supplier
      .find({ Supplier: supplierId })
      .populate("Product");

    if (!supplierProducts.length) {
      return res.status(404).json({ msg: "No products found" });
    }

    const products = supplierProducts.map(item => item.Product);

    return res.status(200).json({ products });

  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export { getSupplierProduct };
