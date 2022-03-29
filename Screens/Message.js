import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import Auth from "../ggAuth/Auth";
import tw from "tailwind-react-native-classnames";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DataTable } from "react-native-paper";

const AvtItem = ({ title }) => (
  <TouchableOpacity>
    <View style={styles.listItem}>
      <Image
        resizeMode="stretch"
        style={[tw``, styles.matchAvt]}
        source={require("../rose.jpg")}
      />
      <View
        style={[
          tw``,
          { width: 70, alignItems: "center", justifyContent: "center" },
        ]}
      >
        <Text
          style={[tw`font-bold text-xs`, {}]}
          numberOfLines={1}
          ellipsizeMode={"tail"}
        >
          {title}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const MessItem = ({ title, message }) => (
  <TouchableOpacity style={{ marginBottom: 15 }}>
    <View style={styles.messItem}>
      <Image
        resizeMode="cover"
        style={tw`h-16 w-16 self-center rounded-full`}
        source={require("../rose.jpg")}
      />
      <View style={[tw`ml-2 flex-1 justify-center border-b`, styles.aloalo]}>
        <Text style={tw`pt-1 font-bold text-base`}>{title}</Text>
        <Text style={[tw`pb-1`, { color: "rgba(0, 0, 0, 0.7)" }]}>
          {message}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const Message = () => {
  const { user, Logout, userData } = Auth();
  const [text, setText] = useState("");
  const [data, setData] = useState([
    { id: "1", title: "First" },
    { id: "2", title: "Second" },
    { id: "3", title: "Third" },
    { id: "4", title: "Fourth" },
  ]);

  const [dataOriginal, setOri] = useState([
    { id: "1", title: "First" },
    { id: "2", title: "Second" },
    { id: "3", title: "Third" },
    { id: "4", title: "Fourth" },
  ]);

  const [dataa, setDataa] = useState([
    { id: "1", title: "First", message: "oke em" },
    { id: "2", title: "Second", message: "oke em" },
    { id: "3", title: "Third", message: "oke em" },
    { id: "4", title: "Fourth", message: "oke em" },
    { id: "5", title: "Fourth", message: "oke em" },
    { id: "6", title: "Fourth", message: "oke em" },
    { id: "7", title: "Fourth", message: "oke em" },
    { id: "8", title: "Fourth", message: "oke em" },
  ]);

  const [dataOriginall, setOril] = useState([
    { id: "1", title: "First", message: "oke em" },
    { id: "2", title: "Second", message: "oke em" },
    { id: "3", title: "Third", message: "oke em" },
    { id: "4", title: "Fourth", message: "oke em" },
    { id: "5", title: "Fourth", message: "oke em" },
    { id: "6", title: "Fourth", message: "oke em" },
    { id: "7", title: "Fourth", message: "oke em" },
    { id: "8", title: "Fourth", message: "oke em" },
  ]);

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
      setDataa(newData);
      setText(text);
    } else {
      setData(dataOriginal);
      setDataa(dataOriginall);
      setText(text);
    }
  };
  const renderItem = ({ item }) => <AvtItem title={item.title} />;
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={tw`h-14 flex-row justify-center items-center relative bg-white`}
      >
        <Pressable
          style={tw`absolute left-6 h-11 w-11 justify-center self-center`}
        >
          <Image
            resizeMode="cover"
            source={{ uri: "" + userData.image[0] }}
            style={[tw`w-9 h-9 rounded-full self-center `, styles.profileImage]}
          />
        </Pressable>
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
      <ScrollView
        style={styles.ScrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={tw`font-bold`}>Tương hợp</Text>
        <View style={styles.listContain}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            horizontal={true}
            style={styles.list}
          />
        </View>
        <Text style={tw`font-bold pt-2 pb-4`}>Tin nhắn</Text>
        {dataa.map((item, index) => (
          <View key={index}>
            <MessItem title={item.title} message={item.message} />
          </View>
        ))}
      </ScrollView>
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
    alignItems: "center",
    flexDirection: "column",
    paddingEnd: 15,
  },
  listItemText: {
    fontSize: 18,
  },
  listContain: {
    marginTop: 10,
  },
  ScrollViewContainer: {
    marginHorizontal: 15,
    paddingTop: 15,
  },
  matchAvt: {
    borderRadius: 40,
    width: 70,
    height: 90,
  },
  messItem: {
    flexDirection: "row",
    flex: 1,
  },
  aloalo: {
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
});

export default Message;
