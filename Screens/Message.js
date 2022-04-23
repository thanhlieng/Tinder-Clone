import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  Pressable,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import Auth from "../ggAuth/Auth";
import tw from "tailwind-react-native-classnames";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DataTable } from "react-native-paper";
import {
  getDatabase,
  ref,
  onValue,
  update,
  get,
  child,
} from "firebase/database";
import { db } from "../ggAuth/firebase-con";
import { doc, getDoc } from "firebase/firestore";

const Message = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const { user, Logout, userData, matchData, chatrooms } = Auth();
  const [loading, setLoading] = useState(true);
  const { dataFetch, dataset } = useState();
  const [matchingData, setmatchingData] = useState([]);
  const [matchingDataAvt, setmatchingDataAvt] = useState([]);
  const [matchingDataMess, setmatchingDataMess] = useState([]);
  const [matchingDataMessage, setmatchingDataMessage] = useState([]);
  let matchMessage = [];

  console.log(chatrooms);

  const fetchData = async (data) => {
    const snap = await getDoc(doc(db, "userDatas", data));
    setmatchingData([...matchingData, snap.data()]);
    setmatchingDataAvt([...matchingDataAvt, snap.data()]);
  };

  const fetchMess = async (data) => {
    const database = getDatabase();
    const starCountRefMess = ref(database, `chatrooms/${data}`);
    onValue(starCountRefMess, (snapshot) => {
      const dataS = snapshot.val();
      setmatchingDataMess([...matchingDataMess, dataS]);
      setmatchingDataMessage([...matchingDataMessage, dataS]);
    });
  };

  useEffect(() => {
    async function getMatchingData() {
      matchData.forEach((data) => {
        if (data !== user.uid) {
          fetchData(data);
        }
      });
    }
    async function getMessdata() {
      chatrooms.forEach((data) => {
        fetchMess(data);
      });
    }
    getMatchingData();
    // getMessdata();
    setLoading(false);
  }, [matchData]);

  const AvtItem = ({ title }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Chat", {
            matchId: title.id,
            chatroomsId: null,
            image: title.image[0],
            name: title.userName,
          })
        }
      >
        <View style={styles.listItem}>
          <Image
            resizeMode="stretch"
            style={[
              tw``,
              styles.matchAvt,
              { width: width * 0.18, height: (width * 0.19 * 4) / 3 },
            ]}
            source={{ uri: title.image[0] }}
          />
          <View
            style={[
              tw``,
              {
                width: width * 0.17,
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <Text
              style={[tw`font-bold text-xs`, {}]}
              numberOfLines={1}
              ellipsizeMode={"tail"}
            >
              {title.userName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const MessItem = ({ title, message }) => (
    <TouchableOpacity
      style={{ marginBottom: 15 }}
      onPress={() =>
        navigation.navigate("Chat", {
          matchId: "P1TXITCftqaz5jzkkaAMssPW0Tm1",
          chatroomsId: "-N04NR99YhtDfLKiz2vj",
          image:
            "https://firebasestorage.googleapis.com/v0/b/rn-app-59deb.appspot.com/o/P1TXITCftqaz5jzkkaAMssPW0Tm1%2Fimages%2FOADt4NjWtmIl-1sacz0t0.jpeg?alt=media&token=7f472022-02e6-4f89-a5a3-290d20b71d66",
          name: "yhuhjh",
        })
      }
    >
      <View style={[styles.messItem, {}]}>
        <Image
          resizeMode="cover"
          style={[
            tw`self-center rounded-full`,
            { width: width * 0.17, height: width * 0.17 },
          ]}
          source={require("../rose.jpg")}
        />
        <View style={[tw`ml-2 flex-1 justify-evenly  border-b`, styles.aloalo]}>
          <Text style={tw` font-bold text-base`}>{title}</Text>
          <Text style={[tw``, { color: "rgba(0, 0, 0, 0.7)" }]}>{message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const [text, setText] = useState("");
  const [data, setData] = useState([
    { id: "1", title: "First" },
    { id: "2", title: "Second" },
    { id: "3", title: "Third" },
    { id: "4", title: "Fourth" },
  ]);

  const [dataOriginal, setOri] = useState([
    { id: "1", title: "First" },
    { id: "2", title: "Second" },
    { id: "3", title: "Third" },
    { id: "4", title: "Fourth" },
  ]);

  const [dataa, setDataa] = useState([
    { id: "1", title: "First", message: "oke em" },
    { id: "2", title: "Second", message: "oke em" },
    { id: "3", title: "Third", message: "oke em" },
    { id: "4", title: "Fourth", message: "oke em" },
    { id: "5", title: "Fourth", message: "oke em" },
    { id: "6", title: "Fourth", message: "oke em" },
    { id: "7", title: "Fourth", message: "oke em" },
    { id: "8", title: "Fourth", message: "oke em" },
  ]);

  const [dataOriginall, setOril] = useState([
    { id: "1", title: "First", message: "oke em" },
    { id: "2", title: "Second", message: "oke em" },
    { id: "3", title: "Third", message: "oke em" },
    { id: "4", title: "Fourth", message: "oke em" },
    { id: "5", title: "Fourth", message: "oke em" },
    { id: "6", title: "Fourth", message: "oke em" },
    { id: "7", title: "Fourth", message: "oke em" },
    { id: "8", title: "Fourth", message: "oke em" },
  ]);

  const handleSearch = (text) => {
    if (text) {
      const newData = matchingData.reverse().filter(function (item) {
        const itemData = item.userName
          ? item.userName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setmatchingData(newData);
      setDataa(newData);
      setText(text);
    } else {
      setmatchingData(matchingDataAvt);
      setDataa(dataOriginall);
      setText(text);
    }
  };

  // const realtime = getDatabase();
  // const starCountRef = ref(realtime, `${user.uid}/match`);
  // console.log(starCountRef);
  // onValue(starCountRef, (snapshot) => {
  //   const data = snapshot.val();
  //   Matchdata = data;
  // });

  const renderItem = ({ item }) => <AvtItem title={item} />;

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <View>
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
          <View style={tw` flex-row`}>
            <Ionicons
              name="search"
              color={"pink"}
              size={26}
              style={tw`p-2 pl-4 pr-4`}
            />
            <TextInput
              onChangeText={(setText) => handleSearch(setText)}
              style={[styles.searchInput, tw`w-full pr-4`]}
              placeholder="Type a message to search"
              autoComplete={false}
              clearButtonMode="always"
            />
          </View>
          <View>
            <ScrollView
              style={styles.ScrollViewContainer}
              showsVerticalScrollIndicator={false}
            >
              <Text style={tw`font-bold pb-2`}>Tương hợp</Text>
              <FlatList
                data={matchingData.reverse()}
                renderItem={renderItem}
                keyExtractor={(item) => item}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
              <Text style={tw`font-bold pt-2 pb-4`}>Tin nhắn</Text>
              {dataa.map((item, index) => (
                <View key={index}>
                  <MessItem title={item.title} message={item.message} />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  searchInput: {
    padding: 5,
    borderColor: "pink",
    borderBottomWidth: 0.6,
  },
  listItem: {
    alignItems: "center",
    flexDirection: "column",
    paddingEnd: 15,
  },
  listItemText: {
    fontSize: 18,
  },
  listContain: {
    marginTop: 10,
  },
  ScrollViewContainer: {
    marginHorizontal: 15,
    paddingTop: 15,
  },
  matchAvt: {
    borderRadius: 40,
  },
  messItem: {
    flexDirection: "row",
    flex: 1,
  },
  aloalo: {
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
});

export default Message;
