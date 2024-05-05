import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Button } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from '../../assets/colorPallette'

const CheckoutButton = ({ }) => {
    const navigate = useNavigation()
    const cart = useSelector((state) => state.cart.cart);

    const total = cart.reduce((acc, item) => acc + item.prodPrice * item.quantity, 0);


    return (


        <TouchableOpacity onPress={() => navigate.navigate("PreviewOrder")} className=" bg-foreground mb-5 mt-3 w-[90%] mx-auto flex-row items-center justify-around  rounded-3xl">
            <LinearGradient colors={
                [
                    colors.primaryLight,
                    colors.primary,
                    colors.primaryDark
                ]}
                start={{ x: 0.1, y: 0.2 }}
                end={{ x: 1.5, y: 4 }}
                className="bg-primary px-5 py-4 rounded-full mr-auto"
            >

                <Text>Confirm Purchase</Text>

            </LinearGradient>
            <View className="flex-row  items-center  justify-center mr-auto">
                <View className="flex-col items-center justify-center mx-2">
                    <Text>Total</Text>
                    <Text>${total}</Text>
                </View>
                <View className="flex-col items-center justify-center mx-2">
                    <Text>Items</Text>
                    <Text>{cart.length}</Text>
                </View>
            </View>


        </TouchableOpacity>

    )
}

export default CheckoutButton

const styles = StyleSheet.create({

})