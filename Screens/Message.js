import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  TextInput,
  Text,
} from "react-native";
import Auth from "../ggAuth/Auth";

const Item = ({ title }) => (
  <View style={styles.listItem}>
    <Text style={styles.listItemText}>{title}</Text>
  </View>
);

const Message = () => {
  const { user, Logout } = Auth();
  const [Text, setText] = useState("");
  const [data, setData] = useState(dataOriginal);
  const dataOriginal = [
    { id: "1", title: "First item" },
    { id: "2", title: "Second item" },
    { id: "3", title: "Third item" },
    { id: "4", title: "Fourth item" },
  ];
  const handleSearch = (text) => {
    if (text) {
      const newData = dataOriginal.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
      setText(text);
    } else {
      setData(dataOriginal);
      setText(text);
    }
  };
  const renderItem = ({ item }) => <Item title={item.title} />;
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        onChangeText={(setText) => handleSearch(setText)}
        style={styles.searchInput}
        placeholder="Type a message to search"
        autoComplete={false}
        clearButtonMode="always"
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  searchInput: {
    padding: 30,
    borderColor: "#CCC",
    borderBottomWidth: 1,
    borderLeftWidth: 1,
  },
  text: {
    fontSize: 20,
    color: "#101010",
    marginTop: 60,
    fontWeight: "700",
  },
  listItem: {
    marginTop: 10,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
  },
  listItemText: {
    fontSize: 18,
  },
});

export default Message;
