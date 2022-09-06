import express from "express";
import multer from "multer";
import { verifyToken } from "../middleware/VerifyToken.js";
import { getUser, Login, Logout, Register } from "../controllers/Users.js";
import { addCategory, deleteCategory, getCategory, getCategoryForForm, updateCategory, getCategoryById } from "../controllers/Category.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { uploadProduct, addProduct, getProduct, updateProduct, deleteProduct, getProductById, getProductByBarcode } from "../controllers/Product.js";
import { uploadCategory } from "../controllers/Category.js";
import { createSession, endSession, pauseSession } from "../controllers/Pos.js";
import { getAllTransaction, insertTractaction } from "../controllers/Transactions.js";


const router = express.Router();

router.get('/users', verifyToken, getUser);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);


router.post('/category', verifyToken, uploadCategory, addCategory);
router.get('/category', verifyToken, getCategory);
router.get('/category/:id', verifyToken, getCategoryById);
router.get('/category-all', verifyToken, getCategoryForForm);
router.put('/category/:id', verifyToken, uploadCategory, updateCategory);
router.delete('/category/:id', deleteCategory);


router.post('/product', uploadProduct, addProduct);
router.get('/product', getProduct);
router.get('/product/:id', getProductById);
router.put('/product/:id', verifyToken, uploadProduct, updateProduct);
router.delete('/product/:id', verifyToken, deleteProduct);
router.get('/product-barcode/:barcode', getProductByBarcode);


router.post('/pos-session', createSession);
router.put('/pos-session/pause', pauseSession);
router.put('/pos-session/stop', endSession);


router.post('/transaction', insertTractaction);
router.get('/transaction', getAllTransaction);

export default router;