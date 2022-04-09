import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import Auth from "../ggAuth/Auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../ggAuth/firebase-con";

const Matched = ({ route, navigation: { goBack } }) => {
  const { user, userData } = Auth();
  const { matchId } = route.params;
  const { height, width } = useWindowDimensions();
  const [matchData, setmatchData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchUser() {
      const snap = await getDoc(doc(db, "userDatas", matchId));
      setmatchData(snap.data());
      setLoading(false);
    }
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ImageBackground
          source={{ uri: matchData.image[0] }}
          resizeMode="cover"
          style={tw`flex-1`}
          // imageStyle={{ opacity: 0.3 }}
        >
          <View style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <View style={styles.textMatch}>
              <Text style={tw`text-green-500 text-4xl pb-2`}>
                It's a Matched
              </Text>
              <Text style={tw`text-green-500 text-xl pt-2`}>
                You guys have like each other
              </Text>
            </View>
            <View style={styles.imageMatch}>
              <Image
                source={{ uri: userData.image[0] }}
                style={[
                  { width: width * 0.35, height: width * 0.35 },
                  styles.matchImage,
                ]}
              ></Image>
              <Image
                style={[
                  { width: width * 0.35, height: width * 0.35 },
                  styles.matchImage,
                ]}
                source={{ uri: matchData.image[0] }}
              ></Image>
            </View>
            <View style={styles.buttonMatch}>
              <TouchableOpacity onPress={() => goBack()}>
                <Text style={tw`text-white text-lg`}>Keep Swipping</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={tw`text-white pt-10 text-lg`}>
                  Send message imidiately
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      )}
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
    marginVertical: "35%",
  },
  matchImage: {
    borderRadius: 99999,
    borderWidth: 5,
    borderColor: "pink",
  },
});
