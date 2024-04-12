import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../assets/colorPallette";
import { useNavigation } from "@react-navigation/native";
import VerticalList from "../components/VerticalList";

const Inventory = () => {
  const navigate = useNavigation();
  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 0 : 10 }}>
      <View className="bg-primary p-3 flex-row items-center justify-center">
        <Pressable className="mr-auto" onPress={() => navigate.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={colors.primaryContent}
          />
        </Pressable>
        <Text className="text-primary-content text-lg mr-auto text-bold">
          Inventory
        </Text>
      </View>

      <View className="bg-primary-light p-3 flex-row items-center justify-between">
        <TextInput
          placeholder="Search"
          className="bg-background border border-primary mr-5 px-2 py-1 my-2 w-[85%] rounded-3xl"
        />
        <TouchableOpacity className="mr-auto">
          <MaterialCommunityIcons name="barcode-scan" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <VerticalList/>
    </SafeAreaView>
  );
};

export default Inventory;

const styles = StyleSheet.create({});
