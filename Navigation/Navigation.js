import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/Home";
import Login from "../Screens/Login";
import Auth from "../ggAuth/Auth";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { user } = Auth();

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen name="Home" component={Home} />
        </>
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
};

export default Navigation;
