import axios from "axios";
import { useCallback } from "react";
import client from "./client";
import { Alert } from "react-native";

export const getCategories = async ({ search = "" }) => {
  try {
    const res = await client.get(
      search ? `/categories/search?category=${search}` : "/categories"
    );
    const categories = res.data;
    return { categories };
  } catch (error) {
    Alert.alert("Error", error.response.data.message);
    return { error: error.response.data.message };
  }
};
