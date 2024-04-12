import { mongoose } from "mongoose";

const variantSchema = mongoose.Schema({
  size: String,
  price: Number,
  quantity: Number,
})

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
    default: 0,
  },
  variants: [variantSchema],
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
