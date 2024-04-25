import express from "express";
import { addProducts, deleteProduct, getProducts, updateProduct } from "../controller/products/products.js";
import { searchProduct } from "../controller/products/searchProduct.js";

const router = express.Router();

router.post("/", addProducts);
router.get("/", getProducts);
router.get("/search", searchProduct);
router.put("/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
export default router