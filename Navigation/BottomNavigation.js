import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import React from "react";
import Home from "../Screens/Home";
import Message from "../Screens/Message";
import Matched from "../Screens/Matched";
import Home1 from "../Screens/Home1";
import Navigation from "../Navigation/Navigation";
import ModalProfile from "../Screens/ModalProfile";
import LikedU from "../Screens/LikedU";
import UserProfile from "../Screens/UserProfile";
import ProfileSetting from "../Screens/ProfileSetting";
import Setting from "../Screens/Setting";

const BottomNavigationTab = createMaterialBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <BottomNavigationTab.Navigator
      initiaRouteName="Home"
      activeColor="#FF565B"
      inactiveColor="#C7C7C7"
      shifting={false}
      labeled={true}
      barStyle={{ backgroundColor: "#FFFFFF" }}
      screenOptions={{ headerShown: true }}
    >
      <BottomNavigationTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Fontisto name="tinder" color={color} size={24} />
          ),
        }}
      />
      <BottomNavigationTab.Screen
        name="Message"
        component={Message}
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
        component={LikedU}
        options={{
          tabBarLabel: "Home1",
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart" color={color} size={26} />
          ),
        }}
      />
      <BottomNavigationTab.Screen
        name="Matched"
        component={Setting}
        options={{
          tabBarLabel: "Match",
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubbles" color={color} size={26} />
          ),
        }}
      />
    </BottomNavigationTab.Navigator>
  );
};

export default BottomNavigation;
