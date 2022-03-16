import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import React, { useState } from "react";
import Home from "../Screens/Home";
import Message from "../Screens/Message";
import Matched from "../Screens/Matched";
import Home1 from "../Screens/Home1";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ModalProfile from "../Screens/ModalProfile";
import LikedU from "../Screens/LikedU";
import UserProfile from "../Screens/UserProfile";
import ProfileSetting from "../Screens/ProfileSetting";
import Setting from "../Screens/Setting";
import { Navigation, NavigationMessage } from "../Navigation/Navigation";
import { View } from "react-native";
import Auth from "../ggAuth/Auth";
import Login from "../Screens/Login";

const BottomNavigationTab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "white",
  },
  headerTintColor: "black",
  headerBackTitle: "Back",
  headerTitleAlign: "center",
};

function FirstNavigation() {
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <Stack.Navigator
        screenOptions={screenOptionStyle}
        initialRouteName="Home"
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="User" component={UserProfile} />
      </Stack.Navigator>
    </View>
  );
}

function BottomTabs() {
  return (
    <BottomNavigationTab.Navigator
      activeColor="#FF565B"
      inactiveColor="#C7C7C7"
      shifting={false}
      barStyle={{ backgroundColor: "#FFFFFF" }}
    >
      <BottomNavigationTab.Screen
        name="MainHome"
        component={Home}
        options={({ route }) => ({
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Fontisto name="tinder" color={color} size={24} />
          ),
          tabBarVisible: false,
        })}
      />
      <BottomNavigationTab.Screen
        name="Message"
        component={NavigationMessage}
        options={{
          tabBarLabel: "Message",
          tabBarIcon: ({ color }) => (
            <Ionicons name="grid" color={color} size={26} />
          ),
          headerShown: true,
          headerTitle: "Message",
        }}
      />
      <BottomNavigationTab.Screen
        name="Home1"
        component={Navigation}
        options={{
          tabBarLabel: "Home1",
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart" color={color} size={26} />
          ),
        }}
      />
      <BottomNavigationTab.Screen
        name="Matched"
        component={Message}
        options={{
          tabBarLabel: "Match",
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubbles" color={color} size={26} />
          ),
        }}
      />
    </BottomNavigationTab.Navigator>
  );
}

function SettingNav() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName="Home">
      <Stack.Screen name="User" component={UserProfile} />
      <Stack.Screen name="profile" component={ProfileSetting} />
      <Stack.Screen name="setting" component={Setting} />
    </Stack.Navigator>
  );
}

const BottomNavigation = () => {
  const { user } = Auth();
  const [userData, setuserData] = useState();

  return (
    <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName="Home">
      {user ? (
        <>
          <Stack.Screen
            name="Home"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Userprofile"
            component={SettingNav}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default BottomNavigation;
