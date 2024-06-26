import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import cors from "cors";
import jwt from "jsonwebtoken";
import registerUser from "./routes/register.js";
import loginUser from "./routes/login.js";
import products from "./routes/products.js";
import category from "./routes/category.js";
import orders from "./routes/order.js";

const port = process.env.PORT;
const IPaddress = process.env.IP_ADDRESS;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Server Actions
app.use("/api/register", registerUser);
app.use("/api/login", loginUser);
app.use("/api/products", products);
app.use("/api/categories", category);
app.use("/api/orders", orders);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.hrse5rt.mongodb.net/`
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/api", (req, res) => {
  res.send("API is running");
});

app.listen(`${port}`, `${IPaddress}`, () => {
  console.log(`Server is running on port ${port} and IP address ${IPaddress}`);
});
