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
import { MaterialIcons, Fontisto } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// import { colors } from "../../assets/colorPallette";
import PrimaryButton from "../components/PrimaryButton";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigation();
const route = useRoute();
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if(token){
          navigate.replace("Main");
        }
      } catch (error) {
        console.log("Error checking token", error);
      }
    }
    checkToken();
  }, []);

  const handleLogin = async () => {
    const user = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}login`,
        user
      );
      console.log(response);
      const token = response.data.token;
      AsyncStorage.setItem("authToken", token);
      navigate.replace("Main");
    } catch (error) {
      Alert.alert("Error", error.response.data.message);
      console.log(error);
    } finally {
      Alert.alert("Login Successful");
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center ">
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
                onPress={() => navigate.navigate("Register")}
                text={"Login"}
                style={"w-[50%] m-1 "}
                solid={route.name === "Login" ? true : false}
              />
              <PrimaryButton
                onPress={() => navigate.navigate("Register")}
                text={"Register"}
                style={"w-[50%] m-1 "}
              />
              
              {/* <Pressable
               
                onPress={() => navigate.navigate("Register")}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#899584",
                    fontSize: 15,
                  }}
                >
                  Register
                </Text>
              </Pressable>
              <Pressable
             
                onPress={() => navigate.navigate("Register")}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#899584",
                    fontSize: 15,
                  }}
                >
                  Register
                </Text>
              </Pressable> */}
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
                  placeholder="Enter your e-mail"
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
            <View style={{ marginTop: 30 }} />

            {/* <Pressable
              onPress={handleLogin}
              className="rounded-3xl mx-auto"
              style={{
                width: 300,
                backgroundColor: "#8cd64c",
                padding: 15,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#1a320f",
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                Login
              </Text>
            </Pressable> */}
            <PrimaryButton onPress={handleLogin} text={"Login"} solid={true} style={"w-full "}/>
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
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  headingText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#899584",
  },
  textInput: {
    color: "grey",
    marginVertical: 10,
    width: 300,
    color: "#899584",
    width: 250,
    marginLeft: 12,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "#fbfbfb",
    paddingVertical: 5,
    marginHorizontal: 1,
    borderRadius: 15,
    marginTop: 10,
  },
});
