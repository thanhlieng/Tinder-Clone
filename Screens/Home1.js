import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import React, { Component, useState } from "react";
import tw from "tailwind-react-native-classnames";
import Feather from "react-native-vector-icons/Feather";
import Auth from "../ggAuth/Auth";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { TapGestureHandler } from "react-native-gesture-handler";

const Home1 = () => {
  const { user, Logout } = Auth();
  const offset = useSharedValue(0);
  const pressed = useSharedValue(false);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value * 255 }],
    };
  });

  const TapEventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      pressed.value = true;
    },
    onEnd: (event, ctx) => {
      pressed.value = false;
    },
  });

  const animatedStylesTap = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value ? "#11FF34" : "#10C4E3",
      scale: withSpring(pressed.value ? 1.2 : 1),
    };
  });

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
      <TapGestureHandler onGestureEvent={TapEventHandler}>
        <Animated.View
          style={[styles.box, animatedStyles, animatedStylesTap]}
        />
      </TapGestureHandler>
      <Button
        onPress={() => (offset.value = withSpring(Math.random()))}
        title="Move"
      />
      <View style={tw`bg-transparent flex-1 justify-center`}>
        <View style={[tw`bg-white ml-2 mr-2 mt-3 mb-3`, styles.cardContainer]}>
          {/* <ImageBackground
            source={require("../tesst.jpg")}
            style={tw`absolute top-0 h-full w-full`}
            resizeMode="stretch"
          >
            <LinearGradient
              colors={[
                "rgba(0, 0, 0, 0)",
                "rgba(0, 0, 0, 0.5)",
                "rgba(0, 0, 0, 1)",
              ]}
              style={tw`absolute bottom-0 w-full h-60`}
            ></LinearGradient>
          </ImageBackground> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  card: {
    flex: 0.8,
    top: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
  },
  done: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    backgroundColor: "transparent",
  },
  cardContainer: {
    flex: 1,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "black",
  },
});
