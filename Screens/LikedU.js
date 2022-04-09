import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  StatusBar,
  FlatList,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import Auth from "../ggAuth/Auth";
import {
  getDatabase,
  ref,
  onValue,
  update,
  get,
  child,
} from "firebase/database";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../ggAuth/firebase-con";

const LikedU = () => {
  const { height, width } = useWindowDimensions();
  const { user, Logout, userData } = Auth();
  const [test, setTest] = useState(true);
  let Likeddata = [];

  const LikedItem = ({ uri }) => {
    const [likeData, setlikeData] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      async function fetchUser() {
        const snap = await getDoc(doc(db, "userDatas", uri));
        setlikeData(snap.data());
        setLoading(false);
      }
      fetchUser();
    }, [Likeddata]);
    return (
      <View style={tw`mb-3`}>
        {loading ? (
          <Text>Loading</Text>
        ) : (
          <Pressable>
            <Image
              resizeMode="stretch"
              style={[
                { width: width * 0.47, height: width * 0.6 },
                styles.LikedImage,
              ]}
              source={{ uri: likeData.image[0] }}
              blurRadius={150}
            />
          </Pressable>
        )}
      </View>
    );
  };

  const realtime = getDatabase();
  const starCountRef = ref(realtime, `liked/${user.uid}`);
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    Likeddata = data;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          tw`flex-row justify-center items-center relative bg-white w-full top-0`,
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
      <View style={tw`flex-1`}>
        <Text
          style={tw`text-lg font-semibold border-b pb-4 w-full text-center border-pink-600 `}
        >
          Đã thích bạn
        </Text>
        <View style={tw`flex-1 mt-4 `}>
          <ScrollView>
            <View style={tw`flex-row flex-wrap justify-evenly`}>
              {Likeddata.map((item, index) => (
                <View key={index}>
                  <LikedItem uri={item} />
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
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
  LikedImage: {
    borderRadius: 20,
  },
});

export default LikedU;
