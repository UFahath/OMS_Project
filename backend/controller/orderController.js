import mongoose from "mongoose";

import { OrderHeader } from "../model/orderHeader.js";

import { OrderDetails } from "../model/orderDetails.js";

const createOrder = async (req, res) => {
  console.log("req body:", req.body);

  const { items, totalAmount } = req.body;
  const customerId = req.user.id;

  try {
    const newOrderHeader = await OrderHeader.create({
      customer: customerId,
      totalAmount,
    });
    const orderId = newOrderHeader._id;
    for (const item of items) {
      const newOrderDetails = await OrderDetails.create({
        orderDetails: orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });
    }
    res.status(201).json({
      message: "Order placed successfully",
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
