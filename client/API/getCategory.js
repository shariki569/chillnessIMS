import axios from "axios";
import { useCallback } from "react";
import client from "./client";
import { Alert } from "react-native";

export const getCategories = async () => {
  // const fetchCategories = useCallback(async () => {
  //   try {
  //     const { data: categories } = await axios.get(
  //       `${process.env.EXPO_PUBLIC_API_URL}categories`
  //     );
  //     return categories;
  //   } catch (error) {
  //     return [];
  //   }
  // }, []);
  try {
    const res = await client.get("/categories");
    const categories = res.data;
    return { categories };
  } catch (error) {
    Alert.alert("Error", error.response.data.message);
    return { categories: [] };
  }

 
};
