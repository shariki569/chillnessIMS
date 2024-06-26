import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../assets/colorPallette";
import { useNavigation } from "@react-navigation/native";
// import useSWR from "swr";

import VerticalListInventory from "../components/VerticalListInventory";
import { Input } from "@ui-kitten/components";
import axios from "axios";
import { getProducts, searchProduct } from "../API/product";
import CameraViewScanner from "../components/CameraViewScanner";

const Inventory = () => {
  const navigate = useNavigation();

  const [searchResults, setSearchResults] = useState("");
  const [item, setItem] = useState([]);
  const [refresh, setRefresh] = useState(false);
  //Scanner
  const [showScanner, setShowScanner] = useState(false);
  const [scanned, setScanned] = useState(false);



  const handleBarCodeScanned = ({ data }) => {
    try {
      setScanned(true);
      // setProduct({ ...product, code: data });
      setShowScanner(false);
      fetchData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setScanned(false);
    }
  };

  const handleSearchChange = (text) => {
    setSearchResults(text);
  };

  const fetchData = async (search) => {
    try {
      setRefresh(true);
      const { products, error } = search
        ? await searchProduct(search)
        : await getProducts();
      if (error) {
        Alert.alert("Error", error);
      } else {
        setItem(products);
      }
      setRefresh(false);
    } catch (err) {
      Alert.alert("Error", err.response.data.message);
    }
  };

  useEffect(() => {
    fetchData(searchResults); // Fetch data initially and whenever searchResults changes
  }, []);



  // const fetchData = useCallback(async () => {
  //   try {
  //     setRefresh(true);
  //     const productsData = searchResults
  //       ? await searchProduct(searchResults)
  //       : await getProducts();

  //     if (productsData.error) {
  //       Alert.alert("Error", productsData.error);
  //     } else {
  //       setItem(productsData.products);
  //     }
  //     setRefresh(false);

  //   } catch (err) {
  //     Alert.alert("Error", err.response.data.message);
  //   }
  // }, [searchResults]);


  const fetchDataReset = async () => {
    setSearchResults("");
    setRefresh(true);
    fetchData("");
  };

  const handleRefresh = useCallback(() => {
    setRefresh(true);
    fetchData(searchResults); // Refresh data based on the current search
  }, []);

  const renderSearchIcon = () => {
    if (searchResults) {
      return <MaterialCommunityIcons name="close" size={24} color="black" onPress={fetchDataReset} />;
    }
  }

  return (
    <>
      <SafeAreaView style={{ marginTop: Platform.OS === "android" ? 0 : 10 }}>
        <View className="bg-primary p-3 flex-row items-center justify-center">
          <Pressable className="mr-auto" onPress={() => navigate.goBack()}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={colors.primaryContent}
            />
          </Pressable>
          <Text className="text-primary-content teaxt-lg mr-auto text-bold">
            Inventory
          </Text>
        </View>

        <View className="bg-primary-light p-3 flex-row items-center justify-between ">
          <Input
            placeholder="Search"
            value={searchResults}
            onChangeText={handleSearchChange}
            style={{ flex: 1, marginRight: 10 }}
            accessoryRight={renderSearchIcon}
            returnKeyType="search"
            onSubmitEditing={() => fetchData(searchResults)}
          />

          <TouchableOpacity className="mx-auto" >
            <MaterialCommunityIcons name="barcode-scan" size={24} color="black" onPress={() => setShowScanner(!showScanner)} />
          </TouchableOpacity>


        </View>


        {item && (
          <VerticalListInventory
            item={item}
            handleRefresh={handleRefresh}
            refresh={refresh}
          />
        )}



      </SafeAreaView>

      {
        showScanner && (
          <CameraViewScanner
            closeScan={() => setShowScanner(false)}
            setScanned={() => setScanned(false)}
            scanned={scanned} handleBarCodeScanned={handleBarCodeScanned} />

        )
      }

    </>

  );
}

export default Inventory;

const styles = StyleSheet.create({});
