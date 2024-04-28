import { Product } from "../../models/product.js";


export const searchProduct = async (req, res) => {
  try {
    const { item } = req.query;
   

    if (!item.trim()) return res.status(400).json({ message: "Invalid search query" });

    const products = await Product.find({
      $or: [
        { prodCode: { $regex: item, $options: "i" } },
        { prodName: { $regex: item, $options: "i" } }
      ],
      isDeleted: false
    }).populate("prodCategory", "catName");

    if (products.length === 0) {
      return res.status(404).json({ message: "Products not found" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error in searchProduct:", error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
};