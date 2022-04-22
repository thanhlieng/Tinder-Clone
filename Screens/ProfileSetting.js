import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  Pressable,
  Picker,
  TextInput,
  ScrollView,
  LogBox,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
LogBox.ignoreAllLogs();
import React, { useState, useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import AntDesign from "react-native-vector-icons/AntDesign";
import CircleCheckBox, { LABEL_POSITION } from "react-native-circle-checkbox";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../ggAuth/firebase-con";
import Auth from "../ggAuth/Auth";
import { useAsyncEffect } from "use-async-effect";

const fullYear = new Date();
const picker = [];
for (
  let i = fullYear.getFullYear() - 16;
  i > fullYear.getFullYear() - 16 - 34;
  i--
) {
  picker.push(i);
}

const UserImage = ({ Imageuri }) => (
  <View style={tw`mb-1`}>
    <Pressable style={tw`p-2 justify-end`}>
      {Imageuri ? (
        <>
          <ImageBackground
            resizeMode="cover"
            style={[tw`bg-green-500`, styles.LikedImage]}
            source={{
              uri: "" + Imageuri,
            }}
          ></ImageBackground>
          <AntDesign
            name="closecircle"
            size={20}
            color={"rgba(255,0,0,0.5)"}
            style={tw`self-end absolute bg-white rounded-full`}
          />
        </>
      ) : (
        <>
          <View
            style={[
              tw`border border-gray-500`,
              styles.LikedImage,
              { backgroundColor: "#E9E4E4" },
            ]}
          ></View>
          <AntDesign
            name="pluscircle"
            size={20}
            color={"rgba(255,0,0,0.5)"}
            style={tw`self-end absolute bg-white rounded-full`}
          />
        </>
      )}
    </Pressable>
  </View>
);

function renderEmpty(a) {
  var array = [];
  for (let i = a + 1; i <= 6; i++) {
    array.push("");
  }
  return array.map((item, index) => (
    <View key={index}>
      <UserImage Imageuri={item[index]} />
    </View>
  ));
}

const ProfileSetting = () => {
  const { user, userData, setUserData } = Auth();
  const [datas, setDatas] = useState(userData);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState(userData.image);

  // useEffect(() => {
  //   async function fetchUser() {
  //     const snap = await getDoc(doc(db, "userDatas", user.uid));
  //     setDatas(snap.data());
  //     setImages(datas.image);
  //   }
  //   fetchUser();
  //   return () => {
  //     setLoading(false);
  //     setImages(datas.image);
  //   };
  // });

  const updateUserdata = () => {
    setDoc(doc(db, "userDatas", user.uid), datas, { merge: true })
      .then(() => {
        console.log("success");
      })
      .catch((err) => {
        console.log("error");
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {!images ? (
          <ActivityIndicator />
        ) : (
          <View style={[styles.imageContain, tw``]}>
            {datas.image.map((item, index) => (
              <View key={index}>
                <UserImage Imageuri={item} />
              </View>
            ))}
            {/* {images.length < 6 ? renderEmpty(images.length) : {}} */}
          </View>
        )}

        <View style={tw`bg-white m-2 mt-4 rounded-md`}>
          <Text style={styles.textProfile}>Tên của bạn</Text>
          <TextInput
            autoCapitalize={"words"}
            clearButtonMode={"while-editing"}
            keyboardType={"default"}
            value={datas.userName}
            onChangeText={(newText) =>
              setDatas((prevState) => ({
                ...prevState,
                userName: newText,
              }))
            }
            style={[tw`rounded-2xl border p-2 mr-5 ml-5`, styles.textInput]}
          ></TextInput>
          <>
            <Text style={[styles.textProfile]}>Giới tính</Text>
            <CircleCheckBox
              checked={datas.sex}
              outerColor={"#E0DDDC"}
              onToggle={() =>
                setDatas((prevState) => ({
                  ...prevState,
                  sex: !datas.sex,
                }))
              }
              labelPosition={LABEL_POSITION.RIGHT}
              label="Nam"
              outerSize={23}
              filterSize={19}
              innerSize={15}
              innerColor={"#FF0073"}
              styleCheckboxContainer={tw`ml-5 mb-2`}
            />
            <CircleCheckBox
              checked={!datas.sex}
              outerColor={"#E0DDDC"}
              onToggle={() =>
                setDatas((prevState) => ({
                  ...prevState,
                  sex: !datas.sex,
                }))
              }
              labelPosition={LABEL_POSITION.RIGHT}
              label="Nữ"
              outerSize={23}
              filterSize={19}
              innerSize={15}
              innerColor={"#FF0073"}
              styleCheckboxContainer={tw`ml-5`}
            />
          </>
          <Text style={[styles.textProfile]}>Năm sinh</Text>
          <Picker
            selectedValue={datas.birthYear}
            style={[{ height: 50, width: "90%" }, tw`ml-5`]}
            onValueChange={(itemValue, itemIndex) =>
              setDatas((prevState) => ({
                ...prevState,
                birthYear: itemValue,
              }))
            }
          >
            {picker.map((item, index) => (
              <Picker.Item key={index} label={"" + item} value={item} />
            ))}
          </Picker>
          <Text style={[styles.textProfile]}>Mô tả</Text>
          <TextInput
            multiline={true}
            numberOfLines={6}
            textAlignVertical={"top"}
            clearButtonMode={"while-editing"}
            keyboardType={"default"}
            value={datas.description}
            onChangeText={(newText) =>
              setDatas((prevState) => ({
                ...prevState,
                description: newText,
              }))
            }
            style={[tw`rounded-2xl border p-2 mr-5 ml-5`, styles.textInput]}
          />
          <TouchableOpacity
            style={tw`items-center mb-3 mt-6 ml-32 mr-32`}
            onPress={() => {
              updateUserdata(), setUserData(datas);
            }}
          >
            <AntDesign
              name="checkcircleo"
              color="rgba(0,255,0,0.8)"
              size={55}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  imageContain: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    borderRadius: 10,
    backgroundColor: "white",
  },
  LikedImage: {
    width: 100,
    height: 140,
    overflow: "hidden",
    borderRadius: 8,
  },
  textProfile: {
    color: "#FF1212",
    fontWeight: "bold",
    fontSize: 17,
    marginVertical: 10,
    marginLeft: 15,
  },
  textInput: {
    borderColor: "rgba(0,0,0,0.4)",
    paddingLeft: 20,
  },
});

export default ProfileSetting;
