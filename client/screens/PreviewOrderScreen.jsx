import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../assets/colorPallette'
import { MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';
import { Button, Divider } from '@ui-kitten/components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import img from '../assets/image-placeholder.png';
import { decrementQuantity, incrementQuantity, removeFromCart } from '../utilities/CartReducer';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        qty: 1,
        title: 'First Item',
        price: '$157.00',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        qty: 2,
        title: 'Second Item',
        price: '$15.00',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        qty: 3,
        title: 'Third Item',
        price: '$1500.00',
    },
];



const headerList = () => {

    return (
        <View className={"bg-foreground p-1 flex-row items-center justify-between"}>
            <View className="w-[15%]">

            </View>
            <View className="w-[25%] px-1">
                <Text>Product</Text>
            </View>
            <View className="w-[25%] ">

                <Text className="mx-auto">Qty</Text>

            </View>
            <View className="w-[15%] items-center justify-center ">
                <Text>Price</Text>
            </View>
            <View className="w-[15%] items-center justify-center ">
                <Text>SubTotal</Text>
            </View>
            <View className="w-[10%] ">

            </View>
        </View>
    )
}




const Item = ({ item }) => {
    const subtotal = item?.prodPrice * item?.quantity;
    const dispatch = useDispatch();
    const incrementItem = (item) => {
        dispatch(incrementQuantity(item))
    }

    const decrementItem = (item) => {
        if (item.quantity > 1) {
            dispatch(decrementQuantity(item))
        }
    }

    const removeItemFromCart = (item) => {
        dispatch(removeFromCart(item))
    }

    return (
        <>
            <View className="flex-row items-center justify-between p-1 bg-foreground ">
                <View className="w-[15%] h-[full] object-cover aspect-square ">
                    <Image className="w-full h-full" height={100} source={{ uri: item?.prodImage }}></Image>
                </View>

                <View className="w-[25%] px-2">
                    <Text>
                        {item?.prodName}
                    </Text>
                </View>

                <View className="w-[25%] h-full flex-row justify-between items-center ">
                    <TouchableOpacity onPress={() => incrementItem(item)} className="h-8 w-8 flex items-center justify-center bg-primary-light">
                        <AntDesign name="plus" size={15} color="black" />
                    </TouchableOpacity>
                    <Text>{item?.quantity}</Text>
                    <TouchableOpacity onPress={() => decrementItem(item)} className={`h-8 w-8 flex items-center justify-center ${item?.quantity <= 1 ? 'bg-transparent' : 'bg-primary'} `}>
                        {item?.quantity > 1 &&
                            <AntDesign name="minus" size={15} color="black" />
                        }
                    </TouchableOpacity>
                </View>
                <View className=" items-center justify-center w-[15%]">
                    <Text>
                        ${item?.prodPrice}
                    </Text>
                </View>
                <View className="items-center justify-center w-[15%]">
                    <Text>
                        ${subtotal}
                    </Text>
                </View>
                <TouchableOpacity onPress={() => removeItemFromCart(item)} className="w-[10%] ">
                    <Entypo name="circle-with-cross" size={30} color={colors.error} />
                </TouchableOpacity>

            </View>
            <Divider />
        </>
    )
}


const PreviewOrderScreen = () => {
    const navigate = useNavigation();
    const cart = useSelector((state) => state.cart.cart);
    const grandTotal = cart.reduce((acc, item) => acc + item.prodPrice * item.quantity, 0);
    const dispatch = useDispatch()

    const incrementItem = (item) => {
        dispatch(incrementQuantity(item))
    }
    
    
    return (
        <SafeAreaView>
            <View className="bg-primary p-3 flex-row items-center justify-center">
                <TouchableOpacity className="mr-auto" onPress={() => navigate.goBack()}>
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={24}
                        color={colors.primaryContent}
                    />
                </TouchableOpacity>
                <Text className="text-primary-content text-lg mr-auto">
                    Orders
                </Text>

                <View className='flex-col'>
                    <Text>
                        Receipt No.
                    </Text>
                    <Text>
                        00119
                    </Text>
                </View>

            </View>
            <FlatList
                ListHeaderComponent={headerList}
                ListHeaderComponentStyle={{ marginTop: 5, marginHorizontal: 5 }}
                data={cart}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={(item) => item._id}
            />
            <Divider />
            <View className="bg-foreground p-3 flex-row items-center justify-center">
                <Text className="text-primary-dark font-bold text-xl">
                    Total: $ {grandTotal.toFixed(2)}
                </Text>
            </View>
            <View>
                <Button onPress={() => navigate.navigate("PaymentOptions", { total: grandTotal })}>
                    Confirm Purchase
                </Button>
            </View>

        </SafeAreaView>
    )
}

export default PreviewOrderScreen

const styles = StyleSheet.create({})