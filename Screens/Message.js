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

const Message = () => {
  const { width, height } = useWindowDimensions();
  const { user, Logout, userData } = Auth();
  const { loading, setLoading } = useState(true);
  const { dataFetch, dataset } = useState();
  let Matchdata = [];

  // useEffect(() => {
  //   () => dataset(Matchdata);
  //   () => setLoading(false);
  // }, [Matchdata]);

  const AvtItem = ({ title }) => {
    const [matchData, setmatchData] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      async function fetchUser() {
        const snap = await getDoc(doc(db, "userDatas", title));
        setmatchData(snap.data());
        setLoading(false);
      }
      fetchUser();
    }, [Matchdata]);
    return (
      <TouchableOpacity>
        {loading ? (
          <Text>Loading</Text>
        ) : (
          <View style={styles.listItem}>
            <Image
              resizeMode="stretch"
              style={[
                tw``,
                styles.matchAvt,
                { width: width * 0.18, height: (width * 0.19 * 4) / 3 },
              ]}
              source={{ uri: matchData.image[0] }}
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
                {matchData.userName}
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // const MessItem = ({ title, message }) => (
  //   <TouchableOpacity style={{ marginBottom: 15 }}>
  //     <View style={[styles.messItem, {}]}>
  //       <Image
  //         resizeMode="cover"
  //         style={[
  //           tw`self-center rounded-full`,
  //           { width: width * 0.17, height: width * 0.17 },
  //         ]}
  //         source={require("../rose.jpg")}
  //       />
  //       <View style={[tw`ml-2 flex-1 justify-evenly  border-b`, styles.aloalo]}>
  //         <Text style={tw` font-bold text-base`}>{title}</Text>
  //         <Text style={[tw``, { color: "rgba(0, 0, 0, 0.7)" }]}>{message}</Text>
  //       </View>
  //     </View>
  //   </TouchableOpacity>
  // );

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
      const newData = dataOriginal.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
      setDataa(newData);
      setText(text);
    } else {
      setData(dataOriginal);
      setDataa(dataOriginall);
      setText(text);
    }
  };
  const renderItem = ({ item }) => <AvtItem title={item} />;

  const realtime = getDatabase();
  const starCountRef = ref(realtime, `${user.uid}/match`);
  console.log(starCountRef);
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    Matchdata = data;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={tw`h-14 flex-row justify-center items-center relative bg-white`}
      >
        <Pressable
          style={tw`absolute left-6 h-11 w-11 justify-center self-center`}
        >
          <Image
            resizeMode="cover"
            source={{ uri: "" + userData.image[0] }}
            style={[tw`w-9 h-9 rounded-full self-center `, styles.profileImage]}
          />
        </Pressable>
        <Image
          resizeMode="contain"
          style={tw`h-full w-20 self-center`}
          source={require("../Tinder-Logo.png")}
        />
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
        <ScrollView style={styles.ScrollViewContainer}>
          <Text style={tw`font-bold`}>Tương hợp</Text>
          <View style={styles.listContain}>
            {Matchdata.map((item, index) => (
              <View key={index}>
                <AvtItem title={item} />
              </View>
            ))}
          </View>
          {/* <Text style={tw`font-bold pt-2 pb-4`}>Tin nhắn</Text>
          {dataa.map((item, index) => (
            <View key={index}>
              <MessItem title={item.title} message={item.message} />
            </View>
          ))} */}
        </ScrollView>
      </View>
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
