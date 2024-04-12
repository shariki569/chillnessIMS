import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Divider, List, ListItem } from "@ui-kitten/components";

const VerticalList = () => {
  const [fetchata, setFetchData] = useState([]);
  const data = [
    {
      id: 1,
      name: "Product",
      price: 100,
      description: "Product 1 description",
      image: (
        <Image
          source={require("../assets/image-placeholder.png")}
          // className=""
          style={{ height: "100%" }}
          resizeMode="contain"
        />
      ),
    },
    {
      id: 2,
      name: "Product",
      price: 100,
      description: "Product 5 description",
    },
    {
      id: 3,
      name: "Product",
      price: 100,
      description: "Product 5 description",
    },
    {
      id: 4,
      name: "Product",
      price: 100,
      description: "Product 5 description",
    },
    {
      id: 5,
      name: "Product",
      price: 100,
      description: "Product 5 description",
    },
    {
      id: 6,
      name: "Product",
      price: 100,
      description: "Product 5 description",
    },
    {
      id: 7,
      name: "Product",
      price: 100,
      description: "Product 5 description",
    },
    {
      id: 8,
      name: "Product",
      price: 100,
      description: "Product 5 description",
    },
    {
      id: 9,
      name: "Product",
      price: 100,
      description: "Product 5 description",
    },
    {
      id: 10,
      name: "Product",
      price: 100,
      description: "Product 5 description",
    },
    {
      id: 11,
      name: "Product",
      price: 100,
      description: "Product 5 description",
    },
    {
      id: 12,
      name: "Product",
      price: 100,
      description: "Product 5 description",
    },
    {
      id: 13,
      name: "Product",
      price: 100,
      description: "Product 65 description",
    },
    {
      id: 14,
      name: "Product",
      price: 100,
      description: "Product 5 description",
    },
    {
      id: 15,
      name: "Product",
      price: 100,
      description: "Product 2 description",
    },
    {
      id: 16,
      name: "Product",
      price: 100,
      description: "Product 2 description",
    },
    {
      id: 17,
      name: "Product",
      price: 100,
      description: "Product 2 description",
    },
  ];

  // const renderItem = ({ item, index }) => (

  // );

  return (
    <View>
      <View>
        <View>
          <Text>ID</Text>
          <Text>Name</Text>
          <Text>Cost per Item</Text>
          <Text>Stock</Text>
          <Text>Manage Stocks</Text>
          <Text>Add Stocks</Text>
        </View>
      </View>
    </View>
  );
};

export default VerticalList;

const styles = StyleSheet.create({});
