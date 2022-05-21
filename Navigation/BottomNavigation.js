import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import Home from "../Screens/Home";
import Message from "../Screens/Message";
import Matched from "../Screens/Matched";
import ModalProfile from "../Screens/ModalProfile";
import LikedU from "../Screens/LikedU";
import UserProfile from "../Screens/UserProfile";
import ProfileSetting from "../Screens/ProfileSetting";
import Setting from "../Screens/Setting";
import Auth from "../ggAuth/Auth";
import Login from "../Screens/Login";
import { useWindowDimensions, Platform } from "react-native";
import Chat from "../Screens/Chat";
import { PixelRatio } from "react-native";
import ModalHome from "../Screens/ModalHome";
import {
  CardStyleInterpolators,
  TransitionPresets,
} from "@react-navigation/stack";

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

const HomeModal = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name="HomeM" component={Home} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="MyModal" component={ModalHome} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

function BottomTabs() {
  const { height, width } = useWindowDimensions();
  return (
    <Tab.Navigator
      activeColor="#FF565B"
      inactiveColor="#C7C7C7"
      shifting={true}
      labeled={false}
      initialRouteName="MainHome"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "pink",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: Platform.OS === "android" ? height * 0.08 : height * 0.1,
        },
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
            <FontAwesome
              name="heartbeat"
              color={color}
              size={PixelRatio.getPixelSizeForLayoutSize(12)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MainHome"
        component={Home}
        options={({ route }) => ({
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Fontisto
              name="tinder"
              color={color}
              size={PixelRatio.getPixelSizeForLayoutSize(12)}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          tabBarLabel: "Match",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="chat-outline"
              color={color}
              size={PixelRatio.getPixelSizeForLayoutSize(12)}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function HomeNav() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Group screenOptions={screenOptionStyle}>
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
        <Stack.Screen name="Profile" component={ProfileSetting} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{ presentation: "modal", headerShown: false }}
      >
        <Stack.Screen name="MyModal" component={ModalHome} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function BottomNavigation() {
  const { user, userData } = Auth();

  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      {/* {user ? (
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
      )} */}

      {user && userData ? (
        <Stack.Screen
          name="Home1"
          component={HomeNav}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          {user ? (
            <Stack.Screen
              name="Modal"
              component={ModalProfile}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          )}
        </>
      )}
    </Stack.Navigator>
  );
}

export default BottomNavigation;
