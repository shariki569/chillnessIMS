import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Input } from "@ui-kitten/components";

const Autocomplete = ({ data, onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (text) => {
    setQuery(text);
    const filtered = data.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleSelect = (item) => {
    setQuery(item);
    onSelect(item);
  };

  return (
    <View>
      <Input value={query} onChangeText={handleInputChange}>
        Autocomplete
      </Input>
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <Text style={{ padding: 8 }}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default Autocomplete;

const styles = StyleSheet.create({});
