import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import db from "../firebase/config";

import { Feather, AntDesign } from "@expo/vector-icons";

export const CardPhoto = ({ item, navigation }) => {
  const [like, setLike] = useState([]);
  const [commentList, setCommentList] = useState([]);

  const { id } = item;

  const { email } = useSelector((state) => state.auth);

  const likeCollection = () => {
    const li = like.find((element) => element.email === email);

    if (li !== undefined) {
      togglePostLike(li);

      return;
    }
    createPostsLike();
  };

  const togglePostLike = async (li) => {
    await db
      .firestore()
      .collection("posts")
      .doc(id)
      .collection("like")
      .doc(li.id)
      .delete()
      .then(() => {
        console.log("Document delete!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  const createPostsLike = async () => {
    await db
      .firestore()
      .collection("posts")
      .doc(id)
      .collection("like")
      .add({ email })
      .then(() => {
        console.log("Document add!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  const getAllPostsComments = async () => {
    await db
      .firestore()
      .collection("posts")
      .doc(id)
      .collection("comments")
      .onSnapshot((data) =>
        setCommentList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))),
      );
  };
  const getAllPostslike = async () => {
    await db
      .firestore()
      .collection("posts")
      .doc(id)
      .collection("like")
      .onSnapshot((data) =>
        setLike(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))),
      );
  };

  useEffect(() => {
    getAllPostsComments();
    getAllPostslike();
  }, [item]);

  return (
    <View style={{ marginBottom: 32 }}>
      <Image
        source={{ uri: item.photo }}
        style={{
          // marginHorizontal: 10,
          height: 240,
          width: "100%",
          borderRadius: 8,
          marginBottom: 8,
        }}
      />
      <Text style={{ fontWeight: "500", fontSize: 16, marginBottom: 8 }}>
        {item.name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              marginRight: 10,
            }}
            onPress={() => {
              navigation.navigate("Comments", { item });
            }}
          >
            <Feather
              name="message-circle"
              size={22}
              color={commentList.length ? "#FF6C00" : "#bdbdbd"}
              style={{ transform: [{ scaleX: -1 }] }}
            />

            <Text
              style={{
                marginLeft: 5,
                fontSize: 16,
                color: commentList.length ? "#FF6C00" : "#bdbdbd",
              }}
            >
              {commentList.length}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "flex-end" }}
            onPress={likeCollection}
          >
            <AntDesign
              name="like2"
              size={22}
              color={like.length ? "#FF6C00" : "#bdbdbd"}
            />
            <Text
              style={{
                marginLeft: 5,
                fontSize: 16,
                color: like.length ? "#FF6C00" : "#bdbdbd",
              }}
            >
              {like.length ? like.length : "0"}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "flex-end" }}
            onPress={() => {
              navigation.navigate("Map", { item });
            }}
          >
            <Feather
              style={{ marginRight: 5 }}
              name="map-pin"
              size={18}
              color="#bdbdbd"
            />
            <Text>{item.territory}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
