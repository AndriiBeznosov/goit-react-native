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

import {
  MaterialIcons,
  Feather,
  EvilIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export const CreatePostsScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [camera, setCamera] = useState(null);
  const accessToCameras = Camera.requestCameraPermissionsAsync();
  const [photo, setPhoto] = useState("");
  const [namePhoto, setNamePhoto] = useState("");

  const [location, setLocation] = useState(null);
  const [locationCity, setLocationCity] = useState("");
  const namePhotoHandler = (text) => setNamePhoto(text);
  // const locationHandler = (text) => setLocationPhono(text);

  const [data, setData] = useState(null);

  const [colorBtn, setColorBtn] = useState("#f6f6f6");
  const [colorTextBtn, setColorTextBtn] = useState("#bdbdbd");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const TakePhoto = async () => {
    const photo = await camera.takePictureAsync(accessToCameras);
    setPhoto(photo.uri);

    let location = await Location.getCurrentPositionAsync();
    setLocation(location.coords);
    locationGeocodedAddress(location);
  };

  const refreshPhoto = async () => {
    const photo = await camera.takePictureAsync(accessToCameras);
    setPhoto(photo.uri);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
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

  const onSubmitCard = async () => {
    await navigation.navigate("Posts", data);
    setPhoto("");
    setNamePhoto("");
    keyboardHide();
    setColorBtn("#F6f6f6");
    setColorTextBtn("#bdbdbd");
    setLocationCity("");
    setLocation(null);
  };

  const locationGeocodedAddress = async (location) => {
    let locationGeocoded = await LocationGeocodedAddress.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    setLocationCity(locationGeocoded[0]);
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
                <View style={styles.containerPhoto}>
                  <Image style={styles.image} source={{ uri: photo }} />
                </View>
                <TouchableOpacity
                  style={styles.refreshPhoto}
                  onPress={() => setPhoto("")}
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
                onPress={!photo ? TakePhoto : refreshPhoto}
              >
                <MaterialIcons name="camera-alt" size={35} color="#bdbdbd" />
              </TouchableOpacity>
            )}
          </Camera>
          <Text style={styles.title}>Загрузите фото </Text>
          <View style={styles.input}>
            <TextInput
              inputType="text"
              style={styles.inputText}
              value={namePhoto}
              placeholder="Название..."
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
                position: "relative",
              }}
              value={
                locationCity
                  ? locationCity.country + ", " + locationCity.city
                  : ""
              }
              placeholder="Местность..."
              // disabled={true}

              // onChangeText={locationHandler}
              onFocus={() => setIsShowKeyboard(true)}
            />
            <Feather
              style={styles.iconMap}
              name="map-pin"
              size={22}
              color="#bdbdbd"
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ ...styles.button, backgroundColor: colorBtn }}
            onPress={onSubmitCard}
            disabled={colorBtn !== "#FF6C00" ? true : false}
          >
            <Text style={{ ...styles.textButton, color: colorTextBtn }}>
              Опубликовать
            </Text>
          </TouchableOpacity>
          {!isShowKeyboard && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.buttonDelete}
              // disabled={true}
              // onPress={onSubmitForm}
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
    // paddinrBottom: 32,
    backgroundColor: "#fff",
    // backgroundColor: "#fff342",
  },
  camera: {
    position: "relative",
    // height: 240,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
    marginBottom: 8,
  },
  btnCamera: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    color: "#bdbdbd",
    marginBottom: 32,
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
    borderRadius: 100,
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
    borderRadius: 100,
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
    width: 300,
    height: 200,
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
});
