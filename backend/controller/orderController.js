import mongoose from "mongoose";
import { OrderHeader } from "../model/orderHeader.js";
import { OrderDetails } from "../model/orderDetails.js";

const createOrder = async (id, items, totalAmount, session) => {
//  console.log(items)
  const newOrderHeader = await OrderHeader.create([{
    customer: id,
    totalAmount
  }], { session });

  const orderId = newOrderHeader[0]._id;

  for (const item of items) {
    //  console.log(item)
    const productIdStr = item.productId.toString().trim();
    //  console.log(productIdStr,"\n",typeof productIdStr);
    if (!mongoose.Types.ObjectId.isValid(productIdStr)) {
      throw new Error(`Invalid productId: ${item.productId}`);
    }

    await OrderDetails.create([{
      orderDetails: orderId,
      productId: new mongoose.Types.ObjectId(productIdStr),
      quantity: item.quantity,
      price: item.price
    }], { session });
  }

  return orderId;
};

export { createOrder };