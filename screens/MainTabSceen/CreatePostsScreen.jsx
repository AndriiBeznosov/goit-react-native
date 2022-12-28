import React, { useEffect, useState } from "react";

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
} from "react-native";

import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as LocationGeocodedAddress from "expo-location";

import db from "../../firebase/config";

import {
  MaterialIcons,
  Feather,
  EvilIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useSelector } from "react-redux";

export const CreatePostsScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [namePhoto, setNamePhoto] = useState("");
  const [location, setLocation] = useState(null);
  const [locationCity, setLocationCity] = useState("");
  const [data, setData] = useState(null);
  const [colorBtn, setColorBtn] = useState("#f6f6f6");
  const [colorTextBtn, setColorTextBtn] = useState("#bdbdbd");
  const [statusLocation, setStatusLocation] = useState(false);
  const [statusPhoto, setStatusPhoto] = useState(false);
  const [loadingLocation, useLoadingLocation] = useState(false);

  const { userId, nickName } = useSelector((state) => state.auth);

  const namePhotoHandler = (text) => setNamePhoto(text);

  const clearFormPost = () => {
    setPhoto(null);
    setNamePhoto("");
    setData(null);
    setColorBtn("#f6f6f6");
    setColorTextBtn("#bdbdbd");
    useLoadingLocation(false);
    setLocationCity("");
  };

  useEffect(() => {
    (async () => {
      if (!statusPhoto) {
        let { status } = await Camera.requestCameraPermissionsAsync();

        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        setStatusPhoto(true);
      }
      if (!statusLocation) {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        setStatusLocation(true);
      }
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    useLoadingLocation(true);
    let location = await Location.getCurrentPositionAsync({});
    await setLocation(location.coords);
    locationGeocodedAddress(location);
  };

  const refreshPhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    let location = await Location.getCurrentPositionAsync({});
    await setLocation(location.coords);
    locationGeocodedAddress(location);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    console.log(photo);
    setData({
      name: namePhoto,
      photo: photo,
      location: location,
      territory: locationCity
        ? locationCity.country + ", " + locationCity.city
        : "",
    });

    if (locationCity && namePhoto && photo && location) {
      setColorBtn("#FF6C00");
      setColorTextBtn("#fff");
    }
  }, [namePhoto, photo, locationCity, location]);

  const locationGeocodedAddress = async (location) => {
    let locationGeocoded = await LocationGeocodedAddress.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    setLocationCity(locationGeocoded[0]);
    useLoadingLocation(false);
  };

  const onSubmitCard = async () => {
    uploadPostToServer();
    await navigation.navigate("Posts", data);

    setPhoto(null);
    setNamePhoto("");
    keyboardHide();
    setColorBtn("#F6f6f6");
    setColorTextBtn("#bdbdbd");
    setLocationCity("");
    setLocation(null);
  };
  const uploadPostToServer = async () => {
    const photoServer = await uploadPhotoToServer();
    await db
      .firestore()
      .collection("posts")
      .add({
        name: namePhoto,
        photo: photoServer,
        location: location,
        territory: locationCity
          ? locationCity.country + ", " + locationCity.city
          : "",
        userId,
        nickName,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    await db.storage().ref(`postImage/${uniquePostId}`).put(file);

    const processedPhoto = db
      .storage()
      .ref("postImage")
      .child(uniquePostId)
      .getDownloadURL();

    return processedPhoto;
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "heigth"}
      >
        <View style={styles.container}>
          <Camera
            style={{ ...styles.camera, height: isShowKeyboard ? 150 : 240 }}
            ref={setCamera}
          >
            {photo ? (
              <>
                <View
                  style={{
                    ...styles.containerPhoto,
                    width: isShowKeyboard ? 190 : 300,
                    height: isShowKeyboard ? 130 : 200,
                  }}
                >
                  <Image style={styles.image} source={{ uri: photo }} />
                </View>
                <TouchableOpacity
                  style={styles.refreshPhoto}
                  onPress={() => setPhoto(null)}
                >
                  <MaterialCommunityIcons
                    name="camera-retake-outline"
                    size={44}
                    color="#bdbdbd"
                  />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.btnCamera}
                onPress={!photo ? takePhoto : refreshPhoto}
              >
                <MaterialIcons name="camera-alt" size={35} color="#fff" />
              </TouchableOpacity>
            )}
          </Camera>

          <View style={styles.input}>
            <TextInput
              inputType="text"
              style={styles.inputText}
              value={namePhoto}
              placeholder="Назва..."
              onChangeText={namePhotoHandler}
              onFocus={() => setIsShowKeyboard(true)}
            />
          </View>
          <View style={styles.input} disabled={true}>
            <TextInput
              inputType="text"
              style={{
                ...styles.inputText,
                paddingLeft: 30,
              }}
              value={
                locationCity
                  ? locationCity.country + ", " + locationCity.city
                  : ""
              }
              placeholder="Місцевість..."
              onFocus={() => setIsShowKeyboard(true)}
            />
            <Feather
              style={styles.iconMap}
              name="map-pin"
              size={22}
              color="#bdbdbd"
            />
            {loadingLocation && (
              <Text style={styles.loadingLocation}>
                Завантаження локації, потрібно зачекати...
              </Text>
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ ...styles.button, backgroundColor: colorBtn }}
            onPress={onSubmitCard}
            disabled={colorBtn !== "#FF6C00" ? true : false}
          >
            <Text style={{ ...styles.textButton, color: colorTextBtn }}>
              Опублікувати
            </Text>
          </TouchableOpacity>
          {!isShowKeyboard && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.buttonDelete}
              // disabled={true}
              onPress={clearFormPost}
            >
              <EvilIcons name="trash" size={40} color="#bdbdbd" />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#fff",
  },
  camera: {
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#212121",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#212121",
    marginBottom: 8,
  },
  btnCamera: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: "silver",
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  input: {
    height: 50,
    paddingTop: 16,
    paddingBottom: 16,
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
    marginBottom: 32,
    justifyContent: "center",
  },
  iconMap: {
    position: "absolute",
  },
  button: {
    height: 51,
    padding: 16,
    // backgroundColor: "#f6f6f6",
    borderRadius: 20,
    alignItems: "center",
  },
  textButton: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    // color: "#bdbdbd",
  },
  buttonDelete: {
    height: 40,
    width: 70,
    backgroundColor: "#f6f6f6",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
  },
  containerPhoto: {
    position: "absolute",
    top: 10,
    left: 10,
    // width: 300,
    // height: 200,
    borderWidth: 2,
    borderColor: "red",
  },

  image: {
    flex: 1,
  },
  refreshPhoto: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  loadingLocation: {
    position: "absolute",
    right: 0,
    bottom: 0,
    color: "rgba(255,0,0,0.3)",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
  },
});
