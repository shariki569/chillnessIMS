import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Input } from "@ui-kitten/components";

const Autocomplete = ({ styles, suggestions, searchString, onChangeText, onSelect }) => {

  return (
    < >
      <View>
        <Input style={{ ...styles, position: "relative" }} onChangeText={onChangeText} value={searchString} />
      </View>

      {suggestions?.length > 0 && searchString !== "" &&
        <ScrollView contentContainerStyle={style.scrollView} className="absolute mt-[68px] z-10  w-full bg-primary rounded-t-sm rounded-b-lg">
          {suggestions.map((suggestion) => (
            <TouchableOpacity onPress={onSelect(suggestion)} key={suggestion._id} activeOpacity={0.5} className='w-full bg-foreground py-3 px-2'>
              <Text>{suggestion.catName} </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      }
    </>
  );
};

export default Autocomplete;

const style = StyleSheet.create({

  scrollView: {
    maxHeight: 200,
    flexGrow: 1
  }
});

