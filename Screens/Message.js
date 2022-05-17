import React, { useState, useEffect, useCallback } from "react";
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
  PixelRatio,
} from "react-native";
import Auth from "../ggAuth/Auth";
import tw from "tailwind-react-native-classnames";
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
  const { width, height, fontScale } = useWindowDimensions();
  const { user, Logout, userData, matchData, chatrooms } = Auth();
  const [loadingMatch, setLoadingMatch] = useState(true);
  const [loadingChat, setLoadingChat] = useState(true);
  const [matchingData, setmatchingData] = useState([]);
  const [matchingDataAvt, setmatchingDataAvt] = useState([]);
  const [matchingDataMess, setmatchingDataMess] = useState([]);
  const [matchingDataMessage, setmatchingDataMessage] = useState([]);
  const [dataMessTemp, setmessTemp] = useState([]);

  const chatRow = (uri) => {
    const realtime = getDatabase();
    get(ref(realtime, `chatrooms/${uri}`))
      .then((snapshot) => {
        const data = snapshot.val();
        const datauser =
          data.firstUser._id === user.uid ? data.secondUser : data.firstUser;
        datauser.chatRoomid = uri;
        datauser.lastUpdate = data.lastUpdate;
        setmatchingDataMess((prev) => [...prev, datauser]);
        setmatchingDataMessage((prev) => [...prev, datauser]);
      })
      .catch((error) => {
        console.error();
      });
  };

  // useEffect(() => {
  //   if (matchingDataMess.length > 1) {
  //     const arrSort = matchingDataMess;
  //     arrSort.sort((a, b) => b.lastUpdate - a.lastUpdate);
  //     setmatchingDataMess(arrSort);
  //     setmatchingDataMessage(arrSort);
  //   }
  // }, [matchingDataMess]);

  useEffect(() => {
    const fetchMatch = async () => {
      const promise = matchData.reverse().map(async (data) => {
        if (data) {
          if (data !== user.uid) {
            setmatchingData([]);
            setmatchingDataAvt([]);
            const snap = await getDoc(doc(db, "userDatas", data));
            console.log(snap.data());
            setmatchingData((prev) => [...prev, snap.data()]);
            setmatchingDataAvt((prev) => [...prev, snap.data()]);
          } else {
            setmatchingData([]);
            setmatchingDataAvt([]);
          }
        }
      });
      await Promise.all(promise);
    };
    fetchMatch();
    setLoadingMatch(false);
  }, [matchData]);

  useEffect(() => {
    const fetchChatrow = async () => {
      setmatchingDataMess([]);
      setmatchingDataMessage([]);
      const prom = chatrooms.map((data) => {
        chatRow(data);
      });
      await Promise.all(prom);
      setLoadingChat(false);
    };
    fetchChatrow();
  }, [chatrooms]);

  const AvtItem = ({ title }) => {
    return (
      <View>
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
                style={[tw`font-bold`, { fontSize: 13 / fontScale }]}
                numberOfLines={1}
                ellipsizeMode={"tail"}
              >
                {title.userName}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const MessItem = ({ data }) => {
    const [chatData, setchatData] = useState([]);
    const [loading, setloading] = useState(true);
    const roomId = data.chatRoomid;
    useEffect(() => {
      let isActive = true;
      const db = getDatabase();
      const starCountRefdata = ref(db, `chatrooms/${roomId}`);
      onValue(starCountRefdata, (snapshot) => {
        setloading(true);
        const datas = snapshot.val();
        const data = snapshot.val().messages;
        console.log(typeof data);
        if (isActive) {
          setchatData(data);
          // setmessTemp(
          //   [...dataMessTemp].map((object) => {
          //     if ((object.chatRoomid = roomId)) {
          //       return {
          //         ...object,
          //         lastUpdate: datas.lastUpdate,
          //       };
          //     }
          //   })
          // );
          setloading(false);
        }
      });
      return () => (isActive = false);
    }, []);
    return (
      <TouchableOpacity
        style={{ marginBottom: 15 }}
        onPress={() =>
          navigation.navigate("Chat", {
            matchId: data._id,
            chatroomsId: data.chatRoomid,
            image: data._image,
            name: data._name,
          })
        }
      >
        {loading ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <View style={[styles.messItem, {}]}>
            <Image
              resizeMode="cover"
              style={[
                tw`self-center rounded-full`,
                { width: width * 0.17, height: width * 0.17 },
              ]}
              source={{ uri: data._image }}
            />
            <View
              style={[tw`ml-2 flex-1 justify-evenly  border-b`, styles.aloalo]}
            >
              <Text style={[tw` font-bold`, { fontSize: 15 / fontScale }]}>
                {data._name}
              </Text>
              {chatData[chatData.length - 1].user._id === user.uid ? (
                <Text
                  style={[
                    tw``,
                    {
                      color: "rgba(0, 0, 0, 0.7)",
                      fontSize: 13 / fontScale,
                    },
                  ]}
                >
                  You: {chatData[chatData.length - 1].text}
                </Text>
              ) : (
                <Text
                  style={[
                    chatData[chatData.length - 1]._seen
                      ? { color: "rgba(0,0,0,0.7)" }
                      : {
                          color: "rgba(0,0,0,1)",
                          fontWeight: "bold",
                        },
                    { fontSize: 13 / fontScale },
                  ]}
                >
                  {chatData[chatData.length - 1].text}
                </Text>
              )}
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const setArray = (ar) => {
    if (ar.length > 0) {
      ar.sort(function (a, b) {
        return new Date(b.lastUpdate) - new Date(a.lastUpdate);
      });
    }
    return ar;
  };

  const [text, setText] = useState("");
  const handleSearch = (text) => {
    if (text) {
      const newData = matchingDataMess.filter(function (item) {
        const itemData = item._name
          ? item._name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      const newDataAvt = matchingData.reverse().filter(function (item) {
        const itemDataAvt = item.userName
          ? item.userName.toUpperCase()
          : "".toUpperCase();
        const textDataAvt = text.toUpperCase();
        return itemDataAvt.indexOf(textDataAvt) > -1;
      });

      setmatchingData(newDataAvt);
      setmatchingDataMess(newData);
      setText(text);
    } else {
      setmatchingData(matchingDataAvt);
      setmatchingDataMess(matchingDataMessage);
      setText(text);
    }
  };

  const renderItem = ({ item }) => <AvtItem title={item} />;

  return (
    <SafeAreaView style={styles.container}>
      {loadingMatch && loadingChat ? (
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
                  tw` self-center `,
                  {
                    height: height * 0.04,
                    width: height * 0.04,
                    borderRadius: 20,
                  },
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
          {/* <View style={tw` flex-row`}>
            <FontAwesome
              name="search"
              color={"pink"}
              size={PixelRatio.getPixelSizeForLayoutSize(11)}
              style={tw`p-2 pl-4 pr-4`}
            />
            <TextInput
              onChangeText={(setText) => handleSearch(setText)}
              style={[
                styles.searchInput,
                tw`w-full pr-4`,
                { fontSize: 15 / fontScale },
              ]}
              placeholder="Type a message to search"
              autoComplete={false}
              clearButtonMode="always"
            />
          </View> */}
          <View style={styles.ScrollViewContainer}>
            <ScrollView
              style={styles.ScrollViewContainer}
              showsVerticalScrollIndicator={false}
            >
              <Text style={[tw`font-bold pb-2`, { fontSize: 15 / fontScale }]}>
                Tương hợp
              </Text>
              <FlatList
                data={matchingData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
              <Text
                style={[tw`font-bold pt-2 pb-4`, { fontSize: 15 / fontScale }]}
              >
                Tin nhắn
              </Text>
              <View>
                <FlatList
                  data={setArray(matchingDataMess)}
                  renderItem={({ item }) => <MessItem data={item} />}
                  keyExtractor={(item) => item._id}
                ></FlatList>
              </View>
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
    borderRadius: 20,
  },
  messItem: {
    flexDirection: "row",
    flex: 1,
  },
  aloalo: {
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  textBold: {
    color: "red",
  },
});

export default Message;
