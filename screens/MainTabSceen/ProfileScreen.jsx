import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  FlatList,
} from "react-native";

import { useSelector } from "react-redux";

import db from "../../firebase/config";

import { Feather } from "@expo/vector-icons";
import { CardPhoto } from "../../Componets/CardPhoto";

export const ProfileScreen = ({ navigation }) => {
  const [postList, setPostsList] = useState([]);

  const { userId } = useSelector((state) => state.auth);
  const { nickName } = useSelector((state) => state.auth);

  const getUserPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))),
      );
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/images/PhotoBG.jpg")}
      >
        <View style={styles.containerForm}>
          <Feather
            style={{ position: "absolute", top: 16, right: 16 }}
            name="log-out"
            size={35}
            color="silver"
            onPress={signOut}
          />
          <View style={styles.photo}>
            <Image
              style={styles.icon}
              source={require("../../assets/images/add.png")}
            />
          </View>
          <Text style={styles.title}>{nickName}</Text>
          <View style={{ flex: 1 }}>
            <FlatList
              data={postList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                return <CardPhoto item={item} navigation={navigation} />;
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  containerForm: {
    flex: 0.8,
    // position: "relative",
    // alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 72,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    backgroundColor: "#ffffff",
  },
  photo: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -50 }],
    // marginHorizontal: "auto",
    top: -60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  icon: {
    width: 25,
    height: 25,
    position: "absolute",
    bottom: 14,
    right: -12,
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    marginBottom: 32,
    textAlign: "center",
  },
});
