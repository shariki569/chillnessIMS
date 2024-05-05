import express from "express";
import { createOrder, getOrders, getReceipt } from "../controller/order/order.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/receipt/:receiptNumber", getReceipt);

router.get("/", (req, res) => {
     res.send("hello")
})
export default router