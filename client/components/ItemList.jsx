import {
  Alert,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import product1 from "../assets/image-placeholder.png";
import product2 from "../assets/Products/2.png";
import product3 from "../assets/Products/3.png";
import axios from "axios";
import { deleteProduct, getProducts } from "../API/product";
import { Feather } from '@expo/vector-icons';
import { Button, Divider } from "@ui-kitten/components";
import { getCategories } from "../API/getCategory";
import { colors } from "../assets/colorPallette";

const ItemList = ({ onRefresh }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const { categories, error } = await getCategories();
      if (error) {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      } else {
        setCategoryList(categories);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      ToastAndroid.show("Failed to fetch products", ToastAndroid.SHORT);
    } finally {
      setRefreshing(false);
    }
  }, []);
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      handleRefresh();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View className="flex-1 flex-row flex-wrap m-1">
        {
          categoryList && categoryList.map((category) => (
            category.prodItems.length > 0 && (
              <View className="w-full px-2 py-1" key={category._id}>
                <View className="flex-row items-center mb-2">
                  <Text className="text-xl font-bold ">{category.catName}</Text>
                  <View className="flex-1 bg-border h-1 mx-2 mt-1"></View>
                </View>
                {category?.prodItems.map((product) =>
                  <View key={product._id} className="flex-row items-center bg-foreground rounded-2xl my-1 pr-2">
                    <View className="w-1/4  ">
                      <Image source={{ uri: product.prodImage || product1 }} className=" rounded-xl rounded-r-none w-full h-20 aspect-square mr-auto"></Image>
                    </View>
                    <View className="w-1/3">
                      <Text className="text-copy-light">{product.prodName}</Text>
                      <Text className="text-copy text-xl">₱{product.prodPrice}</Text>
                    </View>
                    <View className="w-1/4 ml-auto  flex-row justify-evenly">


                      <TouchableOpacity onPress={() => handleDelete(product._id)} className="bg-error rounded-full px-3 py-3 ">
                        <Feather name="trash-2" size={15} color={colors.errorContent} />
                      </TouchableOpacity>
                      <TouchableOpacity className="bg-secondary rounded-full px-3 py-3 ">
                        <Feather name="edit" size={15} color={colors.secondaryContent} />
                      </TouchableOpacity>
                    </View>
                  </View>)}
              </View>)
          ))


        }
        {/* {productList &&
          productList.map((product) => (
            <TouchableOpacity
              key={product._id}
              className="m-1 bg-white rounded-md flex-basis-[25%] w-[31%] max-h-25 overflow-hidden"
            >
              <View>
                {product.prodImage ? (
                  <Image
                    source={{
                      uri: product.prodImage,
                    }}
                    className="w-full max-h-25 aspect-square"
                    // resizeMode="cover" // Set resizeMode to "cover"
                    style={{ height: 120 }}
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={require("../assets/image-placeholder.png")}
                    // className=""
                    style={{ height: 120 }}
                    resizeMode="contain"
                  />
                )}
              </View>
              <View className=" border-t-2 border-primary w-full pb-2 px-3">
                <View className="  flex-row justify-between">
                  <Text className="pt-1 text-copy-light">
                    ₱{product.prodPrice}
                  </Text>
                  <Text className="pt-1 text-copy-light">
                    Qty: {product.prodQuantity}
                  </Text>
                </View>

                <Text className="text-copy font-bold text-[16px]">
                  {product.prodName}
                </Text>
              </View>
            </TouchableOpacity>
          ))} */}
      </View>
    </ScrollView>
  );
};

export default ItemList;

const styles = StyleSheet.create({});
