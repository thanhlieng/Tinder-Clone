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
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import tw from "tailwind-react-native-classnames";
import Feather from "react-native-vector-icons/Feather";
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
  const { height, width } = useWindowDimensions();
  const [cardIndex, setcardIndex] = useState(0);
  const { user, Logout, userData } = Auth();
  const pressedRed = useSharedValue(false);
  const pressedGreen = useSharedValue(false);
  const Swiperef = useRef(null);
  const Carouselref = useRef(null);
  const [dotindex, setIndex] = useState(0);
  const [carouselWidth, setcarouselWidth] = useState(100);
  const [carouselHeight, setcarouselHeight] = useState(100);
  const [allData, setDataFetched] = useState([]);
  const [loading, setloading] = useState(true);
  const onLayout = (event) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    setcarouselWidth(width);
  };
  const layoutA = (event) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    setcarouselHeight(height);
  };

  let Likeddata = [];

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
    // async function fetchUser() {
    //   const q = query(collection(db, "userDatas"));
    //   const querySnapshot = await getDocs(q);
    //   setDataFetched(
    //     querySnapshot.forEach((doc) => ({
    //       id: doc.id,
    //       ...doc.data(),
    //       // doc.data() is never undefined for query doc snapshots
    //     }))
    //   );
    //   setloading(false);
    // }
    let sub;
    const fetchUser = async () => {
      sub = onSnapshot(collection(db, "userDatas"), (snapshot) => {
        setDataFetched(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        setloading(false);
      });
    };
    // function alo() {
    //   setloading(false);
    // }
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });
    fetchUser();
    // alo();
    return sub;
  }, []);

  const addLikeduser = (userId) => {
    const dbb = getDatabase();
    let userLikedData = [];
    get(ref(dbb, `liked/${userId}`))
      .then((snapshot) => {
        console.log(snapshot.val());
        userLikedData = snapshot.val();
        const updates = {};
        if (!userLikedData.includes(user.uid)) {
          userLikedData.push(user.uid);
          updates[`liked/${userId}`] = userLikedData;
          return update(ref(realtime), updates);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    // const updates = {};
    // if (!userLikedData.includes("thanh")) {
    //   console.log(userLikedData);
    //   userLikedData.push("jkoi123");
    //   updates["liked/THANH"] = userLikedData;
    // }
    // userLikedData.push("VCoin");
    // console.log("&1" + userLikedData);
  };

  const realtime = getDatabase();
  const starCountRef = ref(realtime, "liked/THANH");
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    Likeddata = data;
  });

  const renderImage = ({ item, index }) => {
    return (
      <View key={index} style={{ height: height * 0.85 }}>
        <ImageBackground
          source={{ uri: "" + item }}
          style={tw`top-0 h-full w-full rounded-full`}
          resizeMode="stretch"
        >
          <LinearGradient
            colors={["transparent", "black"]}
            style={[tw`absolute bottom-0 w-full`, { height: "25%" }]}
          ></LinearGradient>
        </ImageBackground>
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

  const renderCard = (card, index) => {
    return (
      <View style={[styles.card, { height: height * 0.85 }]} key={index}>
        <Carousel
          layout="tinder"
          ref={Carouselref}
          data={allData[index].image}
          sliderWidth={width * 0.95}
          itemWidth={width * 0.95}
          renderItem={renderImage}
          inactiveSlideShift={0}
          useScrollView={true}
          scrollEnabled={false}
          onSnapToItem={(index) => setIndex(index)}
          style={tw`bg-red-500`}
        />
        <Pagination
          containerStyle={{
            position: "absolute",
            backgroundColor: "transparent",
            right: -10,
            top: -15,
          }}
          renderDots={(activeIndex) => (
            <View
              style={{
                backgroundColor: "rgba(0,0,0,0.7)",
                alignItems: "center",
                padding: 2,
                borderRadius: 99999,
                paddingLeft: 5,
                paddingRight: 5,
              }}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 15 }}
              >
                {activeIndex + 1}/{allData[index].image.length}
              </Text>
            </View>
          )}
          activeDotIndex={dotindex}
          dotsLength={imagedata.length}
        />
        <View style={[tw`absolute bottom-0 w-full`, { height: "20%" }]}>
          <Text style={tw`font-bold text-lg ml-5 text-white`}>
            {allData[index].userName}{" "}
            {fullYear.getFullYear() - allData[index].birthYear}
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
      <View
        onLayout={layoutA}
        style={[
          tw`flex-row justify-center items-center relative bg-white w-full absolute top-0`,
          { height: height * 0.055 },
        ]}
      >
        <Pressable
          onPress={() => navigation.navigate("User")}
          style={tw`absolute left-6 h-11 w-11 justify-center self-center`}
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
      </View>
      {loading ? (
        <View style={[styles.card]} onLayout={onLayout}>
          <Carousel
            layout="tinder"
            ref={Carouselref}
            data={imagedata[0].uri}
            sliderWidth={carouselWidth}
            itemWidth={carouselWidth}
            renderItem={renderImage}
            inactiveSlideShift={0}
            useScrollView={true}
            scrollEnabled={false}
            onSnapToItem={(index) => setIndex(index)}
            style={tw`bg-red-500`}
          />
        </View>
      ) : (
        <View style={[tw`bg-red-500`, { height: height * 0.85 }]}>
          <Swiper
            ref={Swiperef}
            backgroundColor={"#F2F2F2"}
            cards={allData}
            cardIndex={0}
            renderCard={renderCard}
            verticalSwipe={false}
            cardVerticalMargin={0}
            cardHorizontalMargin={width * 0.025}
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
              () => addLikeduser(allData[cardIndex].id);
            }}
          >
            <GestureHandlerRootView
              style={tw`absolute bottom-0 flex-row justify-around w-full`}
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
                      size={40}
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
                    onPress={() => {
                      Swiperef.current.swipeRight(), addLikeduser();
                    }}
                    style={tw`w-12 h-12 justify-center rounded-full border-green-500 border-2 bg-transparent`}
                  >
                    <Ionicons
                      style={tw`self-center `}
                      name="heart"
                      color={"green"}
                      size={40}
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
    flex: 1,
    backgroundColor: "transparent",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "center",
    alignContent: "center",
  },
  card: {
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "green",
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
  },
});

export default Home;
