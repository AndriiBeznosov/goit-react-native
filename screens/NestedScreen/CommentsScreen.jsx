import React, { useState } from "react";
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

export const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const { photo } = route.params.item;
  console.log(commentList);
  const commentHandler = (text) => setComment(text);

  const onSubmitComment = () => {
    setCommentList([...commentList, { comment }]);
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
            borderRadius: 8,
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
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 32,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  padding: 16,
                  backgroundColor: "rgba(0, 0, 6, 0.03)",
                  // width: "100%",

                  marginRight: 20,
                  overflow: "hidden",
                  borderRadius: 10,
                }}
              >
                {item.comment}
              </Text>
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
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
                paddingLeft: 30,
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

    borderRadius: "50%",
  },
  btn: {
    position: "absolute",
    top: 7,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: "50%",
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
  },
});