import React, { useState, useRef, useEffect } from "react";
import Swiper from "react-native-deck-swiper-renewed";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  ImageBackground,
  Pressable,
  useWindowDimensions,
  ActivityIndicator,
  PixelRatio,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import tw from "tailwind-react-native-classnames";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Auth from "../ggAuth/Auth";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  TapGestureHandler,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import Foundation from "react-native-vector-icons/Foundation";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  doc,
} from "firebase/firestore";
import {
  getDatabase,
  ref,
  onValue,
  update,
  get,
  child,
} from "firebase/database";

import { auth, db } from "../ggAuth/firebase-con";
import { async } from "@firebase/util";

// demo purposes only
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

const Home = ({ navigation }) => {
  const { height, width, fontScale } = useWindowDimensions();
  const [cardIndex, setcardIndex] = useState(0);
  const { user, Logout, userData, likedData } = Auth();
  const pressedRed = useSharedValue(false);
  const pressedGreen = useSharedValue(false);
  const Swiperef = useRef(null);
  const Carouselref = useRef(null);
  const [dotindex, setIndex] = useState(0);
  const [allData, setDataFetched] = useState([]);
  const [loading, setloading] = useState(true);

  const fullYear = new Date();
  const tabBarHeight = useBottomTabBarHeight();
  console.log(tabBarHeight);

  const imagedata = [
    { id: "1", uri: ["First"] },
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
  ];

  useEffect(() => {
    let sub;
    const fetchUser = async () => {
      const querySnapshot = await getDocs(collection(db, "userDatas"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        if (doc.data().id !== user.uid) {
          setDataFetched((prev) => [...prev, doc.data()]);
        }
      });
      setloading(false);
    };
    fetchUser();
    return sub;
  }, []);

  const addLikeduser = (userId) => {
    console.log(userId);
    if (!likedData.includes(userId)) {
      const dbb = getDatabase();
      get(ref(dbb, `${userId}/liked`))
        .then((snapshot) => {
          const userLikedData = snapshot.val();
          update(ref(dbb, `${userId}`), {
            liked: [...userLikedData, user.uid],
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      navtoMatch(userId);
    }

    // const updates = {};
    // if (!userLikedData.includes("thanh")) {
    //   console.log(userLikedData);
    //   userLikedData.push("jkoi123");
    //   updates["liked/THANH"] = userLikedData;
    // }
    // userLikedData.push("VCoin");
    // console.log("&1" + userLikedData);
  };

  // const realtime = getDatabase();
  // const starCountRef = ref(realtime, `${user.uid}/liked`);
  // onValue(starCountRef, (snapshot) => {
  //   const data = snapshot.val();
  //   Likeddata = data;
  // });

  const navtoMatch = (Id2) => {
    navigation.navigate("match", {
      matchId: Id2,
    });
  };

  console.log(allData);

  const renderImage = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Image
          source={{ uri: "" + item }}
          style={[tw`h-full w-full`, { borderRadius: 10 }]}
          resizeMode="stretch"
        ></Image>
        <LinearGradient
          colors={["transparent", "black"]}
          style={[
            tw`absolute bottom-0 self-center`,
            { height: "25%", width: width * 0.98, borderRadius: 10 },
          ]}
        ></LinearGradient>
        <Pressable
          style={[tw`absolute h-full right-0`, { width: "30%" }]}
          onPress={() => Carouselref.current.snapToNext()}
        />
        <Pressable
          style={[tw`absolute h-full`, { width: "30%" }]}
          onPress={() => Carouselref.current.snapToPrev()}
        />
      </View>
    );
  };

  const RenderCard = ({ card }) => {
    console.log(card);
    const [dotindex, setdotIndex] = useState(0);
    if (card.id === user.uid) {
      return null;
    }
    return (
      <View
        style={[
          styles.card,
          { height: Platform.OS === "android" ? height * 0.8 : height * 0.75 },
        ]}
      >
        <Carousel
          layout="tinder"
          ref={Carouselref}
          data={card.image}
          sliderWidth={width * 0.98}
          itemWidth={width * 0.98}
          renderItem={renderImage}
          inactiveSlideShift={0}
          useScrollView={true}
          scrollEnabled={false}
          onSnapToItem={(index) => setdotIndex(index)}
          style={tw`bg-red-500`}
        />
        <Pagination
          containerStyle={{
            position: "absolute",
            backgroundColor: "transparent",
            right: 0,
            top: 0,
          }}
          renderDots={(activeIndex) => (
            <View
              style={{
                backgroundColor: "rgba(0,0,0,0.7)",
                alignItems: "center",
                padding: 5,
                borderRadius: 99999,
                paddingLeft: 8,
                paddingRight: 8,
              }}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 15 }}
              >
                {activeIndex + 1}/{card.image.length}
              </Text>
            </View>
          )}
          activeDotIndex={dotindex}
          dotsLength={5}
        />
        <View style={[tw`absolute bottom-0 w-full`, { height: "20%" }]}>
          <Text
            style={[
              tw`font-bold ml-5 text-white`,
              { fontSize: 20 / fontScale },
            ]}
          >
            {card.userName} {fullYear.getFullYear() - card.birthYear}
          </Text>
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
      <View
        style={[
          tw`flex-row justify-evenly items-center bg-white w-full`,
          { height: height * 0.06 },
        ]}
      >
        <Pressable
          onPress={() => navigation.navigate("User")}
          style={tw`justify-center self-center`}
        >
          <Image
            resizeMode="cover"
            source={{ uri: "" + userData.image[0] }}
            style={[
              tw` rounded-full self-center `,
              { height: height * 0.04, width: height * 0.04 },
            ]}
          />
        </Pressable>
        <Image
          resizeMode="contain"
          style={[tw`h-full self-center`, { width: "50%" }]}
          source={require("../Tinder-Logo.png")}
        />
        <Pressable>
          <View
            style={[
              tw` rounded-full self-center `,
              { height: height * 0.04, width: height * 0.04 },
            ]}
          />
        </Pressable>
      </View>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View
          style={[
            tw``,
            {
              justifyContent: "center",
              alignItems: "center",
              marginTop: height * 0.02,
              marginBottom: height * 0.02,
              height: Platform.OS === "android" ? height * 0.8 : height * 0.75,
            },
          ]}
        >
          <Swiper
            ref={Swiperef}
            backgroundColor={"#F2F2F2"}
            cards={allData}
            cardIndex={0}
            renderCard={(card) => <RenderCard card={card} />}
            verticalSwipe={false}
            cardVerticalMargin={0}
            cardHorizontalMargin={width * 0.01}
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
            childrenOnTop={true}
            onSwipedRight={(cardIndex) => {
              addLikeduser(allData[cardIndex].id);
            }}
          >
            <GestureHandlerRootView
              style={tw`absolute bottom-0 flex-row justify-around w-full items-end`}
            >
              <TapGestureHandler onGestureEvent={lefteventHandler}>
                <Animated.View style={[tw`rounded-full `, leftTouchAnimation]}>
                  <TouchableWithoutFeedback
                    onPress={() => Swiperef.current.swipeLeft()}
                    style={[
                      tw` justify-center rounded-full border-red-500 border-2 `,
                      {
                        width: PixelRatio.getPixelSizeForLayoutSize(19),
                        height: PixelRatio.getPixelSizeForLayoutSize(19),
                        flexWrap: "wrap-reverse",
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      style={tw`self-center absolute`}
                      name="window-close"
                      color={"red"}
                      size={PixelRatio.getPixelSizeForLayoutSize(18)}
                    />
                  </TouchableWithoutFeedback>
                </Animated.View>
              </TapGestureHandler>
              <TapGestureHandler onGestureEvent={righteventHandler}>
                <Animated.View style={[tw`rounded-full `, rightTouchAnimation]}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      Swiperef.current.swipeRight();
                    }}
                    style={[
                      tw`justify-center rounded-full border-green-500 border-2 bg-transparent`,
                      {
                        width: PixelRatio.getPixelSizeForLayoutSize(19),
                        height: PixelRatio.getPixelSizeForLayoutSize(19),
                      },
                    ]}
                  >
                    <Foundation
                      style={tw`self-center absolute`}
                      name="heart"
                      color={"green"}
                      size={PixelRatio.getPixelSizeForLayoutSize(18)}
                    />
                  </TouchableWithoutFeedback>
                </Animated.View>
              </TapGestureHandler>
            </GestureHandlerRootView>
          </Swiper>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    marginTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignContent: "center",
  },
  card: {
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white",
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
  },
});

export default Home;
