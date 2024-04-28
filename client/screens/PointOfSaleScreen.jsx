import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PointOfSaleScreen = () => {
    return (
        <SafeAreaView style={{ marginTop: Platform.OS === "android" ? 30 : 0 }}>
            <View>
                <Text>PointOfSaleScreen</Text>
            </View>

        </SafeAreaView>
    )
}

export default PointOfSaleScreen

const styles = StyleSheet.create({})