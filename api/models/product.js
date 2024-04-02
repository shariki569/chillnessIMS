import { mongoose } from "mongoose";

const productSchema = mongoose.Schema({
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
