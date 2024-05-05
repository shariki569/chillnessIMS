import { Dimensions, Image, KeyboardAvoidingView, Platform, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import product1 from '../../assets/Products/1.png'
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import { getCategories } from '../../API/getCategory';
import CheckoutButton from './CheckoutButton';
import { Button, Input } from '@ui-kitten/components';
import { colors } from '../../assets/colorPallette';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart, useCartContext } from '../../context/CartContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decrementQuantity, incrementQuantity, removeFromCart } from '../../utilities/CartReducer';

const ProductGrid = ({ renderData, selectedCategory, refresh, handleRefresh }) => {


    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);


    const cart = useSelector((state) => state.cart.cart);
    console.log("ADDED CART ", "============================================         ",cart)
    const dispatch = useDispatch();

    // const handleRefreshDelay = () => {
    //     setTimeout(() => {
    //         setRefresh(true);
    //         setTimeout(() => {
    //             setRefresh(false);
    //         }, 1000)
    //     }, 1000)
    // }
    const handleSearch = (text) => {
        setSearch(text);
        const searchResults = renderData.filter(product => product.prodName.toLowerCase().includes(text.toLowerCase()));
        setSearchResults(searchResults);
    }

    const filteredProducts =
        selectedCategory
            ? renderData.filter(product => product.
                prodCategory.some(prodCategory => prodCategory._id === selectedCategory._id))
            : renderData;




    function heightScrollView() {
        const screen = Dimensions.get('screen');
        const scrollHeight = screen.height - 160;
        return scrollHeight;
    }

    const addItemToCart = (product) => {
        const existingProduct = cart.find(item => item._id === product._id);
        if (existingProduct) {
            dispatch(incrementQuantity(product)); // If the product exists in the cart, increment its quantity
            // setQuantity({ ...quantity, [product._id]: quantity[product._id] + 1 });
        } else {
            dispatch(addToCart(product)); // If the product is not in the cart, add it
            // setQuantity({ ...quantity, [product._id]: 1 }); // Set initial quantity to 1 for the newly added product
        }
    }

    const decrementItem = (product) => {

        if (product.quantity === 1) {
            dispatch(removeFromCart(product));
            // const { [product._id]: _, ...updatedQuantity } = quantity;
            // setQuantity(updatedQuantity); // Remove the quantity for the removed product
        } else {
            dispatch(decrementQuantity(product));
            // setQuantity({ ...quantity, [product._id]: quantity[product._id] - 1 }); // Decrement the quantity for the product
        }
    };

    const getProductQuantity = (product) => {
        return quantity[product._id] || 0; // Get the quantity from state
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={30} className="flex-1">

            <ScrollView style={{ backgroundColor: colors.background, flex: 1, maxHeight: heightScrollView() }} contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refresh} onRefresh={handleRefresh} />}>
                <View className={`flex-row gap-2 p-1 flex-wrap `}>
                    {(search ? searchResults : filteredProducts)?.map((product) =>
                        <View key={product._id} className="bg-foreground align-center justify-center flex-col rounded-md overflow-hidden min-w-[90px] max-w-[135px] h-[180px]">
                            <TouchableOpacity className=" h-[150px]  w-full" onPress={() => addItemToCart(product)}>
                                <Image className="h-full w-full object-cover" source={{ uri: product.prodImage }} />
                            </TouchableOpacity>
                            <View className="flex-row w-full ">
                                <View className="px-2 py-2 mr-auto flex-col">
                                    <Text className=" pb-1 text-md font-bold text-primary-dark">${product.prodPrice}</Text>
                                    <Text numberOfLines={2} className="text-copy  max-w-[80px] text-start  mb-[40px]">{product.prodName}</Text>
                                </View>
                                {cart.map((item) => item._id === product._id &&
                                    <TouchableOpacity key={product._id} onPress={() => decrementItem(product)} className="bg-secondary px-4 py-2 ">
                                        <View className="mb-auto  flex-col items-center justify-evenly">
                                            <Text className="mb-1 ">Qty</Text>
                                            <Text className=" mb-auto text-lg ">
                                                {item.quantity}
                                            </Text>
                                        </View>

                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    )}
                </View>

            </ScrollView>
            {cart.length > 0 && <CheckoutButton />}
            <View className=" bg-primary mb-[100px] w-full p-4">
                <Input
                    value={search}
                    onChangeText={handleSearch}
                    placeholder='Search'
                    accessoryLeft={() => <FontAwesome name="search" size={15} color={colors.copyLight} />}
                    accessoryRight={() =>
                        <View >
                            <FontAwesome name="microphone" size={15} color={colors.copyLight} />
                            <Ionicons name="barcode-outline" size={15} color={colors.copyLight} />

                        </View>
                    } />
                {/* <View className="flex-row">
<Button style={styles.button}><Text>Scan</Text></Button>
<Button><Text>Scan</Text></Button>
</View> */}
            </View>


        </KeyboardAvoidingView >
    )
}

export default ProductGrid


const styles = StyleSheet.create({

    button: {
        marginHorizontal: 'auto',
        backgroundColor: colors.primaryLight
    }
})


