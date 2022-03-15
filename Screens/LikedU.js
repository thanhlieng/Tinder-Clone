import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  StatusBar,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import Auth from "../ggAuth/Auth";

const LikedItem = ({ uri }) => (
  <View style={tw`mb-3`}>
    <Pressable>
      <Image
        resizeMode="stretch"
        style={[tw``, styles.LikedImage]}
        source={require("../rose.jpg")}
        blurRadius={150}
      />
    </Pressable>
  </View>
);

const LikedU = () => {
  const { user, Logout } = Auth();
  const [data, setData] = useState([
    { id: "1", uri: "First" },
    { id: "2", uri: "Second" },
    { id: "3", uri: "Third" },
    { id: "4", uri: "Fourth" },
    { id: "5", uri: "First" },
    { id: "6", uri: "Second" },
    { id: "7", uri: "Third" },
    { id: "8", uri: "Fourth" },
    { id: "9", uri: "First" },
    { id: "10", uri: "Second" },
    { id: "11", uri: "Third" },
    { id: "12", uri: "Fourth" },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={tw`h-14 flex-row justify-center relative bg-white`}>
        <Pressable
          style={tw`absolute left-4 h-11 w-11 justify-center self-center`}
        >
          <Image
            resizeMode="contain"
            source={{ uri: user.photoURL }}
            style={[tw`w-9 h-9 rounded-full self-center`, styles.profileImage]}
          />
        </Pressable>
        <Image
          resizeMode="contain"
          style={tw`h-full w-20 self-center`}
          source={require("../Tinder-Logo.png")}
        />
      </View>
      <View style={tw`flex-1`}>
        <Text
          style={tw`text-lg font-semibold mt-4 border-b pb-4 w-full text-center border-pink-600 `}
        >
          Đã thích bạn
        </Text>
        <View style={tw`flex-1 mt-4 `}>
          <ScrollView>
            <View style={tw`flex-row flex-wrap justify-evenly`}>
              {data.map((item, index) => (
                <View key={index}>
                  <LikedItem uri={item.uri} />
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },
  LikedImage: {
    width: 185,
    height: 220,
    borderRadius: 20,
  },
});

export default LikedU;
