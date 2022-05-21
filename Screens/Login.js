import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import Auth from "../ggAuth/Auth";
import { useNavigation } from "@react-navigation/core";
import tw from "tailwind-react-native-classnames";
import navigation from "@react-navigation/native-stack";

function Login() {
  const { SigninGoogle, userData, user, Loading } = Auth();
  const navigation = useNavigation();

  return (
    <View style={tw`flex-1`}>
      <ImageBackground
        source={{ uri: "https://tinder.com/static/tinder.png" }}
        resizeMode="cover"
        style={tw`flex-1`}
      >
        <TouchableOpacity
          style={[
            tw`absolute top-3/4 w-52 bg-white p-4 rounded-3xl`,
            { marginHorizontal: "25%" },
          ]}
          onPress={SigninGoogle}
        >
          <Text style={tw`font-semibold text-center text-pink-500`}>
            Signin with Google
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

export default Login;
