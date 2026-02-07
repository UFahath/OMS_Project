import express from 'express'
import { signup } from '../controller/loginController.js';
import { createProductCategory,getProductCategory } from '../controller/productCategoryController.js';
const router = express.Router();

router.post('/signup', signup );
router.post('/productCategory',createProductCategory);
router.get('/productCategory',getProductCategory);

export default router