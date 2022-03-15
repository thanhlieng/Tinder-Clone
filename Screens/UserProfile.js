import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";

const UserProfile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContain}>
        <View style={styles.information}>
          <Image
            source={require("../rose.jpg")}
            resizeMode="cover"
            style={styles.userImage}
          />
          <Text style={tw`font-bold text-xl mt-1`}>Hùng, 22</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable>
            <View style={tw`justify-center items-center`}>
              <FontAwesome
                name="user-circle-o"
                color="gray"
                size={30}
                style={styles.icon}
              />
              <Text>Chỉnh sửa hồ sơ</Text>
            </View>
          </Pressable>
          <Pressable>
            <View style={tw`justify-center items-center`}>
              <AntDesign
                name="setting"
                color="gray"
                size={30}
                style={styles.icon}
              />
              <Text>Thiết lập chung</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={tw`mt-9 items-center`}>
        <Fontisto name="tinder" color="#FF565B" size={40} />
        <Text style={[tw`text-xs`, { color: "rgba(0, 0, 0, 0.5)" }]}>
          Phiên bản 1.0(15032022)
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  viewContain: {
    height: "80%",
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
    alignItems: "center",
    backgroundColor: "white",
  },
  information: {
    alignItems: "center",
    marginTop: 90,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 10,
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 9999,
    borderColor: "pink",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
  },
  buttonContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
  icon: {
    backgroundColor: "white",
    padding: 7,
    borderRadius: 9999,
    borderColor: "rgba(0, 0, 0, 0.5)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 10,
  },
});

export default UserProfile;
