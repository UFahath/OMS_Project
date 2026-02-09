// import { OrderDetails } from "../model/orderDetails.js";
// import { Product } from "../model/product.js";
// import { Supplier } from "../model/supplierProduct.js";
// export const supplierOrders = async (req, res) => {
//     try {
//         const { id } = req.user;
//         const supplierProducts = await Supplier.find({ Supplier: id })
//         let supplierProductIds = [];
//         for (const pro of supplierProducts) {
//             supplierProductIds.push(pro.Product)
//         }
//         const orders = await OrderDetails.find({ productId: { $in: supplierProductIds } })
//         supplierOrders = orders.map( async (ord)=>{
//             return(
//                 {
//                     ...orders,
//                     productName: await Product.find({_id : ord.productId})
//                 }
//             )
//         })
//         console.log(supplierOrders);
        
//         res.status(200).json({supplierOrders})

//     } catch (error) {
//         res.status(500).json("Server Error")
//     }
// }

import { OrderDetails } from "../model/orderDetails.js";
import { Product } from "../model/product.js";
import { Supplier } from "../model/supplierProduct.js";

export const supplierOrders = async (req, res) => {
  try {
    const { id } = req.user;

    // Get products of this supplier
    const supplierProducts = await Supplier.find({ Supplier: id });
    const supplierProductIds = supplierProducts.map((p) => p.Product);

    // Get all orders for these products
    const orders = await OrderDetails.find({ productId: { $in: supplierProductIds } });

    // Attach product name
    const supplierOrders = await Promise.all(
      orders.map(async (ord) => {
        const product = await Product.findById(ord.productId);
        return {
          _id: ord._id,
          orderDetails: ord.orderDetails,
          productId: ord.productId,
          productName: product ? product.productName : "Unknown Product",
          quantity: ord.quantity,
          price: ord.price,
        };
      })
    );

    res.status(200).json(supplierOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
};
