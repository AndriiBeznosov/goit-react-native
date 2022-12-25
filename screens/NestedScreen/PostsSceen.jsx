import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";

import { useSelector } from "react-redux";

import db from "../../firebase/config";

import { CardPhoto } from "../../Componets/CardPhoto";

export const PostsScreen = ({ navigation }) => {
  const { email } = useSelector((state) => state.auth);
  const { nickName } = useSelector((state) => state.auth);
  const [post, setPost] = useState([]);

  const getAllPost = async () => {
    await db
      .firestore()
      .collection("posts")
      .onSnapshot((data) =>
        setPost(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))),
      );
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 32,
        paddingLeft: 16,
        paddingRight: 16,
        paddinrBottom: 32,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 32,
        }}
      >
        <View
          style={{
            width: 60,
            height: 60,
            backgroundColor: "silver",
            borderRadius: 16,
          }}
        >
          <Image
            source={"#"}
            style={{
              width: 60,
              height: 60,
            }}
          />
        </View>

        <View style={{ marginLeft: 8 }}>
          <Text
            style={{
              color: "#212121",
              fontSize: 13,
              fontWeight: "700",
              marginBottom: 5,
            }}
          >
            {nickName}
          </Text>
          <Text style={{ color: "#212121", fontSize: 11, fontWeight: "400" }}>
            {email}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={post}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return <CardPhoto item={item} navigation={navigation} />;
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 50,
    fontFamily: "Roboto-Blackitalic",
  },
});
