import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Touchable,
} from "react-native";
import React from "react";
import Auth from "../ggAuth/Auth";
import { useNavigation } from "@react-navigation/core";
import tw from "tailwind-react-native-classnames";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import GestureHandlerRootView from "react-native-gesture-handler";

const Matched = () => {
  const { Logout, user } = Auth();
  const navigation = useNavigation();
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
      console.log("pressed");
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

  const onSingleTapEvent = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      alert("Hey single tap!");
    }
  };

  return (
    <>
      {/* <View style={tw`h-14 flex-row justify-center relative bg-white`}>
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
      </View> */}
      <TapGestureHandler onHandlerStateChange={onSingleTapEvent}>
        <View style={styles.box} />
      </TapGestureHandler>
      <Button
        onPress={() => (offset.value = withSpring(Math.random()))}
        title="Move"
      />
    </>
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
  box: {
    width: 100,
    height: 100,
    backgroundColor: "black",
    marginTop: 100,
  },
});

export default Matched;
