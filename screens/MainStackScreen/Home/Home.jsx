import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SimpleLineIcons, Feather, AntDesign } from "@expo/vector-icons";

import { DefaultPostsScreen } from "../../MainTabSceen/DefaultPostsScreen";
import { CreatePostsScreen } from "../../MainTabSceen/CreatePostsScreen";
import { ProfileScreen } from "../../MainTabSceen/ProfileScreen";

const Tab = createBottomTabNavigator();

export const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "silver",
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focus, size, color }) => (
            <SimpleLineIcons name="grid" size={20} color={color} />
          ),
        }}
        name="DefaultPostsScreen"
        component={DefaultPostsScreen}
      />
      <Tab.Screen
        options={{
          // title: "Создать публикацию",
          // headerShown: false,
          title: "Додати публікацію",
          tabBarIcon: ({ focus, size, color }) => (
            <View style={styles.plusBtn}>
              <AntDesign name="plus" size={25} color={"#FFFFFF"} />
            </View>
          ),
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      <Tab.Screen
        options={{
          title: "Профіль",
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
