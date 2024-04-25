import express from "express";

import { deleteCategory, getCategories } from "../controller/products/categories.js";
 


const router = express.Router();

router.get("/", getCategories);
router.delete("/:id", deleteCategory);

export default router;