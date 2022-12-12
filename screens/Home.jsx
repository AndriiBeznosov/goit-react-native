"use strict";
import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SimpleLineIcons, Feather, AntDesign } from "@expo/vector-icons";

import PostsScreen from "./mainSceen/PostsScreen";
import CreatePostsScreen from "./mainSceen/CreatePostsScreen";

import ProfileScreen from "./mainSceen/ProfileScreen";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

export const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        // tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "silver",
      }}
    >
      <Tab.Screen
        options={{
          // tabBarBadge: 1,

          headerShown: false,
          tabBarIcon: ({ focus, size, color }) => (
            <SimpleLineIcons name="grid" size={20} color={color} />
          ),
        }}
        name="Публикации"
        component={PostsScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focus, size, color }) => (
            <View style={styles.plusBtn}>
              <AntDesign name="plus" size={25} color={"#FFFFFF"} />
            </View>
          ),
        }}
        name="Create Posts"
        component={CreatePostsScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focus, size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export const styles = StyleSheet.create({
  logOutContainer: {
    marginRight: 10,
  },
  plusBtn: {
    width: 70,
    height: 45,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
