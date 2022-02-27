import React, { Component, useState } from "react";
import Swiper from "react-native-deck-swiper-renewed";
import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import Feather from "react-native-vector-icons/Feather";
import Auth from "../ggAuth/Auth";
import { LinearGradient } from "expo-linear-gradient";

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
                colors={[
                  "rgba(0, 0, 0, 0)",
                  "rgba(0, 0, 0, 0.5)",
                  "rgba(0, 0, 0, 1)",
                ]}
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
          swipeBackCard
          disableBottomSwipe={true}
          disableTopSwipe={true}
        ></Swiper>
        <View
          style={[
            tw`h-16 bg-transparent flex-row justify-around`,
            { marginVertical: "138%", marginHorizontal: "5%" },
          ]}
        >
          <TouchableOpacity
            style={tw`rounded-full bg-red-500 w-12 h-12 self-end`}
          ></TouchableOpacity>
          <TouchableOpacity
            style={tw`rounded-full bg-green-500 w-12 h-12 self-end`}
          ></TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
});

export default Home;
