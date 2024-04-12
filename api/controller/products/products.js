import Product from "../../models/product.js";

export const addProducts = async (req, res) => {
  try {
    const { name, price, description, image, quantity, variants } = req.body;
    const newProduct = new Product({
      prodName: name,
      prodPrice: price,
      prodDescription: description,
      prodImage: image,
      prodQuantity: quantity,
      variants: variants,
    });
    await newProduct.save();

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    // const products = await Product.find({ isDeleted: false });
    const products = await Product.find({ isDeleted: false });
    if (!products) {
      return res.status(404).json({ message: "Products not found" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
