import React from "react";
import { useColorScheme } from "react-native";
import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import Root from "./src/navigation/Root";
import { darkTheme } from "./src/settings/styled";

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
