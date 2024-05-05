import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import React, { useEffect, useState } from "react";
import { Camera, CameraView } from "expo-camera/next";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "@ui-kitten/components";
import { colors } from "../assets/colorPallette";
import { useNavigation } from "@react-navigation/native";

const CameraViewScanner = ({ scanned, setScanned, handleBarCodeScanned, closeScan }) => {

  const [hasPermission, setHasPermission] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.getCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
  }, []);

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      setScanned(false); // Reset scanned state when the screen is focused
    });

    const unsubscribeBlur = navigation.addListener("blur", () => {
      closeScan(); // Close the scanner when the screen is blurred
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation, closeScan, setScanned]);



  return (
    <View style={{ marginTop: Platform.OS === "android" ? 30 : 0 }} className=" z-10 absolute flex-row items-center justify-center h-screen w-full">
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, styles.camera]}
      >
        <TouchableOpacity style={styles.iconPosition} onPress={setScanned}>
          <MaterialCommunityIcons
            style={{ marginTop: "auto", marginBottom: "auto" }}
            name="close"
            size={30}
            color={colors.background}
            onPress={closeScan}
          />
        </TouchableOpacity>
        <MaterialCommunityIcons
          style={{ marginTop: "auto", marginBottom: "auto" }}
          name="scan-helper"
          size={300}
          color="black"
        />

        {scanned && (
          <Button style={styles.scanButton} onPress={setScanned}>
            Tap to Scan Again
          </Button>
        )}
      </CameraView>
    </View>

  );
};

export default CameraViewScanner;

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,

  },
  scanButton: {
    position: "absolute",
    bottom: 50,
    left: 10,
    right: 10,
    zIndex: 1,
  },
  iconPosition: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
});
