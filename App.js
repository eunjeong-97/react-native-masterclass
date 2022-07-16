import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Root from "./src/navigation/Root";
import { darkTheme } from "./src/settings/styled";
import { ThemeProvider } from "styled-components";
import {QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
    <NavigationContainer>
        <Root />
    </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
