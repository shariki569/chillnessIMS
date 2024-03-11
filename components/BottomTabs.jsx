import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homescreen from "../screens/Homescreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const BottomTabs = () => {
  const Tab = createBottomTabNavigator();

  const tabItems = [
    {
      name: "Home",
      component: Homescreen,
      icon: (
        <MaterialCommunityIcons
          name="home-variant-outline"
          size={24}
          color="black"
        />
      ),
      iconActive: (
        <MaterialCommunityIcons name="home-variant" size={24} color="#6dc845" />
      ),
    },
    {
      name: "Profile",
      component: Homescreen,
      icon: (
        <MaterialCommunityIcons
          name="account-outline"
          size={24}
          color="black"
        />
      ),
      iconActive: (
        <MaterialCommunityIcons name="account" size={24} color="#6dc845" />
      ),
    },

    {
      name: "Cart",
      component: Homescreen,
      icon: (
        <MaterialCommunityIcons name="cart-outline" size={24} color="#252923" />
      ),
      iconActive: (
        <MaterialCommunityIcons name="cart" size={24} color="#6dc845" />
      ),
    },
    ,
  ];

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      {tabItems.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.name}
          component={item.component}
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? "#6dc845" : "#252923" }}>
                {item.name}
              </Text>
            ),

            tabBarIcon: ({ focused }) =>
              focused ? item.iconActive : item.icon,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  tabItem: {
    backgroundColor: "#6dc845",
    color: "1a320f",
    fontSize: 20,
  },
});
