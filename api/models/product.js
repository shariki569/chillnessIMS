import { mongoose } from "mongoose";

const productSchema = mongoose.Schema({
  prodId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 10,
    default: "PROD" + Math.floor(Math.random() * 100000),
  },
  prodImage: {
    type: String,
    default: "https://placehold.co/500",
  },
  prodName: {
    type: String,
    required: true,
  },
  prodQuantity: {
    type: Number,
  },
  prodPrice: {
    type: Number,
    required: true,
  },
  prodDescription: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
