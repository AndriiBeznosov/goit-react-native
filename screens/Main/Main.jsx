"use strict";

import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { Home } from "../Home";
import { RegistrationScreen } from "../auth/RegistrationScreen";
import { LoginScreen } from "../auth/LoginScreen";

const MainStack = createStackNavigator();

export const Main = () => {
  const { isLogin } = useSelector((state) => state.auth);

  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("../../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Blackitalic": require("../../assets/fonts/Roboto-BlackItalic.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onLayout={onLayoutRootView}>
      {isLogin ? (
        <Home />
      ) : (
        <>
          <MainStack.Navigator>
            <MainStack.Screen
              options={{ headerShown: false }}
              name="Registr"
              component={RegistrationScreen}
            />
            <MainStack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={LoginScreen}
            />
          </MainStack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};
