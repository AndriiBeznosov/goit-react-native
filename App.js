//RegistrationScreen

import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";

// import * as Font from "expo-font";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function RegistrationScreen() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 20 * 2,
  );
  const initialState = {
    name: login,
    email: email,
    password: password,
  };

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 20 * 2;

      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);

    return () => subscription?.remove();
  }, []);

  const loginHandler = (text) => setLogin(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const toggleSecureText = () => {
    setSecureText(!secureText);
  };

  const onSubmitForm = () => {
    keyboardHide();
    console.log(initialState);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setLogin("");
    setEmail("");
    setPassword("");
  };

  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Blackitalic": require("./assets/fonts/Roboto-BlackItalic.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback
      onPress={keyboardHide}
      onLayout={onLayoutRootView}
    >
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("./assets/images/PhotoBG.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.containerForm,
                paddingBottom: isShowKeyboard ? 20 : 45,
              }}
            >
              <View style={styles.photo}>
                <Image
                  style={styles.icon}
                  source={require("./assets/images/add.png")}
                />
              </View>
              <Text style={styles.title}>Регистрация</Text>

              <View
                style={{
                  ...styles.input,
                  marginBottom: 16,
                  width: dimensions,
                }}
              >
                <TextInput
                  style={styles.inputText}
                  value={login}
                  placeholder="Логин"
                  onChangeText={loginHandler}
                  onFocus={() => setIsShowKeyboard(true)}
                />
              </View>
              <View
                style={{
                  ...styles.input,
                  marginBottom: 16,
                  width: dimensions,
                }}
              >
                <TextInput
                  style={styles.inputText}
                  value={email}
                  placeholder="Адрес електронной почти"
                  onChangeText={emailHandler}
                  onFocus={() => setIsShowKeyboard(true)}
                />
              </View>
              <View
                style={{
                  ...styles.password,
                  width: dimensions,
                }}
              >
                <TextInput
                  style={styles.inputText}
                  value={password}
                  placeholder="Пароль"
                  secureTextEntry={secureText}
                  onChangeText={passwordHandler}
                  onFocus={() => setIsShowKeyboard(true)}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.show}
                  onPress={toggleSecureText}
                >
                  <Text style={styles.showText}>Показать</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.1}
                style={{ ...styles.button, width: dimensions }}
                onPress={onSubmitForm}
              >
                <Text style={styles.textButton}>Зарегистрироваться</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.textLogin}>Уже есть аккаунт? Войти</Text>
              </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

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
    position: "relative",
    alignItems: "center",
    paddingTop: 92,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    backgroundColor: "#ffffff",
  },
  photo: {
    position: "absolute",
    left: 150,
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
    marginBottom: 33,
    textAlign: "center",
  },

  input: {
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  inputText: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  password: {
    position: "relative",
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  show: {
    position: "absolute",
    right: 16,
    top: 14,
  },
  showText: {
    fontSize: 16,
    color: "#1B4371",
  },
  button: {
    height: 51,
    padding: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    marginTop: 43,
  },
  textButton: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#ffffff",
  },
  textLogin: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    textAlign: "center",
    marginTop: 16,
  },
});
