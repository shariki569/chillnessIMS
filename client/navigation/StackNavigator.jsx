import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTabs from "../components/BottomTabs";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import AddProductScreen from "../screens/AddProduct";
import Inventory from "../screens/Inventory";
// import EditProductScreen from "../screens/EditScreen";
import EditScreen from "../screens/EditScreen";
import PreviewOrderScreen from "../screens/PreviewOrderScreen";
import PaymentOption from "../screens/PaymentOption";
// import PaymentBill from "../screens/PaymentConfirmatiom";
import PaymentConfirmation from "../screens/PaymentConfirmation";
import ViewReceiptScreen from "../screens/ViewReceiptScreen";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewReceipt"
          component={ViewReceiptScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="PaymentOptions"
          component={PaymentOption}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentConfirmation"
          component={PaymentConfirmation}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="PreviewOrder"
          component={PreviewOrderScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Inventory"
          component={Inventory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProductScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProduct"
          component={EditScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
