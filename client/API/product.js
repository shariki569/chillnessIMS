import { Alert } from "react-native";
import client from "./client";

export const getProducts = async () => {
  try {
    const response = await client.get("/products");
    const products = response.data; // Extract the product list from the response
    return { products }; // Return the product list
  } catch (error) {
    // Handle errors
    console.error("Error fetching products:", error);
    return { error: error.message || "Failed to fetch products" };
  }
};

export const searchProduct = async (search) => {
  try {
    const response = await client.get(`/products/search?item=${search}`);
    const products = response.data; // Extract the product list from the response
    return { products }; // Return the product list
  } catch (error) {
    // Handle errors
    console.error("Error fetching products:", error);
    return { error: error.message || "Failed to fetch products" };
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await client.delete(`/products/delete/${id}`);
    const products = response.data; // Extract the product list from the response
    Alert.alert('Success', response.data.message);
    return { products }; // Return the product list
  } catch (error) {
    // Handle errors
    console.error("Error fetching products:", error);
    return { error: error.message || "Failed to fetch products" };
  }
};
