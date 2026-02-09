import mongoose from 'mongoose';
import { OrderHeader } from '../model/orderHeader.js';
import { Payment } from '../model/payment.js';

export const createPayment = async (req, res) => {
  try {
    const { OrderHeaderId, amount, paymentMethod, paymentStatus, paymentDate } =
      req.body;

    if (!OrderHeaderId || amount === undefined) {
      return res.status(400).json({
        success: false,
        message: 'OrderHeaderId and amount are required',
      });
    }
    if (!mongoose.Types.ObjectId.isValid(OrderHeaderId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OrderHeaderId',
      });
    }

    if (typeof amount !== 'number' || amount < 1) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a number and at least 1',
      });
    }
    const order = await OrderHeader.findById(OrderHeaderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    const existingPayment = await Payment.findOne({ OrderHeaderId });
    if (existingPayment) {
      return res.status(409).json({
        success: false,
        message: 'Payment already exists for this order',
      });
    }

    const payment = await Payment.create({
      OrderHeaderId: order._id,
      amount,
      paymentMethod, 
      paymentStatus,
      paymentDate, 
    });

    return res.status(201).json({
      success: true,
      message: 'Payment created successfully',
      data: payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
