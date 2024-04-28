import { Category, Product } from "../../models/product.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isDeleted: false }).populate({
      path: "prodItems",
      match: { isDeleted: false },
      select: "prodImage prodCode prodName prodPrice",
    });
    if (categories.length === 0) {
      return res.status(404).json({ message: "Categories not found" });
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {
      isDeleted: false,
    };

    if (category) {
      query.catName = { $regex: category, $options: "i" };
    }

    const categories = await Category.find(query).populate({
      path: "prodItems",
      match: { isDeleted: false },
      select: "prodImage prodCode prodName prodPrice",
    });

    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    category.isDeleted = true;
    await category.save();

    await Product.updateMany(
      { prodCategory: category._id },
      { $set: { prodCategory: [] } }
    );

    res
      .status(200)
      .json({ message: `Category ${category.catName} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
