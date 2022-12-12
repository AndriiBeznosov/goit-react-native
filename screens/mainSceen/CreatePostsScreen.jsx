import React from "react";
import { View, Text, StyleSheet } from "react-native";
const CreatePostsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Posts Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 50,
    fontFamily: "Roboto-Blackitalic",
    textAlign: "center",
  },
});

export default CreatePostsScreen;
