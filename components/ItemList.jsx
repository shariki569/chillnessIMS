import {
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

const ItemList = ({ onRefresh }) => {
  const [productList, setProductList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  // const productList = [
  //   {
  //     id: 1,
  //     name: "Product 1",
  //     price: 100,
  //     description: "Product 1 description",
  //     image: product1,
  //   },
  //   {
  //     id: 2,
  //     name: "Product 3",
  //     price: 100,
  //     description: "Product 1 description",
  //     image: product2,
  //   },
  //   {
  //     id: 3,
  //     name: "Product 3",
  //     price: 100,
  //     description: "Product 1 description",
  //     image: product3,
  //   },
  //   {
  //     id: 4,
  //     name: "Product 3",
  //     price: 100,
  //     description: "Product 1 description",
  //     image: product2,
  //   },
  //   {
  //     id: 5,
  //     name: "Product 3",
  //     price: 100,
  //     description: "Product 1 description",
  //     image: product2,
  //   },
  //   {
  //     id: 6,
  //     name: "Product 3",
  //     price: 100,
  //     description: "Product 1 description",
  //     image: product2,
  //   },
  // ];

  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}products`);
      const products = res.data;
      setProductList(products);
      console.log(products);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts();
  }, [fetchProducts]);
  return (
    <ScrollView
      
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View className="flex-1 flex-row flex-wrap m-1">
        {productList.map((product) => (
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
        ))}
      </View>
    </ScrollView>
  );
};

export default ItemList;

const styles = StyleSheet.create({});
