import {Shipment} from "../model/shipment.js"

const createShipment = async(req,res)=>{
  try{
   const {orderId:OrderHeaderId,shippingAddress,shipmentDate} = req.body;
   if(!OrderHeaderId || !shippingAddress||!shipmentDate){
    return res.status(400).json({msg:"All the Fields Are Required"})
   }
   await Shipment.create({
    OrderHeaderId,
    shippingAddress,
    shipmentStatus:"Shipped",
    shipmentDate
   });
   return res.status(201).json({msg:"Shipment Details Successfully Created"});
  }catch(err){
    return res.status(500).json({msg:"Internal Server Error"});
  }
}
export {createShipment}