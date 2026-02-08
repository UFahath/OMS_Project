import express from "express";

import { signup, login } from "../controller/loginController.js";
import {
  createProductCategory,
  getProductCategory,
} from "../controller/productCategoryController.js";
import { createProducts } from "../controller/productController.js";
import { createSupportTicket } from "../controller/supportTicketController.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login); // http://localhost:5000/api/login
router.post("/productCategory", createProductCategory);
router.get("/productCategory", getProductCategory);
router.post("/addProduct", createProducts);
router.post("/supportTicket",createSupportTicket); // supportTicket 
export default router;






