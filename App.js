import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Root from "./src/navigation/Root";
import { darkTheme } from "./src/settings/styled";
import { ThemeProvider } from "styled-components";

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider theme={darkTheme}>
        <Root />
      </ThemeProvider>
    </NavigationContainer>
  );
}
