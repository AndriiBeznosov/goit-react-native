// import React, { useState } from "react";
// import {
//   View,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableWithoutFeedback,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { Camera } from "expo-camera";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { MaterialIcons, Feather, EvilIcons } from "@expo/vector-icons";

// export const CreateScreen = () => {
//   // const [isShowKeyboard, setIsShowKeyboard] = useState(false);

//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera}>
//         <TouchableOpacity style={styles.btnCamera}>
//           <MaterialIcons name="camera-alt" size={35} color="#bdbdbd" />
//         </TouchableOpacity>
//       </Camera>
//       <Text style={styles.title}>Загрузите фото </Text>
//       <View style={styles.input}>
//         <TextInput
//           inputType="text"
//           style={styles.inputText}
//           // value={}
//           placeholder="Название..."
//         />
//       </View>
//       <View style={styles.input}>
//         <TextInput
//           inputType="text"
//           style={{
//             ...styles.inputText,
//             paddingLeft: 30,
//             position: "relative",
//           }}
//           // value={"Название..."}
//           placeholder="Местность..."
//         />
//         <Feather
//           style={styles.iconMap}
//           name="map-pin"
//           size={22}
//           color="#bdbdbd"
//         />
//       </View>
//       <TouchableOpacity
//         activeOpacity={0.5}
//         style={styles.button}
//         // onPress={onSubmitForm}
//       >
//         <Text style={styles.textButton}>Опубликовать</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         activeOpacity={0.7}
//         style={styles.buttonDelete}
//         // onPress={onSubmitForm}
//       >
//         <EvilIcons name="trash" size={24} color="#bdbdbd" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 32,
//     paddingLeft: 16,
//     paddingRight: 16,
//     // paddinrBottom: 32,
//     backgroundColor: "#fff",
//     // backgroundColor: "#fff342",
//   },
//   camera: {
//     height: 240,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#e8e8e8",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f6f6f6",
//     marginBottom: 8,
//   },
//   btnCamera: {
//     width: 60,
//     height: 60,
//     borderRadius: "50%",
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "400",
//     lineHeight: 19,
//     color: "#bdbdbd",
//     marginBottom: 32,
//   },
//   inputText: {
//     fontSize: 16,
//     lineHeight: 19,
//     fontFamily: "Roboto-Regular",
//   },
//   input: {
//     height: 50,
//     paddingTop: 16,
//     paddingBottom: 16,
//     borderColor: "#E8E8E8",
//     borderBottomWidth: 1,
//     marginBottom: 32,
//     justifyContent: "center",
//   },
//   iconMap: {
//     position: "absolute",
//   },
//   button: {
//     height: 51,
//     padding: 16,
//     backgroundColor: "#f6f6f6",
//     borderRadius: 100,
//     alignItems: "center",
//   },
//   textButton: {
//     fontFamily: "Roboto-Regular",
//     fontSize: 16,
//     lineHeight: 19,
//     color: "#bdbdbd",
//   },
//   buttonDelete: {
//     height: 40,
//     width: 70,
//     backgroundColor: "#f6f6f6",
//     borderRadius: 100,
//     alignItems: "center",
//     justifyContent: "center",
//     marginLeft: "auto",
//     marginRight: "auto",
//     marginTop: 120,
//   },
// });
