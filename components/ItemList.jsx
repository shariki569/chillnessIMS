import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import product1 from "../assets/Products/1.png";
import product2 from "../assets/Products/2.png";
import product3 from "../assets/Products/3.png";

const ItemList = () => {
  const productList = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
      description: "Product 1 description",
      image: product1,
    },
    {
      id: 2,
      name: "Product 3",
      price: 100,
      description: "Product 1 description",
      image: product2,
    },
    {
      id: 3,
      name: "Product 3",
      price: 100,
      description: "Product 1 description",
      image: product3,
    },
    {
      id: 4,
      name: "Product 3",
      price: 100,
      description: "Product 1 description",
      image: product2,
    },
    {
      id: 5,
      name: "Product 3",
      price: 100,
      description: "Product 1 description",
      image: product2,
    },
  ];

  return (
    <View className="flex-1 flex-row flex-wrap m-1 ">
      {productList.map((product) => (
        <Pressable key={product.id} className="m-1 bg-white py-3 px-5 rounded-md">
          <View>
            <Image source={product.image} className="w-20 h-20" />
          </View>
          <Text className="text-center pt-3">{product.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default ItemList;

const styles = StyleSheet.create({});
