import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  TextInput,
  Picker,
  Image,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import CircleCheckBox, { LABEL_POSITION } from "react-native-circle-checkbox";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { db } from "../ggAuth/firebase-con";
import { setDoc, doc, serverTimestamp, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Auth from "../ggAuth/Auth";
import { useNavigation } from "@react-navigation/core";
import { nanoid } from "nanoid";
import "react-native-get-random-values";

const fullYear = new Date();
const picker = [];
for (
  let i = fullYear.getFullYear() - 16;
  i > fullYear.getFullYear() - 16 - 34;
  i--
) {
  picker.push(i);
}

const ModalProfile = () => {
  const { user, SigninGoogle1, setUserData, userData, setData } = Auth();
  // const [userData, setData] = Auth();

  const [textout, setTextout] = useState("1232132112");

  //Modal nhap thông tin
  const [modalNameVisible, setModalVisible] = useState(true);
  const [textName, settextName] = useState("");
  const [nameError, setnameError] = useState();
  const [textDescription, settextDescription] = useState();
  const [sexCheck, setsexCheck] = useState(false);

  //Modal thêm ảnh
  const [modalImageVisible, setModalImageVisible] = useState(false);
  const [pickerselectedValue, setpickerSelectedValue] = useState(2006);
  const [imageUri, setImage] = useState();
  const [dataAfter, setAfter] = useState();
  const [okeModal, setOkmodal] = useState(false);

  const navigation = useNavigation();

  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    const storage = getStorage();
    const fileName = nanoid();
    const imageRef = ref(storage, `${user.uid}/images/${fileName}.jpeg`);
    const snapshot = await uploadBytes(imageRef, blob, {
      contentType: "image/jpeg",
    });

    // We're done with the blob, close and release it
    blob.close();

    const url = await getDownloadURL(snapshot.ref);

    return url;
  }

  function addUserdata(uri) {
    setDoc(doc(db, "userDatas", user.uid), {
      id: user.uid,
      userName: textName,
      sex: !sexCheck,
      birthYear: pickerselectedValue,
      description: textDescription,
      image: [uri],
      timestamp: serverTimestamp(),
    })
      .then(() => {
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function uploaduserData() {
    const uri = await uploadImageAsync(imageUri);
    addUserdata(uri);
    const snap = await getDoc(doc(db, "userDatas", user.uid));
    setAfter(snap.data());
    setOkmodal(true);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: "https://tinder.com/static/tinder.png" }}
        resizeMode="cover"
        style={tw`flex-1`}
      >
        <Text
          style={[
            tw`text-white text-2xl font-semibold`,
            { marginVertical: "12%", alignSelf: "center" },
          ]}
        >
          {textout}
        </Text>
        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalNameVisible}
            onShow={() => setTextout("Thông tin hiện thị của bạn")}
            onRequestClose={() => {
              setModalVisible(!modalNameVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Tên của bạn</Text>
                <TextInput
                  autoCapitalize={"words"}
                  clearButtonMode={"while-editing"}
                  keyboardType={"default"}
                  placeholder="Nhập tên của bạn..."
                  value={textName}
                  onChangeText={(newText) => settextName(newText)}
                  onPressOut={() => setnameError()}
                  style={[
                    tw`rounded-full border p-2 mr-5 ml-5`,
                    styles.textInput,
                    { borderColor: nameError ? "#FF0000" : "rgba(0,0,0,0.1)" },
                  ]}
                ></TextInput>
                <Text style={[styles.modalText]}>Giới tính</Text>
                <View style={tw`flex-row ml-5 mr-5 justify-around`}>
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
                  />
                  <CircleCheckBox
                    checked={sexCheck}
                    outerColor={"#E0DDDC"}
                    onToggle={() => setsexCheck(!sexCheck)}
                    labelPosition={LABEL_POSITION.RIGHT}
                    label="Nu"
                    outerSize={23}
                    filterSize={19}
                    innerSize={15}
                    innerColor={"#FF0073"}
                  />
                </View>
                <View style={tw`flex-row ml-5 mr-5 justify-between`}>
                  <Text style={tw`mt-5 ml-2.5 italic font-bold text-base`}>
                    Năm sinh
                  </Text>
                  <Picker
                    selectedValue={pickerselectedValue}
                    style={{ height: 60, width: 110 }}
                    onValueChange={(itemValue, itemIndex) =>
                      setpickerSelectedValue(itemValue)
                    }
                  >
                    {picker.map((item, index) => (
                      <Picker.Item key={index} label={"" + item} value={item} />
                    ))}
                  </Picker>
                </View>
                <Text style={[styles.modalText]}>Mô tả</Text>
                <TextInput
                  multiline
                  numberOfLines={6}
                  textAlignVertical={"top"}
                  clearButtonMode={"while-editing"}
                  keyboardType={"default"}
                  placeholder="Mô tả bản thân...."
                  autoGrow={false}
                  value={textDescription}
                  onChangeText={(newText) => settextDescription(newText)}
                  style={[
                    tw`rounded-xl border p-2 mr-5 ml-5 mb-5`,
                    styles.textInput,
                  ]}
                ></TextInput>
                <Pressable
                  style={tw`items-center mb-3 mt-3 ml-32 mr-32`}
                  onPress={() => {
                    if (textName.trim() === "") {
                      setnameError("Name is required");
                    } else {
                      setModalVisible(!modalNameVisible);
                      setModalImageVisible(!modalImageVisible);
                    }
                  }}
                >
                  <SimpleLineIcons
                    name="arrow-right-circle"
                    color="gray"
                    size={55}
                  />
                </Pressable>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="fade"
            transparent={true}
            onShow={() => setTextout("Thêm bức ảnh đầu tiên")}
            visible={modalImageVisible}
            onRequestClose={() => {
              setModalImageVisible(!modalImageVisible);
            }}
          >
            <View style={[styles.centeredView, tw`items-center`]}>
              <View style={styles.modalView}>
                <Text style={tw`text-center mt-4 ml-3 mr-3 italic text-base`}>
                  {imageUri
                    ? "Chúc mừng bạn đã chọn được bức ảnh ưng ý ♥♥♥"
                    : "Hãy cùng thêm bức ảnh đầu tiên để mọi người có thể thấy được bạn nhé!"}
                </Text>
                <Pressable
                  style={[
                    tw`bg-gray-300 items-center mr-5 ml-5 mt-4 mb-8`,
                    { paddingVertical: imageUri ? 0 : 144 },
                  ]}
                  onPress={pickImage}
                >
                  {imageUri ? (
                    <>
                      <View style={tw`items-center content-center`}>
                        <Image
                          resizeMode="stretch"
                          style={[tw``, styles.imageChosen]}
                          source={{ uri: imageUri }}
                        />
                      </View>
                    </>
                  ) : (
                    <>
                      <FontAwesome name="plus-circle" size={50} color="gray" />
                    </>
                  )}
                </Pressable>
                <View style={tw`justify-around mb-3 mt-2 flex-row`}>
                  <Pressable
                    onPress={() => {
                      uploaduserData();
                    }}
                  >
                    <SimpleLineIcons
                      name="arrow-left-circle"
                      color="gray"
                      size={55}
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      [
                        setModalVisible(!modalNameVisible),
                        setModalImageVisible(!modalImageVisible),
                      ];
                    }}
                  >
                    <SimpleLineIcons
                      name="arrow-right-circle"
                      color="gray"
                      size={55}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="fade"
            transparent={true}
            visible={okeModal}
            onRequestClose={() => {
              setOkmodal(!okeModal);
            }}
          >
            <View
              style={[
                styles.centeredView,
                tw`items-center`,
                { backgroundColor: "rgba(0,0,0,0.5)" },
              ]}
            >
              <View
                style={[
                  tw`justify-center bg-white items-center space-around`,
                  {
                    marginHorizontal: "5%",
                    paddingVertical: "5%",
                    paddingHorizontal: "5%",
                  },
                ]}
              >
                <Text style={tw`border-b w-fit mb-2`}>
                  Chung mung ban da thiet lap xong ho so
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setUserData(dataAfter);
                  }}
                  style={[tw`w-full`, { width: "100%" }]}
                >
                  <Text style={{ color: "red" }}>Ok!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 10,
    marginHorizontal: "10%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 6,
    textAlign: "left",
    marginTop: 20,
    marginLeft: 30,
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 16,
  },
  imageChosen: {
    width: 270,
    height: 360,
  },
  textInput: {
    borderColor: "rgba(0,0,0,0.1)",
    paddingLeft: 20,
  },
});

export default ModalProfile;
