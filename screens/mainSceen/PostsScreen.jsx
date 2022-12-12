import React from "react";
import { Feather } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultPostsScreen } from "../DefaultPostSceen";
import { isLoginOn } from "../../redux/auth/slice";
import { useDispatch } from "react-redux";

const Stack = createNativeStackNavigator();

const PostsScreen = () => {
  const dispatch = useDispatch();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={DefaultPostsScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: "Пудликации",
          headerRight: () => (
            <Feather
              name="log-out"
              size={30}
              color="silver"
              onPress={() => dispatch(isLoginOn(false))}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default PostsScreen;
