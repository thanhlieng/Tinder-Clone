import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Auth from "../ggAuth/Auth";
import { useNavigation } from "@react-navigation/core";
import tw from "tailwind-react-native-classnames";

const Matched = () => {
  const { Logout, user } = Auth();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={[tw`flex-1 bg-white`, styles.androidSafeArea]}>
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
      <Text>Matched</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  androidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  profileImage: {
    overflow: "hidden",
    borderRadius: 1000,
  },
});

export default Matched;
