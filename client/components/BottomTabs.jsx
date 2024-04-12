import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../assets/colorPallette";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Homescreen from "../screens/Homescreen";
import { MaterialIcons } from "@expo/vector-icons";
import Inventory from "../screens/Inventory";
import AddProduct from "../screens/AddProduct";

const BottomTabs = () => {
  const Tab = createBottomTabNavigator();

  const tabItems = [
    {
      name: "Home",
      component: Homescreen,
      icon: (
        <View style={styles.tabContainer}>
          <MaterialCommunityIcons
            name="home-variant-outline"
            size={24}
            color={colors.copyLight}
          />
          <Text className="text-copy-light">Home</Text>
        </View>
      ),
      iconActive: (
        <View style={styles.activeTabContainer}>
          <MaterialCommunityIcons
            name="home-variant"
            size={24}
            color={colors.primaryContent}
          />
          <Text className="text-primary-content">Home</Text>
        </View>
      ),
    },
    {
      name: "Inventory",
      component: Inventory,
      icon: (
        <View style={styles.tabContainer}>
          <MaterialIcons name="inventory" size={24} color={colors.copyLight} />
          <Text className="text-copy-light">Inventory</Text>
        </View>
      ),

      iconActive: (
        <View style={styles.activeTabContainer}>
          <MaterialIcons name="inventory" size={24} color={colors.primaryContent} />
          <Text className="text-primary-content">Inventory</Text>
        </View>
      ),
    },
    {
      name: "Add Product",
      component: AddProduct,
      icon: (
        <View className="bg-primary p-1 px-5 flex-1 justify-center items-center rounded-xl">
          <MaterialIcons name="add-circle" size={30} color="black" />
        </View>
      ),
      iconActive: (
        <View className="bg-primary-light p-1 px-5 flex-1 justify-center items-center rounded-xl">
          <MaterialIcons name="add-circle" size={30} color={colors.copy} />
        </View>
      ),
    },
    {
      name: "Products",
      component: Inventory,
      icon: (
        <View style={styles.tabContainer}>
          <MaterialIcons name="assignment-turned-in" size={24} color={colors.copyLight} />
          <Text className="text-copy-light">Products</Text>
        </View>
      ),
      iconActive: (
        <View style={styles.activeTabContainer}>
          <MaterialIcons
            name="assignment-turned-in"
            size={24}
            color={colors.copy}
          />
          <Text className="text-copy">Products</Text>
        </View>
      ),
    },

    {
      name: "Cart",
      component: Homescreen,
      icon: (
        <View style={styles.tabContainer}>
          <MaterialCommunityIcons
            name="cart-outline"
            size={24}
            color={colors.copyLight}
          />
          <Text className="text-copy-light">Cart</Text>
        </View>
      ),
      iconActive: (
        <View style={styles.activeTabContainer}>
          <MaterialCommunityIcons name="cart" size={24} color={colors.copy} />
          <Text className="text-copy">Cart</Text>
        </View>
      ),
    },
    ,
  ];

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      {tabItems.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.name}
          component={item.component}
          options={{
            headerShown: false,

            tabBarIcon: ({ focused }) =>
              focused ? item.iconActive : item.icon,

            tabBarStyle: { height: 55 },
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
  tabContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  activeTabContainer: {
    backgroundColor: `${colors.primaryLight}`,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // paddingVertical: 5,
    // paddingHorizontal: 15,
    minWidth: 65,
    height: 50,
    borderRadius: 10,
  },
});
