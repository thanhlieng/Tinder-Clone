import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import Auth from "../ggAuth/Auth";

const Matched = () => {
  const { user } = Auth();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: "https://tinder.com/static/tinder.png" }}
        resizeMode="cover"
        style={tw`flex-1`}
      >
        <View style={styles.textMatch}>
          <Text style={tw`text-green-600 text-4xl pb-2`}>It's a Matched</Text>
          <Text style={tw`text-green-600 text-xl pt-2`}>
            You guys have like each other
          </Text>
        </View>
        <View style={styles.imageMatch}>
          <Image
            source={{ uri: user.photoURL }}
            style={[tw`w-32 h-32`, styles.matchImage]}
          ></Image>
          <Image
            style={[tw`w-32 h-32`, styles.matchImage]}
            source={{ uri: user.photoURL }}
          ></Image>
        </View>
        <View style={styles.buttonMatch}>
          <TouchableOpacity>
            <Text style={tw`text-white text-lg`}>Keep Swipping</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={tw`text-white pt-10 text-lg`}>
              Send message imidiately
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Matched;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  textMatch: {
    alignItems: "center",
    marginVertical: "25%",
  },
  imageMatch: {
    paddingTop: 20,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  buttonMatch: {
    alignItems: "center",
    marginVertical: "25%",
  },
  matchImage: {
    borderRadius: 99999,
    borderWidth: 5,
    borderColor: "white",
  },
});
