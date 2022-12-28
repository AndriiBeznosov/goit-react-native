// import * as firebase from "firebase";
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyC0f-p5oQxBvgt8NvXxcTJmTppZqvWs74c",
//   authDomain: "photo-gallery-342c4.firebaseapp.com",
//   databaseURL: "https://photo-gallery-342c4-default-rtdb.firebaseio.com",
//   projectId: "photo-gallery-342c4",
//   storageBucket: "photo-gallery-342c4.appspot.com",
//   messagingSenderId: "879147834306",
//   appId: "1:879147834306:web:ff5f02d6dffd065a29945b",
// };

// export default firebase.initializeApp(firebaseConfig);

import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  // apiKey: "AIzaSyC0f-p5oQxBvgt8NvXxcTJmTppZqvWs74c",
  // authDomain: "photo-gallery-342c4.firebaseapp.com",
  // databaseURL: "https://photo-gallery-342c4-default-rtdb.firebaseio.com",
  // projectId: "photo-gallery-342c4",
  // storageBucket: "photo-gallery-342c4.appspot.com",
  // messagingSenderId: "879147834306",
  // appId: "1:879147834306:web:ff5f02d6dffd065a29945b",
  apiKey: "AIzaSyC23XUl0rdPD3fACYtY1OYQeaGxuQU3-7c",
  authDomain: "photo-gallery2-86156.firebaseapp.com",
  projectId: "photo-gallery2-86156",
  storageBucket: "photo-gallery2-86156.appspot.com",
  messagingSenderId: "315920150212",
  appId: "1:315920150212:web:b595324c38db2801286391",
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
