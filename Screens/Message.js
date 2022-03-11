import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import Auth from "../ggAuth/Auth";
import tw from "tailwind-react-native-classnames";
import Ionicons from "react-native-vector-icons/Ionicons";

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
      <View style={tw`h-14 flex-row justify-center relative bg-white`}>
        <TouchableOpacity
          onPress={Logout}
          style={tw`absolute left-4 h-11 w-11 justify-center self-center`}
        >
          <Image
            resizeMode="contain"
            source={{ uri: user.photoURL }}
            style={[tw`w-9 h-9 rounded-full self-center`, styles.profileImage]}
          />
        </TouchableOpacity>
        <Image
          resizeMode="contain"
          style={tw`h-full w-20 self-center`}
          source={require("../Tinder-Logo.png")}
        />
      </View>
      <View style={tw` flex-row`}>
        <Ionicons
          name="search"
          color={"pink"}
          size={26}
          style={tw`p-2 pl-4 pr-4`}
        />
        <TextInput
          onChangeText={(setText) => handleSearch(setText)}
          style={[styles.searchInput, tw`w-full pr-4`]}
          placeholder="Type a message to search"
          autoComplete={false}
          clearButtonMode="always"
        />
      </View>
      <View style={styles.listContain}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal={true}
          style={styles.list}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  searchInput: {
    padding: 5,
    borderColor: "pink",
    borderBottomWidth: 0.6,
  },
  listItem: {
    marginTop: 10,
    alignItems: "center",
    paddingHorizontal: 2,
    backgroundColor: "#fff",
  },
  listItemText: {
    fontSize: 18,
  },
  list: {
    height: 30,
  },
});

export default Message;
