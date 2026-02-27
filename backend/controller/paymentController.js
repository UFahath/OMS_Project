import mongoose from 'mongoose';
import { OrderHeader } from '../model/orderHeader.js';
import { Payment } from '../model/payment.js';

export const createPayment = async (orderId, totalAmount,session,res) => {
  // try {
    // const { OrderHeaderId, amount } = req.body;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OrderHeaderId',
      });
    }

    const order = await OrderHeader.findById(orderId).session(session);
    if (!orderId) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    const existingPayment = await Payment.findOne({ orderId}).session(session);
    if (existingPayment) {
      return res.status(409).json({
        success: false,
        message: 'Payment already exists for this order',
      });
    }

    const payment = await Payment.create([{
      OrderHeaderId: order._id,
      amount:totalAmount,
      paymentMethod: 'UPI',
      paymentStatus: 'Paid',
    }],{session});

    // return res.status(201).json({
    //   success: true,
    //   message: 'Payment created successfully',
    //   data: payment,
    // });
    // console.log(payment)
    return true;
  // } catch (error) {
  //   return res.status(500).json({
  //     success: false,
  //     message: error.message,
  //   });
  // }
};
