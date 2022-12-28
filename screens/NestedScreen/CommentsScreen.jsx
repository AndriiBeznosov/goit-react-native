import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import db from "../../firebase/config";
import { useSelector } from "react-redux";

export const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const { nickName } = useSelector((state) => state.auth);
  const { photo, id } = route.params.item;

  const createPosts = async () => {
    const data = new Date().toLocaleString();
    await db
      .firestore()
      .collection("posts")
      .doc(id)
      .collection("comments")
      .add({ comment, data, nickName });
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
  useEffect(() => {
    getAllPostsComments();
  }, [commentList]);

  const commentHandler = (text) => setComment(text);

  const onSubmitComment = () => {
    createPosts();
    setIsShowKeyboard(false);
    keyboardHide();
    setComment("");
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          // marginHorizontal: 10,
          height: 240,
          width: "100%",
          borderRadius: 8,

          marginBottom: 32,
        }}
      >
        <Image
          source={{ uri: photo }}
          style={{
            // marginHorizontal: 10,
            height: 240,
            width: "100%",
            overflow: "hidden",
            marginBottom: 8,
          }}
        />
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={commentList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                flexDirection:
                  item.nickName !== nickName ? "row-reverse" : "row",
                justifyContent: "space-between",
                marginBottom: 32,
              }}
            >
              <View
                style={{
                  flex: 1,

                  backgroundColor: "rgba(0, 0, 6, 0.03)",
                  marginRight: item.nickName === nickName ? 20 : 0,
                  marginLeft: item.nickName !== nickName ? 20 : 0,
                  overflow: "hidden",
                  borderRadius: 10,
                  padding: 16,
                }}
              >
                <Text
                  style={{
                    overflow: "hidden",
                    fontSize: 13,
                    lineHeight: 18,
                    color: "#212121",

                    fontWeight: "700",
                    textAlign: item.nickName !== nickName ? "left" : "right",
                  }}
                >
                  {item.nickName}
                </Text>
                <Text
                  style={{
                    overflow: "hidden",
                    fontSize: 13,
                    lineHeight: 18,
                    color: "#212121",
                    marginBottom: 8,
                  }}
                >
                  {item.comment}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: "#BDBDBD",
                    textAlign: item.nickName !== nickName ? "left" : "right",
                  }}
                >
                  {item.data}
                </Text>
              </View>
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 12,
                  backgroundColor: "#000",
                }}
              ></View>
            </View>
          )}
        />
      </View>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "marginBottom" : "heigth"}
        >
          <View
            style={{
              ...styles.input,
              marginBottom: isShowKeyboard ? 220 : 10,
            }}
          >
            <TextInput
              inputType="text"
              style={{
                ...styles.inputText,
                paddingLeft: 15,
                paddingRight: 55,
              }}
              value={comment}
              placeholder="Комментировать..."
              // disabled={true}

              onChangeText={commentHandler}
              onFocus={() => setIsShowKeyboard(true)}
            />
            <TouchableOpacity style={styles.btn} onPress={onSubmitComment}>
              <Text>
                <AntDesign name="arrowup" size={20} color="#fff" />
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 50,
    fontFamily: "Roboto-Blackitalic",
  },
  inputText: {
    paddingTop: 16,
    paddingBottom: 16,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  input: {
    position: "relative",
    height: 50,
    width: "100%",
    borderColor: "#bdbdbd",
    borderWidth: 1,

    borderRadius: 22,
  },
  btn: {
    position: "absolute",
    top: 7,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
  },
});
