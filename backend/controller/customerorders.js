
import mongoose from "mongoose"
import { OrderHeader } from "../model/orderHeader.js"

 const customerOrders=async (req,res)=>{

    try{
       const customerId=req.user.id
       const orders=await OrderHeader.aggregate([
        {
            $match:{
                  customer:new mongoose.Types.ObjectId(customerId)
            }
        },
        {
            $lookup:{
                from:"orderdetails",
                localField:"_id",
                foreignField:"orderDetails",
                as: "orderItems"
            }
        } , 
    {
        $unwind:"$orderItems"
    },
    
    {
        $lookup:{
            from:"products",
            localField:"orderItems.productId",
              foreignField: "_id",
               as: "product"
            
        }
    },

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
      data: orders.sort((a,b)=> new Date(b.orderDate) - new Date(a.orderDate) )
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






