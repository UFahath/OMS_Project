import mongoose from "mongoose";
import {Supplier} from "../model/supplierProduct.js";

import { Product } from "../model/product.js";

//Get Supplier Product
// const getSupplierProduct = async (req, res) => {
//   try {
//     const { id: supplierIdStr } = req.user;

//     if (!supplierIdStr) {
//       return res.status(401).json({ msg: "Unauthorized" });
//     }

//     if (!mongoose.Types.ObjectId.isValid(supplierIdStr)) {
//       return res.status(400).json({ msg: "Invalid supplier id" });
//     }

//     const supplierId = new mongoose.Types.ObjectId(supplierIdStr);

//     const supplierProducts = await Supplier
//       .find({ Supplier: supplierId })
//       .populate("Product");

//     if (!supplierProducts.length) {
//       return res.status(404).json({ msg: "No products found" });
//     }

//     const products = supplierProducts.map(item => item.Product);

//     return res.status(200).json({ products });

//   } catch (err) {
//     return res.status(500).json({ msg: "Internal Server Error" });
//   }
// };


//delete Supplier Product
const deleteSupplierProduct = async (req, res) => {
  try {
    let id = req.params.id;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid Id" });
    }

    const productId = new mongoose.Types.ObjectId(id);
    const product = await Product.findByIdAndUpdate(
      productId,
      { $set: { status: "INACTIVE" } },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ msg: "Supplier Product not found" });
    }

    return res.status(200).json({ msg: "Supplier Product deleted successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};


//getSupplierProduct
const getSupplierProduct =async(req,res)=>{
  
      const supplierId=req.user.id
      const product=await Supplier.aggregate([
        {
          $match:{
              supplierId:new mongoose.Types.ObjectId(supplierId)
          }
         
        },

        {
           $lookup: {
      from: "products",
      localField: "productId",
      foreignField: "_id",
      as: "productDetails"
                }

        },
        {
    $unwind: "$productDetails"
  },
  {
    $replaceRoot: {
      newRoot: "$productDetails"
    }
  }
      ])
   return res.status(200).json({
  success: true,
  product
});
}

export{ deleteSupplierProduct,getSupplierProduct}

