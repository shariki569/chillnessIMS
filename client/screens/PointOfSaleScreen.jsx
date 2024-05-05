import { Alert, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useCallback, useEffect, useState } from 'react'
import { colors } from '../assets/colorPallette'
import ProductGrid from '../components/POS-Components/ProductGrid'
import CategoryList from '../components/POS-Components/CategoryList'
import { getCategories } from '../API/getCategory'
import { getProducts } from '../API/product'
import { useNavigation } from '@react-navigation/native'


const PointOfSaleScreen = () => {

    const [categories, setCategoryData] = useState([])
    const [products, setProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigation();

    const fetchCategoriesData = async (search) => {
        try {
            const { categories: categoriesData, } = await getCategories({ search });
            console.log("Fetched categories:", categoriesData); // Check if data is fetched
            setCategoryData(categoriesData || []);
        } catch (error) {
            Alert.alert("Error", error.response.data.message);
        }
    }

    const fetchData = useCallback(async () => {
        try {
            const { products, error } = await getProducts();
            if (error) {
                ToastAndroid.show(error, ToastAndroid.SHORT);
            } else {
                setProducts(products);
            }
        } catch (error) {
            Alert.alert("Error", error.response.data.message);
        }
    })

    useEffect(() => {
        fetchCategoriesData()
        fetchData()
    }, [])

    const handleRefresh = useCallback(() => {
        setTimeout(() => {
            setRefresh(true);
            fetchData()
            fetchCategoriesData()
            setTimeout(() => {
                setRefresh(false);
            }, 1000)
        })
    }, [fetchData, fetchCategoriesData]);

    return (

        <SafeAreaView style={{ marginTop: Platform.OS === "android" ? 30 : 0 }}>
            <View className="bg-primary p-3 flex-row items-center justify-center">
                <TouchableOpacity className="mr-auto" onPress={() => navigate.goBack()}>
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={24}
                        color={colors.primaryContent}
                    />
                </TouchableOpacity>
                <Text className="text-primary-content teaxt-lg mr-auto text-bold">
                    POS
                </Text>
            </View>
            <View className="flex-row">
                <CategoryList categories={categories} handleCategoryFilter={setSelectedCategory} />
                <ProductGrid renderData={products} selectedCategory={selectedCategory} refresh={refresh} handleRefresh={handleRefresh} />
            </View>
        </SafeAreaView>

    )
}

export default PointOfSaleScreen

const styles = StyleSheet.create({})