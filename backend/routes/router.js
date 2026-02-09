import express from "express";
 
import { signup, login } from "../controller/loginController.js";
import {
  createProductCategory,
  getProductCategory,
} from "../controller/productCategoryController.js";
import { createProducts, getAllProducts } from "../controller/productController.js";
import { createSupportTicket } from "../controller/supportTicketController.js";
import { createReview } from "../controller/reviewController.js";

import { getSupplierProduct } from "../controller/supplierProductController.js";

import { createReturn } from "../controller/returnController.js";
import verifyToken from "../middleware/token.js"

import { supplierOrders } from "../controller/supplierOrderController.js";

import { createPayment } from "../controller/paymentController.js";

import {createOrder  } from "../controller/orderController.js";
import { createShipment } from "../controller/shipmentController.js";

const router = express.Router();
 
router.post("/signup", signup);
router.post("/login", login); // http://localhost:5000/api/login
router.post("/productCategory", createProductCategory);
router.get("/productCategory", getProductCategory);
router.post("/addProduct",verifyToken, createProducts); // http://localhost:5000/api/addProduct
router.post("/supportTicket", verifyToken,createSupportTicket); // supportTicket 
router.post("review",createReview)  //http://localhost:5000/api/review
router.get("/supplierProduct",verifyToken,getSupplierProduct); //http://locahost:5000/api/supplierProduct
router.post("/return", createReturn) //http://localhost:5000/api/return
router.post('/payment',createPayment); //http://localhost:5000/api/payment
router.get('/allProducts', getAllProducts)
 router.post('/placeorders',verifyToken,createOrder)
 router.post('./deliveryAddress',createShipment); //http://localhost:5000/api/createShipment
router.get('/supplierOrders', verifyToken, supplierOrders)
export default router;
 
 
 
 
 
 
 