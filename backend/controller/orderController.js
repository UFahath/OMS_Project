import mongoose from "mongoose";
import { orderHeader as OrderHeaderModel } from "../model/orderDetails";
import { OrderDetails } from "../model/orderDetails";

const createOrder = async (req, res) => {
  const { productId, quantity, price, totalAmount } = req.body;
  const customerId = req.user.userid;

  try {
    const newOrderHeader = await OrderHeaderModel.create({
      customer: customerId,
      totalAmount,
    });


    const orderId = newOrderHeader._id;

 
    const newOrderDetails = await OrderDetails.create({
    orderDetails:orderId,
      productId,
      quantity,
      price,
    });

    res.status(201).json({
      message: "Order created successfully",
      orderHeader: newOrderHeader,
     
    });

  } catch (err) {
    res.status(500).json({
      message: "Failed to create order",
      error: err.message,
    });
  }
};

export { createOrder };
