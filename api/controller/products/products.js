import { isValidObjectId } from "mongoose";
import { Product, Category } from "../../models/product.js";

export const addProducts = async (req, res) => {
  try {
    const {
      code,
      name,
      price,
      description,
      image,
      quantity,
      lowQuantity,
      unit,
      variants,
      category,
    } = req.body;

    if (code) {
      const existingProduct = await Product.findOne({ prodCode: code });
      if (existingProduct) {
        return res.status(400).json({
          title: "Duplicate Product Code",
          message: "Product with the same code already exists",
        });
      }
    }
    let foundCategory = await Category.findOne({ catName: category });

    if (!foundCategory) {
      const newCategory = new Category({
        catName: category,
      });
      await newCategory.save();
      foundCategory = newCategory;
    }
    const newProduct = new Product({
      prodCode: code,
      prodName: name,
      prodPrice: price,
      prodDescription: description,
      prodImage: image,
      prodUnit: unit,
      prodQuantity: quantity,
      prodLowQuantity: lowQuantity,
      prodCategory: foundCategory._id,
      variants: variants,
    });

    await newProduct.save();

    foundCategory.prodItems.push(newProduct._id);
    await foundCategory.save();

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false }).populate(
      "prodCategory",
      "catName"
    );

    if (products.length === 0) {
      return res.status(404).json({ message: "Products not found" });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const {
      code,
      name,
      price,
      description,
      image,
      quantity,
      lowQuantity,
      unit,
      variants,
      category,
      updatedOn,
    } = req.body;

    const { id } = req.params;
    if (!isValidObjectId(id))
      return res.status(401).json({ message: "Invalid product ID" });

    const item = await Product.findById({ _id: id });
    if (!item) return res.status(404).json({ message: "Product not found" });

    const product = await Product.findOne({ _id: id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // //Find the old category
    // await Category.findOneAndUpdate(
    //   { _id: product.prodCategory },
    //   { $pull: { prodItems: product._id } },
    //   { new: true }
    // );
    // // Add the product to the new category's prodItems array
    // await Category.findOneAndUpdate(
    //   { _id: foundCategory._id },
    //   { $addToSet: { prodItems: product._id } },
    //   { new: true }
    // );

    let updatedCategory;
    if (category) {
      updatedCategory = await Category.findOneAndUpdate(
        { catName: category },
        { catName: category },
        { upsert: true, new: true }
      );

      // Remove the product from the old category's prodItems array
      await Category.findOneAndUpdate(
        { _id: product.prodCategory },
        { $pull: { prodItems: product._id } }
      );

      // Add the product to the new category's prodItems array
      await Category.findOneAndUpdate(
        { _id: updatedCategory._id },
        { $addToSet: { prodItems: product._id } }
      );
    } else {
      // If no new category is provided, maintain the existing category
      updatedCategory = await Category.findById(product.prodCategory);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        prodCode: code,
        prodName: name,
        prodPrice: price,
        prodDescription: description,
        prodImage: image,
        prodUnit: unit,
        prodQuantity: quantity,
        prodLowQuantity: lowQuantity,
        prodCategory: updatedCategory._id,
        variants: variants,
        updatedOn: updatedOn,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.isDeleted = true;
    product.deletedAt = new Date();
    await product.save();
    res
      .status(200)
      .json({ message: `${product.prodName} has been deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
