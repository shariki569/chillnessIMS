import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../assets/colorPallette';
import { useNavigation } from '@react-navigation/native';
import { Button, Input } from '@ui-kitten/components';
import client from '../API/client';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../utilities/CartReducer';


const paymentOptions = [
    {
        id: 1,
        name: "Cash",
        icon: "cash"
    },
    {
        id: 2,
        name: "GCash",
        icon: "credit-card"
    },
    {
        id: 3,
        name: "PayPal",
        icon: "paypal"
    },
    {
        id: 4,
        name: "Credit",
        icon: "credit-card"
    }
]

const PaymentOption = ({ route }) => {
    const cart = useSelector((state) => state.cart.cart);
    console.log('PaymentOption', cart)
    const dispatch = useDispatch();

    const { total } = route.params
    const navigate = useNavigation()
    const [amountReceived, setAmountReceived] = useState(0)


    const handleAmountReceived = (value) => {
        setAmountReceived(value)
    }

    const handlePaymentValidation = () => {
        const amount = parseFloat(amountReceived);
        if (isNaN(amount) || amount <= 0) {
            Alert.alert("Empty", "Amount must be a valid number and greater than 0");
            return false;
        } else if (amount < total) {
            Alert.alert("Invalid", "Amount must not be less than the payable amount");
            return false;
        }
        return true;
    };

    const clearCartItems = () => {
        dispatch(clearCart());
    }


    const handlePaymentOption = async (paymentOptions) => {
        if (handlePaymentValidation()) {
            const paymentChange = amountReceived - total;

            const orderItems = cart.map(item => ({
                product: item._id, // Assuming _id represents the unique identifier of the product
                quantity: item.quantity
            }));

            const order = {
                orderItems: orderItems,
                paymentStatus: "Paid",
                totalAmount: total,
                amountReceived: amountReceived,
                paymentMethod: paymentOptions.name
            }
            try {
                const res = await client.post('/orders', order);
                const { order: createdOrder, receiptNumber } = res.data
                console.log("Order created:", receiptNumber);
                Alert.alert("Success", "Payment successfull");
                navigate.navigate("PaymentConfirmation", {
                    paymentOptions: paymentOptions.name,
                    amountPayable: total,
                    paymentChange: paymentChange,
                    amountReceived: amountReceived,
                    receiptNumber: receiptNumber
                }
                );
                // clearCartItems();
            } catch (error) {
                Alert.alert("Error", error.response.data.message);
            }
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }} className="bg-background ">
            <View className="bg-primary p-3 flex-row items-center justify-center z-10">
                <TouchableOpacity className="mr-auto" onPress={() => navigate.goBack()}>
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={24}
                        color={colors.primaryContent}
                    />
                </TouchableOpacity>
                <Text className="text-primary-content teaxt-lg mr-auto text-bold">
                    Payment
                </Text>
            </View>
            <KeyboardAvoidingView className="bg-foreground p-3 flex-row items-start justify-center flex-1">
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }} className="py-4 w-full">


                    <View className="py-3 justify-center items-center">
                        <Text className="text-primary-light font-bold text-xl mb-3"> Payable Amount</Text>
                        <Text className="text-secondary-dark font-bold text-6xl">${total}</Text>
                    </View>

                    <View className="py-5 w-full">
                        <View className="py-3 justify-center items-center">
                            <Text className="text-primary-light font-bold text-xl mb-3"> Amount Recieved</Text>
                            <Input
                                value={amountReceived.toString()}
                                onChangeText={handleAmountReceived}
                                textStyle={{ color: colors.primaryContent, fontSize: 34, textAlign: 'center', fontWeight: 'bold', color: colors.secondaryDark }}
                                inputMode='numeric' size='large' style={{ width: 300 }}
                            />
                            <Button size='giant' style={{ marginTop: 10, width: 300 }} onPress={() => handleAmountReceived(total)}>
                                <Text className="text-primary-light font-bold text-2xl">Exact Amount</Text>
                            </Button>
                        </View>
                    </View>

                    <View className="py-5 w-full ">
                        <View className="mx-auto">

                            <Text className="text-primary-light font-bold text-xl text-center">Payment Options</Text>
                            {paymentOptions.map((item) => (
                                <Button key={item.id} size='giant' style={{ marginTop: 10, width: 300 }} onPress={() => handlePaymentOption(item)}>
                                    <Text className="text-foreground font-bold text-2xl">{item.name}</Text>
                                </Button>
                            ))}

                        </View>
                    </View>
                </ScrollView>

            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default PaymentOption

const styles = StyleSheet.create({})