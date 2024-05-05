import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Divider, List, ListItem } from "@ui-kitten/components";
import axios from "axios";
import { deleteProduct } from "../API/product";
import { Ionicons } from '@expo/vector-icons';
import { colors } from "../assets/colorPallette";
import { Entypo } from '@expo/vector-icons';
const VerticalListInventory = ({ item, handleRefresh, refresh }) => {
  // const [refresh, setRefresh] = useState(false);
  const [menu, setMenu] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      handleRefresh();
      Alert.alert("Success", message.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  const handleMenu = (index) => {
    setMenu(!menu)
    setSelectedIndex(index)
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity >
        <View className="bg-foreground p-2 flex-row items-center ">
          <Text className="text-copy w-[80px] p-2 ">{item?.prodName}</Text>
          <Text className="text-copy w-[70px] p-2 ">{item?.prodPrice}</Text>
          <Text className="text-copy w-[70px] p-2 ">
            {item?.prodQuantity} {item?.prodUnit}
          </Text>
          <Text className="text-copy w-[90px] p-2 ">
            {item.prodCategory?.catName}
          </Text>
          {/* <Text className="text-copy w-[90px] p-2 ">{item.addStocks}</Text> */}
          <View className=" w-[70px] flex-row gap-1 items-center justify-center ">
            <TouchableOpacity onPress={() => handleMenu(item._id)}>
              <Entypo name="dots-three-vertical" size={20} color={colors.copyLight} />
            </TouchableOpacity>
            {menu && selectedIndex === item._id && (
              <View className="absolute top-3 right-10 bg-background  z-9999999">
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleDelete(item._id)}
                >
                  <Text>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleDelete(item._id)}
                >
                  <Text>Delete</Text>
                </TouchableOpacity>
                {/* Add more menu items here */}
              </View>
            )}
            {/* <TouchableOpacity
              className="bg-secondary p-2"
              onPress={() => {
                Alert.alert(
                  "Delete",
                  "Are you sure you want to delete this item?",
                  [
                    {
                      text: "Cancel",
                      // onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "Delete",
                      onPress: () => handleDelete(item._id),
                      style: "cancel",
                    }
                  ]
                )
              }} >

              <Ionicons name="trash-bin" size={20} color={colors.errorContent} />
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-error p-2 w-9 h-9"
              onPress={() => {
                Alert.alert(
                  "Delete",
                  "Are you sure you want to delete this item?",
                  [
                    {
                      text: "Cancel",
                      // onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "Delete",
                      onPress: () => handleDelete(item._id),
                      style: "cancel",
                    }
                  ]
                )
              }} >

              <Ionicons name="trash-bin" size={20} color={colors.errorContent} />
            </TouchableOpacity> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="bg-background px-2 py-3">
      <ScrollView horizontal>
        <View>
          <View
            className="bg-foreground p-2 flex-row items-center"
            style={{ justifyContent: "center" }}
          >
            <Text className=" text-primary-content w-[80px] py-2  px-1">
              Item Name
            </Text>
            <Text className="text-primary-content w-[70px] py-2 px-1">
              Cost per Item
            </Text>
            <Text className="text-primary-content w-[70px] py-2  px-1">
              Stocks
            </Text>
            <Text className="text-primary-content w-[90px] py-2 px-1">
              Category
            </Text>
            <Text className="text-primary-content w-[70px] py-2 px-1">

            </Text>
          </View>
          <Divider />
          <View className="bg-primary-light h-1"></View>
          <FlatList
            data={item}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default VerticalListInventory;

const renderMenu = () => {
  return (
    <View>
      <Text>Menu</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  style: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  }
  // listContainer: {
  //   flex: 1,
  // },
});
