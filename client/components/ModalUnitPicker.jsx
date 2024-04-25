import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Card, Modal } from "@ui-kitten/components";
import QuantityWithUnit from "./QuantityWithUnit";

const ModalUnitPicker = ({ visible, onBackdropPress, value, onUnitSelect }) => {
    
    const handleSave = () => {
      onUnitSelect(value);
      onBackdropPress();
    }

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={onBackdropPress}
    >
      <Card
        header={
          <Text className="text-primary-content text-lg">
            Choose a Measuring Unit
          </Text>
        }
        footer={
          <View className="text-primary-content text-lg flex-row gap-4">
            <Button onPress={onBackdropPress} status="danger"> Cancel </Button>
            <Button onPress={handleSave}> Save </Button>
          </View>
        }
      >

        <QuantityWithUnit value={value} onChange={onUnitSelect}/>
      </Card>
    </Modal>
  );
};

export default ModalUnitPicker;

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
