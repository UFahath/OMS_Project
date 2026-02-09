import express from "express";

import { signup, login } from "../controller/loginController.js";
import {
  createProductCategory,
  getProductCategory,
} from "../controller/productCategoryController.js";
import { createProducts } from "../controller/productController.js";
import { createSupportTicket } from "../controller/supportTicketController.js";
import verifyToken from "../middleware/token.js";
const router = express.Router();

router.post("/signup", signup); // http://localhost:5000/api/signup
router.post("/login", login); // http://localhost:5000/api/login
router.post("/productCategory", createProductCategory); // http://localhost:5000/api/productCategory
router.get("/productCategory", getProductCategory); // http://localhost:5000/api/productCategory
router.post("/addProduct", createProducts);
router.post("/supportTicket", verifyToken,createSupportTicket); // http://localhost:5000/api/supportTicket 
export default router;






