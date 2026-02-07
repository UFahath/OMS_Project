import mongoose from "mongoose";

const orderDetailSchema = new mongoose.Schema({
  orderDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OrderHeader",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required : true
  },
  quantity :{
    type : Number,
    required : true,
    min : 1, 
  },
  price : {
    type : Number,
    required : true,
    min : 1
  }
});


export const OrderDetails = mongoose.model("OrderDetails", orderDetailSchema);



