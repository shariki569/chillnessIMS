import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../assets/colorPallette";
import { useNavigation } from "@react-navigation/core";
import PrimaryButton from "../components/PrimaryButton";
import axios from "axios";
import { Button, Input } from "@ui-kitten/components";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    quantity: 0,
    price: 0,
    description: "",
    image: "",
  });
  const navigate = useNavigation();

  const handleChange = (name, value) => {
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${process.env.EXPO_PUBLIC_API_URL}products`, product);
      Alert.alert("Success", "Product added successfully");
      setProduct({
        name: "",
        quantity: 0,
        price: 0,
        description: "",
        image: "",
      });
    } catch (err) {
      console.log(err);
      Alert.alert("Error", err.response.data.message);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="bg-primary p-3 flex-row items-center justify-center">
          <Pressable className="mr-auto" onPress={() => navigate.goBack()}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={colors.primaryContent}
            />
          </Pressable>
          <Text className="text-primary-content text-lg mr-auto">
            Add New Item
          </Text>
        </View>
        <View className="flex-1 m-7 p-5 items-center justify-center rounded-2xl bg-primary-light">
          <View className="w-full">
            <Text className="text-primary-content text-[16px] pb-2 mr-auto">
              Product Name
            </Text>
            <Input
              style={styles.input}
              value={product.name}
              onChangeText={(text) => handleChange("name", text)}
            />

            {/* <TextInput
              className="bg-white py-2 px-6 rounded-xl w-full"
              value={product.name}
              onChangeText={(text) => handleChange("name", text)}
            /> */}
          </View>

          <View className="w-full flex-row mt-2" style={{ gap: 10 }}>
            <View style={{ width: "48%" }}>
              <Text className="text-primary-content text-[16px] pb-2 mr-auto">
                Quantity
              </Text>
              <Input
                style={styles.input}
                value={product.quantity.toString()}
                onChangeText={(text) => handleChange("quantity", text)}
              />
            </View>
            <View style={{ width: "48%" }}>
              <Text className="text-primary-content text-[16px] pb-2 mr-auto">
                Price
              </Text>
              <Input
                style={styles.input}
                value={product.price.toString()}
                onChangeText={(text) => handleChange("price", text)}
              />
            </View>
          </View>

          <View className="w-full mt-2">
            <Text className="text-primary-content text-[16px] pb-2 mr-auto">
              Description
            </Text>
            <Input
              textAlignVertical="top"
              style={styles.input}
              multiline={true}
              textStyle={{ minHeight: 100 }}
              value={product.description}
              onChangeText={(text) => handleChange("description", text)}
            />
            {/* <TextInput
              className="bg-white py-2 px-6 rounded-xl w-full"
              multiline={true}
              numberOfLines={10}
              value={product.description}
              onChangeText={(text) => handleChange("description", text)}
            /> */}
          </View>
        </View>
        <View className="mt-2 mx-7 ">
          <Button style={{ borderRadius: 20 }} onPress={handleSubmit} size="large">
            Add Item
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  iconPosition: {
    marginRight: "auto",
  },
  input: {padding: 2, borderRadius: 10},
});
