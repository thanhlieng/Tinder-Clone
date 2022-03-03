import React, { Component, useState, useRef } from "react";
import Swiper from "react-native-deck-swiper-renewed";
import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  ImageBackground,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import Feather from "react-native-vector-icons/Feather";
import Auth from "../ggAuth/Auth";
import { LinearGradient } from "expo-linear-gradient";
import StackNavigator from "@react-navigation/native-stack";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  GestureDetector,
  TapGestureHandler,
  Gesture,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

// demo purposes only
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

const Home = () => {
  const [card, setcard] = useState(range(1, 50));
  const [cardIndex, setcardIndex] = useState(0);
  const { user, Logout } = Auth();
  const pressedRed = useSharedValue(false);
  const pressedGreen = useSharedValue(false);
  const Swiperef = useRef(null);

  const renderCard = (card, index) => {
    return (
      <View style={styles.card}>
        {index == 1 ? (
          <>
            <ImageBackground
              source={require("../tesst.jpg")}
              style={tw`absolute top-0 h-full w-full`}
              resizeMode="stretch"
            >
              <LinearGradient
                colors={["transparent", "black"]}
                style={tw`absolute bottom-0 w-full h-40`}
              ></LinearGradient>
            </ImageBackground>
          </>
        ) : (
          <>
            <Text style={styles.text}>
              {card} - {index}
            </Text>
          </>
        )}
        <View style={tw` flex-1 absolute bottom-0 w-full h-32`}>
          <Text style={tw`font-bold text-lg ml-5 text-white`}>
            Nguyễn Ngọc Thành {index}
          </Text>
          <Feather name="map-pin" size={15} style={tw`ml-5 text-white`}>
            <Text> Cach xa 8km</Text>
          </Feather>
        </View>
      </View>
    );
  };

  const lefteventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      pressedRed.value = true;
    },
    onEnd: (event, ctx) => {
      pressedRed.value = false;
    },
  });

  const righteventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      pressedGreen.value = true;
    },
    onEnd: (event, ctx) => {
      pressedGreen.value = false;
    },
  });

  const leftTouchAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor: pressedRed.value
        ? "rgba(239, 68, 68, 0.3)"
        : "transparent",
      transform: [{ scale: pressedRed.value ? 1.3 : 1 }],
    };
  });

  const rightTouchAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor: pressedGreen.value
        ? "rgba(34, 197, 94, 0.3)"
        : "transparent",
      transform: [{ scale: pressedGreen.value ? 1.3 : 1 }],
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
      <View style={tw`bg-black flex-1`}>
        <Swiper
          ref={Swiperef}
          backgroundColor={"#FFFFFF"}
          cards={card}
          cardIndex={cardIndex}
          cardVerticalMargin={6}
          cardHorizontalMargin={6}
          renderCard={renderCard}
          stackSeparation={5}
          verticalSwipe={false}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  backgroundColor: "red",
                  borderColor: "red",
                  color: "white",
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: -30,
                },
              },
            },
            right: {
              title: "LIKE",
              style: {
                label: {
                  backgroundColor: "green",
                  borderColor: "green",
                  color: "white",
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: 10,
                  marginLeft: 10,
                },
              },
            },
          }}
          animateOverlayLabelsOpacity
          animateCardOpacity
          disableBottomSwipe={true}
          disableTopSwipe={true}
        ></Swiper>
        <GestureHandlerRootView
          style={[
            tw`h-16 bg-transparent flex-row justify-around`,
            { marginVertical: "138%", marginHorizontal: "0%" },
          ]}
        >
          <TapGestureHandler onGestureEvent={lefteventHandler}>
            <Animated.View
              style={[
                tw`rounded-full bg-white w-12 h-12 self-end`,
                leftTouchAnimation,
              ]}
            >
              <TouchableWithoutFeedback
                onPress={() => Swiperef.current.swipeLeft()}
                style={tw`w-12 h-12 justify-center rounded-full border-red-500 border-2 bg-transparent`}
              >
                <Ionicons
                  style={tw`self-center`}
                  name="md-close"
                  color={"red"}
                  size={32}
                />
              </TouchableWithoutFeedback>
            </Animated.View>
          </TapGestureHandler>
          <TapGestureHandler onGestureEvent={righteventHandler}>
            <Animated.View
              style={[
                tw`rounded-full bg-transparent w-12 h-12 self-end`,
                rightTouchAnimation,
              ]}
            >
              <TouchableWithoutFeedback
                onPress={() => Swiperef.current.swipeRight()}
                style={tw`w-12 h-12 justify-center rounded-full border-green-500 border-2 bg-transparent`}
              >
                <Ionicons
                  style={tw`self-center `}
                  name="heart"
                  color={"green"}
                  size={26}
                />
              </TouchableWithoutFeedback>
            </Animated.View>
          </TapGestureHandler>
        </GestureHandlerRootView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
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
  // done: {
  //   textAlign: "center",
  //   fontSize: 30,
  //   color: "white",
  //   backgroundColor: "transparent",
  // },
});

export default Home;
