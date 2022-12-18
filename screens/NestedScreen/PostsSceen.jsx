import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { useSelector } from "react-redux";
import { Feather, AntDesign } from "@expo/vector-icons";

export const PostsScreen = ({ route, navigation }) => {
  const { email } = useSelector((state) => state.auth);
  const { name } = useSelector((state) => state.auth);

  const [post, setPost] = useState([]);
  const [like, setLike] = useState("0");

  useEffect(() => {
    if (post[post.length - 1] === route.params) {
      return;
    }
    if (route.params !== undefined) {
      setPost((prevState) => [route.params, ...prevState]);
    }
  }, [route.params]);

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
          <Text style={{ color: "#212121", fontSize: 13, fontWeight: "700" }}>
            {name}
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
          renderItem={({ item }) => (
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
              <Text
                style={{ fontWeight: "500", fontSize: 16, marginBottom: 8 }}
              >
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
                      color="#bdbdbd"
                      style={{ transform: [{ scaleX: -1 }] }}
                    />

                    <Text
                      style={{ marginLeft: 5, fontSize: 16, color: "#bdbdbd" }}
                    >
                      {like}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "flex-end" }}
                  >
                    <AntDesign name="like2" size={22} color="#bdbdbd" />
                    <Text
                      style={{ marginLeft: 5, fontSize: 16, color: "#bdbdbd" }}
                    >
                      0
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
          )}
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
