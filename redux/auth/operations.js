import db from "../../firebase/config";
import { authSlice } from "./slice";

const { authStateChangeUser, authSignOut, updateUserProfile } =
  authSlice.actions;

//Реєстрація
export const authSignUpUser =
  ({ email, password, nickName }) =>
  async (dispatch, getState) => {
    console.log(nickName);
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);
      const user = await db.auth().currentUser;
      await user.updateProfile({ displayName: nickName, email });

      const userUpdateProfile = {
        userId: user.uid,
        nickName: user.displayName,
        email: user.email,
      };

      dispatch(updateUserProfile(userUpdateProfile));
      dispatch(authStateChange({ stateChange: true }));
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };
//Вхід
export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

//Вихід
export const authSignOutUser = () => async (dispatch, getState) => {
  await db.auth().signOut();
  dispatch(authSignOut());
};

export const authStateChange = () => async (dispatch, getState) => {
  await db.auth().onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        nickName: user.displayName,
        email: user.email,
      };
      dispatch(updateUserProfile(userUpdateProfile));
      dispatch(authStateChangeUser({ stateChange: true }));
    }
  });
};
