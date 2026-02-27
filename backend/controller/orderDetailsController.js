import { Inventory } from "../model/inventory.js";
import { OrderDetails } from "../model/orderDetails.js";
import mongoose from "mongoose";
import { OrderHeader } from "../model/orderHeader.js";

const markAsShipped = async (req, res) => {
    try {
        let id = req.params.id;
        const {quantity:qty_shipped } = req.body;

        if (!id || qty_shipped==null) {
            return res.status(400).json({ msg: "All Fields are required" });
        }

        if(typeof qty_shipped !== "number" || qty_shipped<=0) {
            return res.status(400).json({msg:"Invalid quantity"});
        }
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({msg:"Invalid Order Details Id"});
        }
        const orderDetailsId = new mongoose.Types.ObjectId(id);
        const details = await OrderDetails.findOne({_id:orderDetailsId});
        //    console.log(details.productId,"\n",details.orderDetails);
        if (!details) return res.status(404).json({ msg: "No Such Order Details Found" });
        details.quantity+=qty_shipped;
        await details.save();

        const inventoryProduct = await Inventory.findOne({productId:details.productId});
        if(!inventoryProduct) return res.status(404).json({msg:"No Such Inventory Found"})
        inventoryProduct.stockQuantity-=qty_shipped;
        await inventoryProduct.save();

        const orderHeader = await OrderHeader.findById(details.orderDetails);
        if(!orderHeader) return res.status(404).json({msg:"No such order Header Found"});
        orderHeader.status="Shipped";
        await orderHeader.save();
        return res.status(200).json({msg:"SuccessFullyUPdated"});

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({msg:"Internal Server Error"})
    }
}

export { markAsShipped }