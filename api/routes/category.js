import express from "express";

import { deleteCategory, getCategories, getCategory } from "../controller/products/categories.js";
 


const router = express.Router();

router.get("/", getCategories);
router.delete("/:id", deleteCategory);
router.get("/search", getCategory);

export default router;