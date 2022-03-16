import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/Home";
import UserProfile from "../Screens/UserProfile";
import ProfileSetting from "../Screens/ProfileSetting";
import Setting from "../Screens/Setting";
import Message from "../Screens/Message";

const Stack = createNativeStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="User" component={UserProfile} />
    </Stack.Navigator>
  );
};

const NavigationMessage = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Mess" component={Message} />
      <Stack.Screen name="User" component={UserProfile} />
    </Stack.Navigator>
  );
};

export { Navigation, NavigationMessage };
