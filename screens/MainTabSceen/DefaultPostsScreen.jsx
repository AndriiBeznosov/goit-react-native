import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import { logOut } from "../../redux/auth/slice";

import { PostsScreen } from "../NestedScreen/PostsSceen";
import { CommentsScreen } from "../NestedScreen/CommentsScreen";
import { MapScreen } from "../NestedScreen/MapScreen";

import { authSignOutUser } from "../../redux/auth/operations";

const Stack = createNativeStackNavigator();

export const DefaultPostsScreen = () => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: "Публікація",
          headerRight: () => (
            <Feather
              name="log-out"
              size={30}
              color="silver"
              onPress={signOut}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: "Коментарій",
        }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: "Мапа",
        }}
      />
    </Stack.Navigator>
  );
};
