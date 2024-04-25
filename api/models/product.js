import { mongoose } from "mongoose";

const variantSchema = mongoose.Schema({
  size: String,
  price: Number,
  quantity: Number,
});

const categorySchema = mongoose.Schema({
  catName: {
    type: String,
    unique: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  prodItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const productSchema = mongoose.Schema({
  prodImage: {
    type: String,
    default: "https://placehold.co/500",
  },
  prodCode: {
    type: String,
    unique: true,
    sparse: true,
  },
  prodName: {
    type: String,
    required: true,
  },
  prodQuantity: {
    type: Number,
    default: 0,
  },
  prodLowQuantity: {
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
  updatedOn: {
    type: Date,
    default: Date.now,
  },
  
  prodUnit: {
    type: String,
    required: true,
    default: "pcs",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
    default: null,
  },

  prodCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

export const Category = mongoose.model("Category", categorySchema);
export const Product = mongoose.model("Product", productSchema);
