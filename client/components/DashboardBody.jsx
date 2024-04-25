import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const DashboardBody = () => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.row}>
          <Pressable style={styles.box} onPress={() => navigate("Inventory")}>
            <Text style={styles.text}>Inventory</Text>
          </Pressable>
          <Pressable style={styles.box} onPress={() => navigate("AddProduct")}>
            <Text style={styles.text}>Add Product</Text>
          </Pressable>
        </View>

        <View style={styles.row}>
          <Pressable
            style={styles.box}
            onPress={() => navigate("ManageInventory")}
          >
            <Text style={styles.text}>Manage Inventory</Text>
          </Pressable>
        </View>
      </View>


    </View>
  );
};

export default DashboardBody;

const styles = StyleSheet.create({});
