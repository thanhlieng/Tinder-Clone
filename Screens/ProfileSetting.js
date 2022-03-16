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
} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import AntDesign from "react-native-vector-icons/AntDesign";
import CircleCheckBox, { LABEL_POSITION } from "react-native-circle-checkbox";

const UserImage = ({ uri }) => (
  <View style={tw`mb-1`}>
    <Pressable style={tw`p-2 justify-end`}>
      {uri ? (
        <>
          <ImageBackground
            resizeMode="cover"
            style={[tw``, styles.LikedImage]}
            source={require("../rose.jpg")}
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

const ProfileSetting = () => {
  const [textName, settextName] = useState("");
  const [nameError, setnameError] = useState();
  const [textDescription, settextDescription] = useState();
  const [sexCheck, setsexCheck] = useState(false);

  const [pickerselectedValue, setpickerSelectedValue] = useState("");

  const fullYear = new Date();
  const picker = [];
  for (
    let i = fullYear.getFullYear() - 16;
    i > fullYear.getFullYear() - 16 - 34;
    i--
  ) {
    picker.push(i);
  }

  const [data, setData] = useState([
    { id: "1", uri: "First" },
    { id: "2", uri: "Second" },
    { id: "3", uri: "Third" },
    { id: "4", uri: "" },
    { id: "5", uri: "" },
    { id: "6", uri: "" },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={[styles.imageContain, tw``]}>
          {data.map((item, index) => (
            <View key={index}>
              <UserImage uri={item.uri} />
            </View>
          ))}
        </View>
        <View style={tw`bg-white m-2 mt-4 rounded-md`}>
          <Text style={styles.textProfile}>Tên của bạn</Text>
          <TextInput
            autoCapitalize={"words"}
            clearButtonMode={"while-editing"}
            keyboardType={"default"}
            placeholder="Nhập tên của bạn..."
            value={textName}
            onChangeText={(newText) => settextName(newText)}
            onPressOut={() => setnameError()}
            style={[tw`rounded-2xl border p-2 mr-5 ml-5`, styles.textInput]}
          ></TextInput>
          <>
            <Text style={[styles.textProfile]}>Giới tính</Text>
            <CircleCheckBox
              checked={!sexCheck}
              outerColor={"#E0DDDC"}
              onToggle={() => setsexCheck(!sexCheck)}
              labelPosition={LABEL_POSITION.RIGHT}
              label="Nam"
              outerSize={23}
              filterSize={19}
              innerSize={15}
              innerColor={"#FF0073"}
              styleCheckboxContainer={tw`ml-5 mb-2`}
            />
            <CircleCheckBox
              checked={sexCheck}
              outerColor={"#E0DDDC"}
              onToggle={() => setsexCheck(!sexCheck)}
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
            selectedValue={pickerselectedValue}
            style={[{ height: 50, width: "80%" }, tw`ml-5`]}
            onValueChange={(itemValue, itemIndex) =>
              setpickerSelectedValue(itemValue)
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
            placeholder="Mô tả bản thân"
            value={textName}
            onChangeText={(newText) => settextName(newText)}
            onPressOut={() => setnameError()}
            style={[tw`rounded-2xl border p-2 mr-5 ml-5`, styles.textInput]}
          />
          <Pressable style={tw`items-center mb-3 mt-6 ml-32 mr-32`}>
            <AntDesign
              name="checkcircleo"
              color="rgba(0,255,0,0.8)"
              size={55}
            />
          </Pressable>
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
