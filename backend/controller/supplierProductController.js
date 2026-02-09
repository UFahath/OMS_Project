import mongoose from "mongoose";
import { Supplier } from "../model/supplierProduct.js";

const getSupplierProduct = async (req, res) => {
  try {
    const supplierIdStr = req.user?.id || req.user?._id;

    if (!supplierIdStr) {
      return res.status(401).json({ msg: "Unauthorized: Missing user id" });
    }

    if (!mongoose.Types.ObjectId.isValid(supplierIdStr)) {
      return res.status(400).json({ msg: "Invalid supplier id" });
    }

    const supplierId = new mongoose.Types.ObjectId(supplierIdStr);

    const supplierProduct = await Supplier.find({ Supplier: supplierId })
    if (!supplierProduct.length) {
      return res.status(404).json({ msg: "SupplierIdMismatch" });
    }
     
    // supplierProduct.forEach(({key})=>{
    //     if(key === "")
    // })
    // for(let key in supplierProduct){
    //     for(let key1 in supplierProduct[key]){
    //         if(key1 === "Product"){
    //             console.log(supplierProduct[key])
    //         }
    //     }
    // }
    return res.status(200).json({supplierProduct});
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error", error: err.message });
  }
};

export { getSupplierProduct };
