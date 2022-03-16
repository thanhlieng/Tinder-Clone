import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import Auth from "../ggAuth/Auth";

const Setting = () => {
  const { Logout } = Auth();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>Pháp lý</Text>
        <Text style={styles.textContent}>Giấy phép</Text>
        <Text style={styles.textContent}>Quyền riêng tư</Text>
        <Text style={styles.textContent}>Điều khoản sử dụng và dịch vụ</Text>
        <Text style={styles.textContent}>Trợ giúp và hỗ trợ</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={tw`justify-center bg-white items-center p-4 rounded-full mb-2`}
          onPress={Logout}
        >
          <Text style={tw`text-base font-bold text-red-500`}>Đăng xuất</Text>
        </Pressable>
        <Pressable
          style={tw`justify-center bg-red-500 items-center p-4 rounded-full mt-2`}
        >
          <Text style={tw`text-base font-bold text-white`}>Xóa tài khoản</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  textTitle: {
    color: "#FF1212",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  textContainer: {
    backgroundColor: "white",
    marginHorizontal: 15,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 30,
  },
  buttonContainer: {
    paddingHorizontal: 25,

    borderRadius: 20,
    marginTop: 30,
  },
  textContent: { fontSize: 14, marginVertical: 1 },
  buttonText: {},
});

export default Setting;
