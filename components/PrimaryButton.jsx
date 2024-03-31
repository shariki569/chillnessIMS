import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const PrimaryButton = ({ onPress, text, solid, style }) => {
  const buttonStyle = solid ? `bg-primary ` : `border-2 border-primary`;
  const textStyle = solid ? `text-primary-content ` : `text-primary`;

  return (
    <Pressable
      onPress={onPress}
      className={`rounded-3xl mx-auto ${buttonStyle} ${style} `}
      style={{
        // width: 300,
        // backgroundColor: "#8cd64c",
        padding: 15,
      }}
    >
      <Text
        className={`text-center ${textStyle}`}
        style={{
          // color: "#1a320f",
          fontSize: 15,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({});
