import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/Home";
import Login from "../Screens/Login";
import Auth from "../ggAuth/Auth";
import Test from "../Screens/Test";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { user } = Auth();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Test" component={Test} />
    </Stack.Navigator>
  );
};

export default Navigation;
