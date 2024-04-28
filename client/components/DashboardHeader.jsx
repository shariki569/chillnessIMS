import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../assets/colorPallette";
import { LinearGradient } from "expo-linear-gradient";

const DashboardHeader = () => {
  return (
    <View>
      <LinearGradient
        colors={[colors.primaryLight, colors.primary, colors.primaryDark]}
        style={{ padding: 15 }}
        className="rounded-md"
        start={{ x: 0.1, y: 0.2 }}
        end={{ x: 1.5, y: 4 }}
      >
        <Text className="text-background text-xl"> Hi ADmin</Text>

        <View>
          <Text className="text-background text-l">Welcome Back</Text>
        </View>

        <View className="flex flex-row items-center justify-between mt-5">
          <View className="flex flex-col items-center justify-center">
            <Text className="text-l text-background ">Total Sales</Text>
            <Text className="text-2xl text-background font-bold">$12,345</Text>
          </View>
          <View className="flex flex-col items-center justify-center">
            <Text className="text-l text-background">Orders</Text>
            <Text className="text-2xl text-background font-bold">123</Text>
          </View>
          <View className="flex flex-col items-center justify-center">
            <Text className="text-l text-background">Customers</Text>
            <Text className="text-2xl text-background font-bold">123</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default DashboardHeader;

const styles = StyleSheet.create({});
