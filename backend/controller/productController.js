
import mongoose from "mongoose";
import { Warehouse } from "../model/warehouse.js";
import { Product } from "../model/product.js";
import { Inventory } from "../model/inventory.js";
import { Supplier } from "../model/supplierProduct.js";

async function getAllProducts(req, res) {
  try {
    const products = await Product.find({}).populate('productCategory');
    res.status(200).json(products.filter(e => e.status === "ACTIVE"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createProducts = async (req, res) => {
  const session = await mongoose.startSession();
    session.startTransaction();

  try {
    const {
      productName,
      productCategory,
      productPrice,
      leadTime,
      stockQuantity,
      productDescription,
      warehouseName,
      warehouseCity,
      warehouseState,
      warehouseCountry,
      warehousePincode,
      warehouseAdd,
    } = req.body;

    const {id:supplierId} = req.user;
    console.log(`supplier id: ${supplierId}`);
    
    if (
      !productName ||
      !productCategory ||
      productPrice === undefined ||
      !leadTime ||
      stockQuantity === undefined ||
      !productDescription ||
      !warehouseName ||
      !warehouseCity ||
      !warehouseState ||
      !warehouseCountry ||
      !warehousePincode ||
      !warehouseAdd ||
      !supplierId
    ) {
      return res.status(400).json({ msg: "All Fields Are Required" });
    }

    const productExist = await Product.findOne({ productName }).session(
      session
    );
    if (productExist) {
      let productId = productExist._id;
      let inventory = await Inventory.findOne({ product: productId }).session(
        session
      );
      if (!inventory) {
        await session.abortTransaction();
        session.endSession();
        return res
          .status(404)
          .json({ msg: "Inventory not found for this Product" });
      }
      inventory.stockQuantity += Number(stockQuantity);
      await inventory.save({ session });
      await session.commitTransaction();
      session.endSession();
      return res.status(200).json({ msg: `Existing Inventory Updated` });
    } else {
  
      const warehouse = await Warehouse.create(
        [
          {
            warehouse_name: warehouseName,
            city: warehouseCity,
            state: warehouseState,
            country: warehouseCountry,
            pincode: warehousePincode,
            address: warehouseAdd,
          },
        ],
        { session }
      );

      const product = await Product.create(
        [
          {
            productName: productName,
            productCategory: productCategory,
            price: productPrice,
            description: productDescription,
            status: "ACTIVE",
          },
        ],
        { session }
      );
      await Inventory.create(
        [
          {
            product: product[0]._id,
            warehouse: warehouse[0]._id,
            stockQuantity,
          },
        ],
        { session }
      );

  
      await Supplier.create(
        [
          {
            supplierId: supplierId,
            leadTimeDays: leadTime,
            Product: product[0]._id,
          },
        ],
        { session }
      );

      await session.commitTransaction();
      session.endSession();
      return res.status(201).json({
        msg: "Product created successfully",
        productId: product[0]._id,
        warehouseId: warehouse[0]._id,
      });
    }
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export { getAllProducts, createProducts };
















