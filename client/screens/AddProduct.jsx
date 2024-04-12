import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { colors } from "../assets/colorPallette";
import { useNavigation } from "@react-navigation/core";
// import PrimaryButton from "../../components/PrimaryButton";
import axios from "axios";
import { Button, Input } from "@ui-kitten/components";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { imagePick, takePhoto } from "../utilities/imageUtils";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    quantity: 0,
    price: 0,
    description: "",
    image: "",
    uploading: false,
  });

  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigation();

  const handleChange = (name, value) => {
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async () => {
    const resp = await fetch(product.image);
    const blob = await resp.blob();
    const storageRef = ref(storage, `chillnessImg/` + Date.now() + ".jpg");

    try {
      const snapshot = await uploadBytes(storageRef, blob);
      console.log("Uploaded a blob or file");

      const downloadUrl = await getDownloadURL(storageRef);
      console.log(downloadUrl);

      setProduct({ ...product, image: downloadUrl });

      const productData = {
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        description: product.description,
        image: downloadUrl,
      };
      await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}products`,
        productData
      );
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
  //Pick image from gallery
  const pickImage = async () => {
    const imageUri = await imagePick();
    if (imageUri) {
      setProduct({ ...product, image: imageUri });
    }
  };

  const openCam = async () => {
    const result = await takePhoto();
    if (result) {
      setProduct({ ...product, image: result });
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
        <View className="flex-row my-2 mx-5">
          <View className="flex-1 mt-5 items-end justify-end ">
            {product.image ? (
              <Image
                style={{
                  height: 175,
                  borderWidth: 1,
                  width: 175,
                  borderRadius: 10,
                }}
                source={{ uri: product.image }}
              />
            ) : (
              <Image
                style={{
                  height: 175,
                  borderWidth: 1,
                  width: 175,
                  borderRadius: 10,
                }}
                source={require("../assets/image-placeholder.png")}
              />
            )}
          </View>
          <View className="flex-1 mt-5 items-center justify-center ">
            <Button
              style={styles.imageButton}
              onPress={openCam}
              accessoryLeft={() => (
                <Ionicons
                  name="camera"
                  size={25}
                  color={colors.primaryContent}
                  style={{ marginLeft: "auto" }}
                />
              )}
            >
              <Text className="mr-auto min-w-[50px]">Take a photo</Text>
            </Button>
            <Button
              style={styles.imageButton}
              onPress={pickImage}
              accessoryLeft={() => (
                <Ionicons
                  name="albums"
                  size={25}
                  color={colors.primaryContent}
                  style={{ marginLeft: "auto" }}
                />
              )}
            >
              <Text className="mr-auto min-w-[50px]">Gallery</Text>
            </Button>
          </View>
        </View>

        <View className="flex-1 mx-5 p-5 items-center justify-center rounded-2xl bg-primary-light">
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
          </View>
        </View>
        <View></View>
        <View className="mt-6 mx-7" style={{ gap: 10 }}>
          <Button
            style={{ borderRadius: 40 }}
            onPress={handleSubmit}
            size="large"
          >
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
  input: { padding: 2, borderRadius: 10 },
  imageButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    borderRadius: 40,
    marginTop: 10,
    minWidth: 100,
    maxWidth: 150,
    width: "100%",
  },
});
