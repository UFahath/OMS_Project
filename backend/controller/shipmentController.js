import {Shipment} from "../model/shipment.js"

const createShipment = async(orderId,shipmentAddress,session,res)=>{
  try{
  //  const {orderId:OrderHeaderId,shippingAddress} = req.body;
  //  if(!OrderHeaderId || !shippingAddress){
  //   return res.status(400).json({msg:"All the Fields Are Required"})
  //  }
  console.log(orderId,shipmentAddress,session)
   await Shipment.create([{
    orderId,
    shipmentAddress,
    shipmentStatus:"Shipped",
    shipmentDate : new Date()
   }],{session});
   return true;
  //  return res.status(201).json({msg:"Shipment Details Successfully Created"});
  }catch(err){
    return false;
  }
}
export {createShipment}