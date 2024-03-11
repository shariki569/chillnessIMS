import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import cors from "cors";
import jwt from "jsonwebtoken";
import registerUser from './routes/register.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Server Actions
app.use('/api/register', registerUser);


mongoose
  .connect(
    "mongodb+srv://shashariki569:zafUvtQnlPQ65PqK@cluster0.hrse5rt.mongodb.net/", 
   
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });


app.get("/api", (req, res) => {
  res.send("API is running");
})

app.listen('8888', '192.168.0.103', () => {
  console.log(`Server is running on port http://192.168.0.103:8888`);
});


