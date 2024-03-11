import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { MaterialIcons, Fontisto } from "@expo/vector-icons";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigation();

  const handleLogin = async () => {
    const user = {
      email: email,
      password: password,
    };
    try {
     const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}login`, user);
     console.log(response);
     const token = response.data.token;
    } catch (error) {
      console.log
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
      <View>
        <Image
          style={{ width: 100, height: 100 }}
          source={require("../assets/ChillnessLogo.png")}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.headingText}>Login to your account</Text>
        </View>
        <View style={{ marginTop: 60 }}>
          <View style={styles.textContainer}>
            <MaterialIcons
              style={{ marginLeft: 8, color: "#899584" }}
              name="email"
              size={24}
              color="black"
            />
            <TextInput
              value={email}
              onChange={(text) => setEmail(text)}
              style={[styles.textInput, { fontSize: email ? 18 : 18 }]}
              placeholder="Enter your e-mail"
            />
          </View>
        </View>
        <View style={{ marginTop: 5 }}>
          <View style={styles.textContainer}>
            <MaterialIcons
              style={{ marginLeft: 8, color: "#899584" }}
              name="lock"
              size={24}
              color="black"
            />
            <TextInput
              value={password}
              onChange={(text) => setPassword(text)}
              secureTextEntry={true}
              style={[styles.textInput, { fontSize: email ? 18 : 18 }]}
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
        <View style={{ marginTop: 80 }} />

        <Pressable
          onPress={handleLogin}
          style={{
            width: 200,
            backgroundColor: "#8cd64c",
            borderRadius: 10,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#1a320f",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Login
          </Text>
        </Pressable>
        <Pressable
          style={{ marginTop: 15 }}
          onPress={() => navigate.navigate("Register")}
        >
          <Text style={{ textAlign: "center", color: "#899584", fontSize: 16 }}>
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
    width: 300,
    color: "#899584",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#fbfbfb",
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 10,
  },
});
