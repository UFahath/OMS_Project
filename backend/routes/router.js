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
import {createOrder  } from "../controller/orderController.js";

import verifyToken from "../middleware/token.js"
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
router.get('/allProducts', getAllProducts)
 router.post('/placeorders',verifyToken,createOrder)
export default router;
 
 
 
 
 
 
 