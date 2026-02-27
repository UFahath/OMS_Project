import mongoose from 'mongoose';
import { createOrder } from './orderController.js';
import { createShipment } from './shipmentController.js';
import { createPayment } from './paymentController.js';

async function orderPlacerController(req, res) {
  const { orderItem, totalAmount, shipmentAddress, paymentMode } = req.body;
  const { id } = req.user;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    if (!orderItem || totalAmount === undefined || !shipmentAddress || !paymentMode) {
      await session.abortTransaction();
      return res.status(400).json({ msg: "Every Fields Required" });
    }
    
    // console.log("first")
    const orderId = await createOrder(id, orderItem, totalAmount, session);
    // console.log("second")
    const isShipmentDone = await createShipment(orderId, shipmentAddress, session);
    // console.log("third")
    if (paymentMode === "COD") {
      await session.commitTransaction();
      return res.status(201).json({ msg: "Success" });
    }
    // console.log("fourth")
    const isPaymentSuccess = await createPayment(orderId, totalAmount, session);
    //  console.log("fifth")
    if (!isPaymentSuccess) {
      await session.abortTransaction();
      return res.status(402).json({ msg: "Payment Failed" });
    }

   
    await session.commitTransaction();
    console.log("sixth")
    return res.status(201).json({ msg: "Success" });

  } catch (err) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    return res.status(500).json({ msg: err.message });
  } finally {
    await session.endSession();
  }
}

export {orderPlacerController}