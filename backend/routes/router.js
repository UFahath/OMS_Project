import express from 'express'
import { login, signup } from '../controller/loginController.js';

const router = express.Router();

router.post('/signup', signup );    // http://localhost:5000/api/signup
router.post('/login', login);       // http://localhost:5000/api/login

export default router