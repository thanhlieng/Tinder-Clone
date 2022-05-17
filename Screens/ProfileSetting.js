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
  useWindowDimensions,
  TouchableWithoutFeedback,
  PixelRatio,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  ToastAndroid,
  Ale,
} from "react-native";
LogBox.ignoreAllLogs();
import React, { useState, useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import AntDesign from "react-native-vector-icons/AntDesign";
import CircleCheckBox, { LABEL_POSITION } from "react-native-circle-checkbox";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../ggAuth/firebase-con";
import Auth from "../ggAuth/Auth";
import * as ImagePicker from "expo-image-picker";
import { useAsyncEffect } from "use-async-effect";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { nanoid } from "nanoid";
import RNPickerSelect from "react-native-picker-select";

const fullYear = new Date();
const picker = [];
for (
  let i = fullYear.getFullYear() - 16;
  i > fullYear.getFullYear() - 16 - 34;
  i--
) {
  const ob = { label: "" + i, value: i };
  picker.push(ob);
}
const ProfileSetting = () => {
  const { user, userData, setUserData } = Auth();
  const [loading, setLoading] = useState(false);
  const [datas, setDatas] = useState(userData);
  const [images, setImages] = useState(userData.image);
  const [uploadedUri, setuploaded] = useState([]);
  const { height, width, fontScale } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);

  const pickImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
      exif: true,
      base64: true,
    });

    if (!result.cancelled) {
      return result.uri;
    } else return null;
  };

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
    const imageRef = storageRef(storage, `${user.uid}/images/${fileName}.jpeg`);
    const snapshot = await uploadBytes(imageRef, blob, {
      contentType: "image/jpeg",
    });

    // We're done with the blob, close and release it
    blob.close();

    const url = await getDownloadURL(snapshot.ref);

    return url;
  }

  function UpdateUserdata(uri) {
    updateDoc(doc(db, "userDatas", user.uid), {
      image: [...images, uri],
      timestamp: serverTimestamp(),
    })
      .then(() => {
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const deleteImage = async (uri) => {
    setLoading(true);
    console.log(uri);
    await images.splice(images.indexOf(uri), 1);
    setImages(images);
    setLoading(false);
  };

  const addImage = async () => {
    setLoading(true);
    const uri = await pickImage();
    if (uri) {
      setImages([...images, uri]);
    }
    setLoading(false);
  };

  const UserImage = ({ Imageuri }) => (
    <View style={tw`mb-2`}>
      {Imageuri ? (
        <>
          <Pressable
            style={tw`justify-end`}
            onPress={images.length > 1 ? () => deleteImage(Imageuri) : null}
          >
            <ImageBackground
              resizeMode="cover"
              style={[
                tw`bg-green-500`,
                { width: width * 0.3, height: width * 0.4 },
                styles.LikedImage,
              ]}
              source={{
                uri: "" + Imageuri,
              }}
            ></ImageBackground>
            <AntDesign
              name="closecircle"
              size={PixelRatio.getPixelSizeForLayoutSize(9)}
              color={"rgba(255,0,0,0.5)"}
              style={tw`top-0 right-0  absolute bg-white rounded-full`}
            />
          </Pressable>
        </>
      ) : (
        <>
          <Pressable
            style={[
              tw`border border-gray-500 justify-end`,
              styles.LikedImage,
              { width: width * 0.3, height: width * 0.4 },
              styles.LikedImage,
            ]}
            onPress={() => addImage()}
          >
            <AntDesign
              name="pluscircle"
              size={PixelRatio.getPixelSizeForLayoutSize(9)}
              color={"rgba(255,0,0,0.5)"}
              style={tw`top-0 right-0 absolute bg-white rounded-full`}
            />
          </Pressable>
        </>
      )}
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

  async function dataImageControl() {
    setuploaded([]);
    const storage = getStorage();
    let A = images;
    let B = userData.image;
    let C = B.filter((n) => !A.includes(n));
    let D = B.filter((n) => A.includes(n));
    let uris = D;
    A = A.filter((n) => !B.includes(n));
    console.log(A);
    const prom = A.map(async (data) => {
      const uri = await uploadImageAsync(data);
      uris.push(uri);
    });

    await Promise.all(prom);

    C.map((data) => {
      const name = getName(data);
      const desertRef = storageRef(storage, `${user.uid}/images/${name}`);
      deleteObject(desertRef)
        .then(() => {
          console.log("oke");
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return uris;
    // setDatas((prevState) => ({
    //   ...prevState,
    //   image: uploadedUri,
    // }));
    // setDoc(doc(db, "userDatas", user.uid), datas, { merge: true })
    //   .then(() => {
    //     console.log("success");
    //   })
    //   .catch((err) => {
    //     console.log("error");
    //   });
  }

  const getName = (uri) => {
    const storage = getStorage();
    const imageRef = storageRef(storage, `${uri}`);
    return imageRef.name;
  };

  const updateUserdata = async () => {
    setModalVisible(true);
    const uris = await dataImageControl();
    setDoc(doc(db, "userDatas", user.uid), {
      id: user.uid,
      userName: datas.userName,
      sex: datas.sex,
      birthYear: datas.birthYear,
      description: datas.description,
      image: uris,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        console.log("success");
        setModalVisible(false);
        if (Platform.OS === "android") {
          ToastAndroid.show("Success !", ToastAndroid.SHORT);
        } else {
          AlertIOS.alert("Success !");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(255,255,255,0.5)",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator
            animating={true}
            size="large"
            style={{ opacity: 1 }}
            color="#FFB6C1"
          />
        </View>
      </Modal>
      {loading ? (
        <ActivityIndicator
          animating={true}
          size="large"
          style={{ opacity: 1 }}
          color="#999999"
        />
      ) : (
        <ScrollView>
          {!images ? (
            <ActivityIndicator />
          ) : (
            <View style={[styles.imageContain, tw``]}>
              {images.map((item, index) => (
                <View key={index}>
                  <UserImage Imageuri={item} />
                </View>
              ))}
              {images.length < 6 ? renderEmpty(images.length) : {}}
            </View>
          )}

          <View style={tw`bg-white m-2 mt-4 rounded-md`}>
            <Text style={[styles.textProfile, { fontSize: 17 / fontScale }]}>
              Tên của bạn
            </Text>
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
              style={[
                tw`rounded-2xl border p-2 mr-5 ml-5`,
                styles.textInput,
                { fontSize: 17 / fontScale },
              ]}
            ></TextInput>
            <>
              <Text style={[styles.textProfile, { fontSize: 17 / fontScale }]}>
                Giới tính
              </Text>
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
            <Text style={[styles.textProfile, { fontSize: 17 / fontScale }]}>
              Năm sinh
            </Text>

            <RNPickerSelect
              placeholder={{}}
              items={picker}
              onValueChange={(value) => {
                setDatas((prevState) => ({
                  ...prevState,
                  birthYear: value,
                }));
              }}
              InputAccessoryView={() => null}
              useNativeAndroidPickerStyle={false}
              style={pickerSelectStyles}
              value={datas.birthYear}
            />
            <Text style={[styles.textProfile, { fontSize: 17 / fontScale }]}>
              Mô tả
            </Text>
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
              style={[
                tw`rounded-2xl border p-2 mr-5 ml-5`,
                styles.textInput,
                { fontSize: 17 / fontScale },
              ]}
            />
            <TouchableOpacity
              style={tw`items-center mb-3 mt-6 ml-32 mr-32`}
              onPress={() => {
                updateUserdata(), setUserData(datas);
                // dataImageControl();
                // getName();
                // dataImageControl(), setUserData(datas);
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
      )}
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
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
    overflow: "hidden",
    borderRadius: 8,
  },
  textProfile: {
    color: "#FF1212",
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 15,
  },
  textInput: {
    borderColor: "rgba(0,0,0,0.4)",
    paddingLeft: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 5,
    marginHorizontal: 25,
    paddingHorizontal: 5,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 10,
    justifyContent: "center", // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,

    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 10, // to ensure the text is never behind the icon
  },
});

export default ProfileSetting;
