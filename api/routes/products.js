import express from "express";
import { addProducts, getProducts } from "../controller/products/products.js";

const router = express.Router();

router.post("/", addProducts);
router.get("/", getProducts);
export default router