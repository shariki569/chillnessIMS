import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import { NativeWindStyleSheet } from "nativewind";
import * as eva from "@eva-design/eva";
import { default as theme } from "./theme.json";
import { ApplicationProvider } from "@ui-kitten/components";
import { AuthContextProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import store from "./store/store";


// import CartContextProvider from "./context/CartContext";
NativeWindStyleSheet.setOutput({
  default: "native",
});
export default function App() {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <AuthContextProvider>
          <StackNavigator />
        </AuthContextProvider>
      </ApplicationProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
