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
import { ScreenStackHeaderLeftView } from "react-native-screens";
import { useWindowDimensions } from "react-native";
import Chat from "../Screens/Chat";

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

function BottomTabs() {
  const { height, width } = useWindowDimensions();
  return (
    <Tab.Navigator
      activeColor="#FF565B"
      inactiveColor="#C7C7C7"
      shifting={false}
      barStyle={{ backgroundColor: "#60EBB3", height: height * 0.5 }}
      labeled={false}
      initialRouteName="MainHome"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "pink",
        tabBarHideOnKeyboard: true,
        tabBarStyle: { height: height * 0.055, position: "absolute" },
      }}
    >
      {/* <BottomNavigationTab.Screen
        name="Message12121"
        component={vipsel}
        options={{
          tabBarLabel: "Message",
          tabBarIcon: ({ color }) => (
            <Ionicons name="grid" color={color} size={26} />
          ),
          headerShown: true,
          headerTitle: "Message",
        }}
      /> */}
      <Tab.Screen
        name="LikedU"
        component={LikedU}
        options={{
          tabBarLabel: "LikeU",
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="MainHome"
        component={Home}
        options={({ route }) => ({
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Fontisto name="tinder" color={color} size={30} />
          ),
        })}
      />
      <Tab.Screen
        name="Matched"
        component={Message}
        options={{
          tabBarLabel: "Match",
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubbles" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function HomeNav() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Home"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="match"
        component={Matched}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="User" component={UserProfile} />
      <Stack.Screen name="profile" component={ProfileSetting} />
      <Stack.Screen name="setting" component={Setting} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}

function LoginNav() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Modal" component={ModalProfile} />
      <Stack.Screen name="Main" component={HomeNav} />
    </Stack.Navigator>
  );
}

const BottomNavigation = () => {
  const { user, userData } = Auth();

  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      {user ? (
        <>
          {userData ? (
            <Stack.Screen
              name="Home1"
              component={HomeNav}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="Modal"
              component={ModalProfile}
              options={{ headerShown: false }}
            />
          )}
        </>
      ) : (
        <Stack.Screen
          name="login"
          component={LoginNav}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default BottomNavigation;
