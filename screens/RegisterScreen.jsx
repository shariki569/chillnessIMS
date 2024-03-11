import {
  Alert,
  Image,
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
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigation();

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
      <View>
        <Image
          style={{ width: 100, height: 100 }}
          source={require("../assets/ChillnessLogo.png")}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.headingText}>Create an account</Text>
        </View>
        <View style={{ marginTop: 60 }}>
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
              style={[styles.textInput, { fontSize: name ? 18 : 18 }]}
              placeholder="Enter your name"
            />
          </View>
        </View>
        <View style={{ marginTop: 5 }}>
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
              style={[styles.textInput, { fontSize: email ? 18 : 18 }]}
              placeholder="Enter your email"
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
              onChangeText={(text) => setPassword(text)}
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
          onPress={handleRegister}
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
            Register
          </Text>
        </Pressable>
        <Pressable style={{ marginTop: 15 }} onPress={() => navigate.goBack()}>
          <Text style={{ textAlign: "center", color: "#899584", fontSize: 16 }}>
            Already have an account? Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
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
// console.log(process.env.EXPO_PUBLIC_API_URL);
