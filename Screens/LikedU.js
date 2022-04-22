import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  StyleSheet,
  StatusBar,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import Auth from "../ggAuth/Auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../ggAuth/firebase-con";

const LikedU = ({ navigation }) => {
  const { height, width } = useWindowDimensions();
  const { user, userData, likedData } = Auth();

  const LikedItem = ({ uri }) => {
    const [likeData, setlikeData] = useState();
    const [loading, setLoading] = useState(true);
    if (uri === user.uid) {
      return null;
    }
    useEffect(() => {
      async function fetchUser() {
        const snap = await getDoc(doc(db, "userDatas", uri));
        setlikeData(snap.data());
        setLoading(false);
      }
      fetchUser();
    }, [likedData]);
    return (
      <View style={tw`mb-3`}>
        {loading ? (
          <Image
            style={[{ width: width * 0.48, height: width * 0.6 }]}
            source={{ uri: "https://i.stack.imgur.com/FsMtu.gif" }}
          />
        ) : (
          <Pressable>
            <Image
              style={[
                { width: width * 0.48, height: width * 0.6, borderRadius: 10 },
              ]}
              source={{ uri: likeData.image[0] }}
              blurRadius={150}
            />
          </Pressable>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          tw`flex-row justify-evenly items-center bg-white w-full`,
          { height: height * 0.055 },
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
      <Text
        style={tw`text-lg font-semibold border-b pb-4 w-full text-center border-pink-600 `}
      >
        Đã thích bạn
      </Text>
      <ScrollView
        style={{ marginTop: 20 }}
        contentContainerStyle={styles.liked}
      >
        {likedData.reverse().map((item, index) => (
          <LikedItem uri={item} key={index} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },
  liked: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignContent: "flex-end",
  },
});

export default LikedU;
