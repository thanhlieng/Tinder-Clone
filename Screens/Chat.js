import React, { useState, useCallback, useEffect } from "react";
import {
  GiftedChat,
  IMessage,
  User,
  Bubble,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  ActivityIndicator,
  ToastAndroid,
  AlertIOS,
  useWindowDimensions,
  PixelRatio,
} from "react-native";
import * as Linking from "expo-linking";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../ggAuth/firebase-con";
import Auth from "../ggAuth/Auth";
import {
  getDatabase,
  ref,
  onValue,
  update,
  get,
  child,
  push,
  serverTimestamp,
  off,
} from "firebase/database";
import Feather from "react-native-vector-icons/Feather";

export default function Chat({ route, navigation }) {
  const { matchId, chatroomsId, image, name } = route.params;
  const { user, Logout, userData, likedData } = Auth();
  const [roomId, setroomId] = useState(chatroomsId);
  const { fontScale, width } = useWindowDimensions();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <Image
            source={{ uri: image }}
            style={{
              height: width * 0.13,
              width: width * 0.13,
              borderRadius: 9999,
            }}
          />
          <Text
            style={{
              fontSize: 12 / fontScale,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {name}
          </Text>
        </View>
      ),
    });
  }, [navigation]);

  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   //load old messages
  //   const loadData = async () => {
  //     const myChatroom = await fetchMessages();

  //     setMessages(renderMessages(myChatroom.messages));
  //   };

  //   loadData();

  //   // set chatroom change listener
  //   const database = getDatabase();
  //   const chatroomRef = ref(database, `chatrooms/${chatroomsId}`);
  //   onValue(chatroomRef, snapshot => {
  //     const data = snapshot.val();
  //     setMessages(renderMessages(data.messages));
  //   });

  //   return () => {
  //     //remove chatroom listener
  //     off(chatroomRef);
  //   };
  // }, []);

  // const fetchMessages = useCallback(async () => {
  //   const database = getDatabase();

  //   const snapshot = await get(
  //     ref(database, `chatrooms/${chatroomsId}`),
  //   );

  //   return snapshot.val();
  // }, []);

  if (chatroomsId) {
    useEffect(() => {
      const database = getDatabase();
      //load old messages
      const loadData = async () => {
        const snap = await get(
          ref(database, `chatrooms/${chatroomsId}/messages`)
        );
        const dataMess = snap.val();
        if (dataMess[dataMess.length - 1].user._id !== user.uid) {
          dataMess[dataMess.length - 1]._seen = true;
        }
        update(ref(database, `chatrooms/${roomId}`), {
          messages: dataMess,
        });
        setMessages(dataMess.reverse());
      };

      loadData();
      const chatroomRef = ref(database, `chatrooms/${chatroomsId}`);
      onValue(chatroomRef, (snapshot) => {
        const data = snapshot.val();
        setMessages(data.messages.reverse());
      });

      return () => {
        //remove chatroom listener
        off(chatroomRef);
      };
    }, [chatroomsId]);
  }

  const handleUrlPress = (url, matchIndex /*: number*/) => {
    // Linking.openURL(url);
  };

  const handlePhonePress = (number, matchIndex /*: number*/) => {};

  const onSendOld = useCallback(async (messages = []) => {
    const database = getDatabase();
    console.log(messages);
    messages[0]._seen = false;
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const snapshot = await get(ref(database, `chatrooms/${roomId}`));
    const oldMessage = snapshot.val().messages;
    update(ref(database, `chatrooms/${roomId}`), {
      messages: [...oldMessage, messages[0]],
      lastUpdate: serverTimestamp(),
    });
  });

  const onSendNew = useCallback(async (messages = []) => {
    const database = getDatabase();
    messages[0].createdAt = new Date();
    get(ref(database, `${user.uid}/match`))
      .then((snapshot) => {
        const userArray = snapshot.val();
        const newArray = userArray.filter((user) => user !== matchId);
        update(ref(database, `${user.uid}`), {
          match: newArray,
        });
      })
      .catch((error) => {
        console.error(error);
      });
    get(ref(database, `${matchId}/match`))
      .then((snapshot) => {
        const userArray = snapshot.val();
        const newArray = userArray.filter((users) => users !== user.uid);
        update(ref(database, `${matchId}`), {
          match: newArray,
        });
      })
      .catch((error) => {
        console.error(error);
      });
    messages[0]._seen = false;
    const newChatroomRef = push(ref(database, "chatrooms"), {
      firstUser: {
        _id: userData.id,
        _name: userData.userName,
        _image: userData.image[0],
      },
      secondUser: { _id: matchId, _name: name, _image: image },
      messages: messages,
      lastUpdate: serverTimestamp(),
    });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    get(ref(database, `${matchId}/chatrooms`))
      .then((snapshot) => {
        const chatRoomId = snapshot.val() || [];
        update(ref(database, `${matchId}`), {
          chatrooms: [...chatRoomId, newChatroomRef.key],
        });
      })
      .catch((error) => {
        console.error(error);
      });
    get(ref(database, `${user.uid}/chatrooms`))
      .then((snapshot) => {
        const chatRoomId = snapshot.val() || [];
        update(ref(database, `${user.uid}`), {
          chatrooms: [...chatRoomId, newChatroomRef.key],
        });
      })
      .catch((error) => {
        console.error(error);
      });
    setroomId(newChatroomRef.key);
  });

  const renderInputToolbar = (props) => {
    return <InputToolbar {...props} containerStyle={styles.inputToolbar} />;
  };

  const renderSend = (props) => {
    return (
      <Send
        {...props}
        containerStyle={{
          justifyContent: "center",
          marginHorizontal: "5%",
        }}
      >
        <Feather
          name="arrow-right-circle"
          size={PixelRatio.getPixelSizeForLayoutSize(10)}
          color="#3A97F9"
        />
      </Send>
    );
  };

  const renderchatEmpty = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text
          style={{
            transform: [{ rotateX: "180deg" }],
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {chatroomsId
            ? "Loading your messages data....!"
            : "Send your first message....!"}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <GiftedChat
        messages={messages}
        onSend={(messages) => {
          roomId ? onSendOld(messages) : onSendNew(messages);
        }}
        user={{
          _id: user.uid,
        }}
        renderAvatar={null}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        renderChatEmpty={renderchatEmpty}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              textStyle={{
                left: {
                  color: "white",
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: "#FF63ED",
                },
              }}
            />
          );
        }}
        parsePatterns={() => [
          { type: "url", style: styles.url, onPress: handleUrlPress },
          { type: "phone", style: styles.phone, onPress: handlePhonePress },
          { type: "email", style: styles.email, onPress: handleUrlPress },
        ]}
        listViewProps={{
          marginBottom: 15,
          backgroundColor: "white",
        }}
        textInputProps={{
          backgroundColor: "white",
          justifyContent: "center",
        }}
        textInputStyle={{
          borderWidth: 0,
          borderRadius: 10,
          marginTop: 2,
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  url: {
    color: "rgba(255, 255, 255, 1)",
    textDecorationStyle: "solid",
    textDecorationColor: "white",
    textDecorationLine: "underline",
  },
  phone: {
    color: "rgba(255, 255, 255, 1)",
    textDecorationStyle: "solid",
    textDecorationColor: "white",
    textDecorationLine: "underline",
  },
  inputToolbar: {
    marginHorizontal: "5%",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.4)",
    marginBottom: 5,
    backgroundColor: "white",
  },
});
