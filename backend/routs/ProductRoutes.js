import express from 'express';
import uploadStorage from '../multer.js';
import { addProduct, deleteProduct, editProduct, getAllProducts, getProductById } from '../controllers/ProductController.js';

const router = express.Router();

router.get("/getallproducts", getAllProducts);
router.get("/getproductbyid/:id", getProductById );
router.post("/addproduct",uploadStorage.single('att'), addProduct);
router.delete("/deleteproduct/:id", deleteProduct);
router.put("/editproduct/:id", editProduct);



export default router;