import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ContextProvider } from "./ggAuth/Auth";
import Navigation from "./Navigation/Navigation";
import BottomNavigation from "./Navigation/BottomNavigation";
import GestureHandlerRootView from "react-native-gesture-handler";

export default function App() {
  return (
    <NavigationContainer>
      <ContextProvider>
        <BottomNavigation />
      </ContextProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
