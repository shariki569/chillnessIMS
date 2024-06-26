import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { colors } from "../assets/colorPallette";
import { useNavigation } from "@react-navigation/core";
// import PrimaryButton from "../../components/PrimaryButton";
import axios from "axios";
import {
  Button,
  Card,
  Divider,
  Input,
  Modal,
  ProgressBar,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { imagePick, takePhoto } from "../utilities/imageUtils";
import { Camera } from "expo-camera/next";
import { getCategories } from "../API/getCategory";
import QuantityWithUnit from "../components/QuantityWithUnit";
import ModalUnitPicker from "../components/ModalUnitPicker";
import CameraViewScanner from "../components/CameraViewScanner";
import Autocomplete from "../components/Autocomplete";
import client from "../API/client";

const AddProduct = ({ route }) => {
  const { productData } = route.params || {};

  const [product, setProduct] = useState({
    name: productData?.prodName || "",
    quantity: productData?.prodQuantity || 0,
    lowQuantity: productData?.prodLowQuantity || 0,
    unit: productData?.prodUnit || "",
    price: productData?.prodPrice || 0,
    description: productData?.prodDescription || "",
    image: productData?.prodImage || "",
    uploading: false,
    code: productData?.prodCode || "",
    categories: [],
    suggestions: [],
    category: productData?.category || "",
    selectedCategory: null,
  });

  const [showScanner, setShowScanner] = useState(false);

  const [scanned, setScanned] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const navigate = useNavigation();
  const [loading, setLoading] = useState(0);

  // Use the hook here

  useEffect(() => {
    const fetchCategoriesData = async (search) => {
      try {
        const { categories: categoriesData } = await getCategories({ search });
        console.log("Fetched categories:", categoriesData); // Check if data is fetched
        setProduct((prevProduct) => ({
          ...prevProduct,
          categories: categoriesData || [], // Use default empty array if data is undefined
        }));
        // console.log("Categories:", categoriesData);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchCategoriesData(); // Fetch categories on component mount
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // useEffect(() => {
  //   const getCameraPermissions = async () => {
  //     const { status } = await Camera.getCameraPermissionsAsync();
  //     setHasPermission(status === "granted");
  //   };
  //   getCameraPermissions();
  // }, []);


  const handleBarCodeScanned = ({ type, data }) => {
    try {
      setScanned(true);
      setProduct({ ...product, code: data });
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      setShowScanner(false);
    } catch (error) {
      console.log(error);
    } finally {
      setScanned(false);
    }
  };

  const handleChange = (field, value) => {
    setProduct((prevProduct) => ({ ...prevProduct, [field]: value }));
  };

  const handleSubmit = async () => {
    const resp = await fetch(product.image);
    const blob = await resp.blob();
    const storageRef = ref(storage, `chillnessImg/` + Date.now() + ".jpg");
    setLoading(true);
    try {
      const snapshot = await uploadBytes(storageRef, blob, {
        onUploadProgress: (progress) => {
          const onProgress =
            (progress.bytesTransferred / progress.totalBytes) * 100;
          setLoading(onProgress);
        },
      });
      const downloadUrl = await getDownloadURL(storageRef);
      setProduct({ ...product, image: downloadUrl });
      const data = {
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        lowQuantity: product.lowQuantity,
        description: product.description,
        unit: product.unit,
        image: productData ? product.image : downloadUrl,
        code: product.code,
        category: product.category,
      };
      productData ?
        await client.put(`/products/${productData._id}`, data)
        :
        await client.post(
          `/products`,
          data
        );
      Alert.alert("Success", productData ? "Product updated successfully" : "Product added successfully");
      setProduct({
        name: "",
        quantity: 0,
        lowQuantity: 0,
        price: 0,
        description: "",
        image: "",
        category: null,
        categories: product.categories,
        unit: "piece",
      });
      ToastAndroid.show("Product added successfully", ToastAndroid.SHORT);
    } catch (err) {
      console.log(err);
      Alert.alert(err.response.data.title, err.response.data.message);
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

  const handleUnitChange = (unit) => {
    setProduct({ ...product, unit: unit });
  };

  const updatedSuggestions = (text) => {


    const filteredSuggestions = product.categories?.filter((item) =>
      item.catName && item.catName.toLowerCase().includes(product.category.toLowerCase())
    );



    setProduct({
      ...product,
      suggestions: filteredSuggestions,
      category: text,
    });

  };

  const onSelect = (selectedItem) => {
    setProduct({
      ...product,
      selectedCategory: selectedItem,
      category: selectedItem.catName,
      suggestions: [],

    });

  }

  return (
    <>
      <SafeAreaView style={{ marginTop: Platform.OS === "android" ? 0 : 10, flex: 1 }}>
        <View className="bg-primary p-3 flex-row items-center justify-center">
          <Pressable className="mr-auto" onPress={() => navigate.goBack()}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={colors.primaryContent}
            />
          </Pressable>
          <Text className="text-primary-content text-lg mr-auto">
            {productData ? "Editing Item In the Add PRoduct Screen" : " Add New Item This is the Add Product Screen"}
          </Text>
        </View>
        <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={100}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >

            <View>
              <ProgressBar progress={loading / 100} color={colors.primary} />
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

            <View className="flex-1 mx-5 p-5 items-center justify-center rounded-2xl ">
              <View className="w-full">
                <Text className="text-primary-content text-[16px] pb-2 mr-auto">
                  Item Category
                </Text>

                <Input style={{ ...styles, position: "relative" }} onChangeText={(text) => updatedSuggestions(text)} value={product.category} />


                {product.suggestions?.length > 0 && product?.category !== "" &&
                  <ScrollView contentContainerStyle={styles.scrollView} className="absolute mt-[68px] z-10  w-full bg-primary rounded-t-sm rounded-b-lg">
                    {product.suggestions.map((suggestion) => (
                      <TouchableOpacity onPress={() => onSelect(suggestion)} key={suggestion._id} activeOpacity={0.5} className='w-full bg-foreground py-3 px-2'>
                        <Text>{suggestion.catName} </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                }
              </View>
              <View className="w-full">
                <Text className="text-primary-content text-[16px] pb-2 mr-auto">
                  Item Name
                </Text>
                <Input
                  style={styles.input}
                  value={product.name}
                  onChangeText={(text) => handleChange("name", text)}
                />
              </View>
              <View className="w-full mt-2">
                <Text className="text-primary-content text-[16px] pb-2 mr-auto">
                  Item Code
                  <Text className="text-copy-lighter text-sm m-3"> (Optional)</Text>
                </Text>

                <View className="flex-row w-full gap-1">
                  <Input
                    style={{ ...styles.input, width: "70%" }}
                    value={product.code}
                    onChangeText={(text) => handleChange("code", text)}
                    disabled={true}
                  />
                  <Button
                    accessoryLeft={() => (
                      <AntDesign
                        name="barcode"
                        size={24}
                        color={colors.primaryContent}
                      />
                    )}
                    onPress={() => setShowScanner(true)}
                    style={{ width: "30%", padding: 5 }}
                    size="small"
                  >
                    <Text className="mx-auto">Scan</Text>
                  </Button>
                </View>
              </View>
              <View className="w-full">
                <Text className="text-primary-content text-[16px] pb-2 mr-auto">
                  Price
                </Text>
                <Input
                  style={styles.input}
                  value={product.price.toString()}
                  onChangeText={(text) => handleChange("price", text)}
                  keyboardType="numeric"
                />
              </View>

              <View className="w-full flex-row mt-2" style={{ gap: 10 }}>
                <View style={{ width: "48%" }}>
                  <View className="flex-row flex-1  justify-between">
                    <Text className="text-primary-content text-[16px] pb-2 mr-auto">
                      Stocks
                    </Text>
                    <Text className="text-primary-content text-[16px] pb-2 mx-auto">
                      Unit
                    </Text>
                  </View>

                  <View className="flex-row flex-1  justify-between">
                    <Input
                      style={{ ...styles.input, width: "60%" }}
                      value={product.quantity.toString()}
                      onChangeText={(text) => handleChange("quantity", text)}
                      keyboardType="numeric"
                    />
                    <TouchableOpacity
                      style={{ width: "35%" }}
                      onPress={() => setShowModal(true)}
                      className="items-center justify-center bg-primary rounded-lg"
                    >
                      <Text className="text-center text-white font-bold">
                        {product.unit}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Divider />
                <View style={{ width: "48%" }}>
                  <View className="flex-row flex-1  justify-between">
                    <Text className="text-primary-content text-[16px] pb-2 mr-auto">
                      Low Stock Level
                    </Text>
                  </View>
                  <View className="flex-row flex-1  justify-between">
                    <Input
                      style={{ ...styles.input, width: "90%" }}
                      value={product.lowQuantity.toString()}
                      onChangeText={(text) => handleChange("lowQuantity", text)}
                      keyboardType="numeric"
                      accessoryRight={() => (
                        <Text className="text-center text-copy-light font-light">
                          {product.unit}
                        </Text>
                      )}
                    />
                  </View>
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
            <View className="mb-6 mt-2 mx-7" style={{ gap: 10 }}>
              <Button
                style={{ borderRadius: 40 }}
                onPress={handleSubmit}
                size="large"
              >
                {productData ? "Update Product" : "Add Product"}
              </Button>
            </View>

            {showModal && (
              <ModalUnitPicker
                visible={showModal}
                onBackdropPress={() => setShowModal(false)}
                value={product.unit}
                onUnitSelect={(value) => handleChange("unit", value)}
              />
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      {showScanner && (
        <CameraViewScanner
          scanned={scanned}
          setScanned={() => setScanned(false)}
          handleBarCodeScanned={handleBarCodeScanned}
          closeScan={() => setShowScanner(false)}
        />
      )}
    </>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  scrollView: {
    maxHeight: 200,
    flexGrow: 1
  },
  iconPosition: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
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
  scanButton: {
    position: "absolute",
    bottom: 50,
    left: 10,
    right: 10,
    zIndex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  autocomplete: {
    minWidth: 310,
    padding: 10,
    borderRadius: 10,
    // backgroundColor: 'transparent'
  },
});
