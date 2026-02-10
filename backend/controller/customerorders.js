
import mongoose from "mongoose"
import { OrderHeader } from "../model/orderHeader.js"

 const customerOrders=async (req,res)=>{

    try{
       const customerId=req.user.id
       const orders=await OrderHeader.aggregate([
        // first am going to do taking all the orders placed by the customer
        // 1.match orders by customers
        {
            $match:{
                  customer:new mongoose.Types.ObjectId(customerId)
            }
        },

        // 2.joining the tables 
        {
            $lookup:{
                from:"orderdetails",
                localField:"_id",
                foreignField:"orderDetails",
                as: "orderItems"
            }
        } , //    3.unwind order items
    {
        $unwind:"$orderItems"
    },
    // 4 join product table 
    {
        $lookup:{
            from:"products",
            localField:"orderItems.productId",
              foreignField: "_id",
               as: "product"
            
        }
    },
    // 5.unwind product
    { $unwind: "$product" },
    {
        $project: {
          _id: 1,
          orderDate: 1,
          status: 1,

          quantity: "$orderItems.quantity",
          orderPrice: "$orderItems.price",

          product: {
            _id: "$product._id",
            name: "$product.productName",
            description: "$product.description",
            category: "$product.category",
            price: "$product.price",
            status: "$product.status"
          }
        }
      }
       ])
     console.log(JSON.stringify(orders, null, 2));
     return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch customer orders"
    });
  }
};
  
   

export default  customerOrders

