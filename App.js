import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ContextProvider } from "./ggAuth/Auth";
import Navigation from "./Navigation/Navigation";
import BottomNavigation from "./Navigation/BottomNavigation";

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
