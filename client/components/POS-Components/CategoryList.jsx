import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'


const CategoryList = ({ categories, handleCategoryFilter }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category === selectedCategory ? null : category);
        handleCategoryFilter(category === selectedCategory ? null : category);
    }


    return (
        <View className="flex-2 bg-foreground h-screen min-w-[100px]">

            {categories?.map((category) =>
                category.prodItems?.length > 0 &&
                <TouchableOpacity key={category._id} className={`${selectedCategory === category ? 'bg-secondary' : 'bg-foreground'} p-2`} onPress={() => handleCategoryClick(category)}>
                    <Text>{category.catName}</Text>
                </TouchableOpacity>)}
        </View>
    )
}

export default CategoryList

const styles = StyleSheet.create({})