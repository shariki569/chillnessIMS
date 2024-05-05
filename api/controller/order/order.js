import Order from "../../models/order.js";
import { Product } from "../../models/product.js";

export const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      customer,
      totalAmount,
      amountReceived,
      paymentMethod,
      paymentStatus,
    } = req.body;

    // Basic validations
    if (!Array.isArray(orderItems)) {
      return res.status(400).json({ message: "orderItems must be an array" });
    }
    if (typeof totalAmount !== "number") {
      return res.status(400).json({ message: "totalAmount must be a number" });
    }
    if (typeof paymentMethod !== "string") {
      return res
        .status(400)
        .json({ message: "paymentMethod must be a string" });
    }
    if (amountReceived < totalAmount) {
      return res
        .status(400)
        .json({ message: "Amount received is less than total amount" });
    }

    // Populate order items with product details
    const populatedOrderItems = await Promise.all(
      orderItems.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error(`Product with ID ${item.product} not found`);
        }
        return {
          product: {
            _id: product._id,
            prodName: product.prodName,
            prodPrice: product.prodPrice,
          },
          quantity: item.quantity,
        };
      })
    );

    // Create new order
    const newOrder = new Order({
      orderItems: populatedOrderItems,
      customer,
      totalAmount,
      amountReceived,
      amountChange: amountReceived - totalAmount,
      paymentMethod,
      paymentStatus,
    });

    const receiptNumber = `${newOrder._id
      .toString()
      .substring(0, 8)}-${new Date().getFullYear().toString().slice(-2)}`;
    // Update newOrder with the generated receipt number
    newOrder.receiptNumber = receiptNumber;

    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder, receiptNumber: receiptNumber,  });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate({
      path: "orderItems.product",
      select: "prodName prodPrice quantity",
    });
    if (orders.length === 0) {
      return res.status(404).json({ message: "Orders not found" });
    }

    // Format orders with quantity included
    const ordersWithQuantity = orders.map((order) => {
      const orderItemsWithQuantity = order.orderItems.map((item) => ({
        product: item.product,
        quantity: item.quantity,
      }));
      return {
        ...order.toObject(),
        orderItems: orderItemsWithQuantity,
      };
    });

    res.status(200).json(ordersWithQuantity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReceipt = async (req, res) => {
    try {
      const order = await Order.findOne({ receiptNumber: req.params.receiptNumber }).populate({
        path: "orderItems.product",
        select: "prodName prodPrice quantity",
      });
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json({ receipt: order });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  