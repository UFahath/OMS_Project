import mongoose from "mongoose";
import { OrderDetails } from "../model/orderDetails.js";
import { Shipment } from "../model/shipment.js";
import { Supplier } from "../model/supplierProduct.js";

export const supplierOrders = async (req, res) => {
  try {
    const supplierId = req.user.id;

    // 1. Get products of this supplier
    const supplierProducts = await Supplier.find({Supplier: new mongoose.Types.ObjectId(supplierId)});
    console.log(supplierProducts);


    const supplierProductIds = supplierProducts.map(
      (item) => item.Product
    );
    console.log(supplierProductIds);


    if (supplierProductIds.length === 0) {
      return res.status(200).json([]);
    }

    // 2. Get order details + populate product + order header + customer
    const orders = await OrderDetails.find({
      productId: { $in: supplierProductIds },
    })
      .populate({
        path: "productId",
        select: "productName",
      })
      .populate({
        path: "orderDetails",
        select: "orderDate _id",
        populate: {
          path: "customer",
          select: "name address",
        },
      });

    const getAddress = async (id) => {
      const newAddress = await Shipment.findOne({ OrderHeaderId: id });
      const shippingAddress = newAddress?.shippingAddress || "Address not mentioned";
      console.log("shipping", shippingAddress);

      return shippingAddress
    }




    // 3. Format response
    const supplierOrders = await Promise.all( orders.map(async(ord) => {
      const address = await getAddress(ord.orderDetails._id)
      console.log("address", address)
      
      return({
        orderDetailsId: ord._id,
        productName: ord.productId?.productName || "Unknown Addres",
        quantity: ord.quantity,
        price: ord.price,
        orderDate: ord.orderDetails.orderDate.toLocaleString(),
        customerAddress: `${ord.orderDetails?.customer?.name}, ${address}` || "N/A",
    })
     
    }));

  res.status(200).json({
    success: true,
    count: supplierOrders.length,
    data: supplierOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)),
  });
} catch (error) {
  console.error(error);
  res.status(500).json({
    success: false,
    message: "Server Error",
  });
}
};
