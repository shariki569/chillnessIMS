import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../assets/colorPallette";
import { LinearGradient } from "expo-linear-gradient";
import DashboardHeader from "../components/DashboardHeader";
import DashboardBody from "../components/DashboardBody";

const Home = () => {
  return (
    <SafeAreaView>
      <View className="bg-background py-3 px-4 flex flex-row items-center  justify-between">
        <Image
          style={{ width: 70, height: 70 }}
          source={require("../assets/ChillnessLogo-2.png")}
        />
        <Text className="text-copy text-xl font-bold">Dashboard</Text>

        <LinearGradient
          colors={[colors.primaryLight, colors.primary, colors.primaryDark]}
          start={{ x: 0.1, y: 0.2 }}
          end={{ x: 0.1, y: 1.5 }}
          className="bg-primary px-4 py-3 rounded-full"
        >
          <FontAwesome name="user" size={24} color={colors.background} />
        </LinearGradient>
      </View>
      <View className="px-4 py-1">
        <DashboardHeader />
        <DashboardBody />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
