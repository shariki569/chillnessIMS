import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../assets/colorPallette";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import ItemList from "../components/ItemList";

const Homescreen = () => {
  const list = [
    {
      name: "Milk Tea",
    },
    {
      name: "Iced Coffee",
    },
    {
      name: "Fruity Drinks",
    },
    {
      name: "Fresh Milk Drinks",
    },
  ];

  return (
    <SafeAreaView
      style={{ paddingTop: Platform.OS === "android" ? 40 : 0 }}
      className="flex-1 bg-background"
    >
      <ScrollView>
        <View className="bg-primary p-3 flex flex-row items-center flex-1">
          <Pressable
            className="flex-1 flex-row items-center bg-background p-1 rounded-md mx-2 h-12 px-3"
            style={{
              gap: 10,
            }}
          >
            <MaterialIcons
              style={{ paddingLeft: 4 }}
              name="search"
              size={28}
              color={colors.copyLight}
            />
            <TextInput placeholder="Search" className="font-sm" />
          </Pressable>
          <Pressable
            className="p-1 rounded-md"
            android_ripple={{ color: colors.primaryLight, borderless: true }}
          >
            <Feather name="plus" size={24} color="black" />
          </Pressable>
        </View>
        <View className="flex-row items-center gap-1 py-2 px-4 bg-primary-light ">
          <Ionicons name="location-outline" size={20} color="black" />
          <Pressable>
            <Text className="text-xs bold font-bold">
              Deliver to Cutie - Sambag 2 Cebu City
            </Text>
          </Pressable>
          <MaterialIcons name="keyboard-arrow-down" size={20} color="black" />
        </View>
        <View className="flex-row items-center px-3 py-2 bg-white">
          <AntDesign name="filter" size={24} color="black" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <Pressable
                key={index}
                className="m-0.5 justify-center items-center flex-1 rounded-sm px-2"
                android_ripple={{ color: colors.primaryLight, radius: 100 }}
              >
                <Text className="text-center text-sm font-bold my-1 px-1">
                  {item?.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View>
          <Text className="text-center text-xl font-bold mt-2">Milk Tea</Text>
        </View>
        <ItemList/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Homescreen;
