import {
    Alert,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { MaterialIcons, Fontisto } from "@expo/vector-icons";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import axios from "axios";
  import PrimaryButton from "../components/PrimaryButton";
  
  const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigation();
    const route = useRoute();
  
    const handleRegister = async () => {
      try {
        const user = { name, email, password };
        await axios.post(`${process.env.EXPO_PUBLIC_API_URL}register`, user);
        Alert.alert("Registration Successful", "Please Login to continue");
      } catch (err) {
        console.log("Registration Failed", err.response.data);
        Alert.alert("Error", err.response.data.message);
      }
    };
  
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ImageBackground
          source={require("../assets/background-1.png")}
          style={{
            flex: 1,
            resizeMode: "cover",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <View className="bg-white m-7 rounded-3xl item-center justify-center flex-col px-5 py-7">
            <View className="flex-row item-center justify-center">
              <Image
                style={{ width: 100, height: 100 }}
                source={require("../assets/ChillnessLogo.png")}
              />
            </View>
  
            <KeyboardAvoidingView>
              <View className="flex-row justify-center items-center  pt-6 pb-3">
                <PrimaryButton
                  onPress={() => navigate.goBack()}
                  text={"Login"}
                  style={"w-[50%] m-1 "}
                />
                <PrimaryButton
                  onPress={() => navigate.goBack()}
                  text={"Register"}
                  style={"w-[50%] m-1 "}
                  solid={route.name === "Register" ? true : false}
                />
              </View>
              <View className="mt-2">
                <View style={styles.textContainer}>
                  <MaterialIcons
                    style={{ marginLeft: 8, color: "#899584" }}
                    name="account-circle"
                    size={24}
                    color="black"
                  />
                  <TextInput
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={[styles.textInput, { fontSize: name ? 15 : 15 }]}
                    placeholder="Enter your name"
                  />
                </View>
              </View>
              <View className="mt-2">
                <View style={styles.textContainer}>
                  <MaterialIcons
                    style={{ marginLeft: 8, color: "#899584" }}
                    name="email"
                    size={24}
                    color="black"
                  />
                  <TextInput
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={[styles.textInput, { fontSize: email ? 15 : 15 }]}
                    placeholder="Enter your email"
                  />
                </View>
              </View>
              <View className="mt-2">
                <View style={styles.textContainer}>
                  <MaterialIcons
                    style={{ marginLeft: 8, color: "#899584" }}
                    name="lock"
                    size={24}
                    color="black"
                  />
                  <TextInput
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                    style={[styles.textInput, { fontSize: email ? 15 : 15 }]}
                    placeholder="Enter your password"
                  />
                </View>
              </View>
              <View
                style={{
                  marginTop: 12,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text>Keep me logged in</Text>
                <Text style={{ color: "#abe093", fontWeight: "bold" }}>
                  Forgot password
                </Text>
              </View>
              <View style={{ marginTop: 30 }} />
              <PrimaryButton
                onPress={handleRegister}
                text={"Register"}
                style={"w-full"}
                solid
              />
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  };
  
  export default RegisterScreen;
  
  const styles = StyleSheet.create({
    headingText: {
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 12,
      color: "#899584",
    },
    textInput: {
      color: "grey",
      marginVertical: 10,
      width: 250,
      color: "#899584",
    },
    textContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      backgroundColor: "#fbfbfb",
      paddingVertical: 5,
      marginHorizontal: 1,
      borderRadius: 15,
      marginTop: 10,
    },
  });
  // console.log(process.env.EXPO_PUBLIC_API_URL);