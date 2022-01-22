//import firebase from "firebase";
import apiKeys from "../config/apiKeys";
import * as Google from "expo-google-app-auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import BatchedBridge from "react-native/Libraries/BatchedBridge/BatchedBridge";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase
//const app = initializeApp(apiKeys.firebaseConfig);
if (!firebase.apps.length) app = firebase.initializeApp(apiKeys.firebaseConfig);
else app = firebase.app();
let db = getFirestore();
export { db };
console.log("Firebase set up!");

const isUserEqual = (googleUser, firebaseUser) => {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId ===
          firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()
      ) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
};

const onSignIn = (googleUser) => {
  //console.log("Google Auth Response", googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.

      const credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.idToken, //Changed from original, check 3:00 of tutorial
        googleUser.accessToken
      );

      // Sign in with credential from the Google user.
      //console.log(credential);
      firebase
        .auth()
        .signInWithCredential(credential)
        .then(function (result) {
          console.log("Signed in!");

          if (result.additionalUserInfo.isNewUser) {
            setProfile(result);
          }
        })
        .catch(function (error) {
          // Handle Errors here.
          console.log("error signing in");
          console.error(error);
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    } else {
      console.log("User already signed-in Firebase.");
    }
  });
};

function setProfile(result) {
  //   db.ref("users/" + result.user.uid).set({
  //     uid: result.user.uid,
  //     profilePic: result.user.photoURL,
  //     displayName: result.user.displayName,
  //   });
  setDoc(doc(db, "users", result.user.uid), {
    uid: result.user.uid,
    profilePic: result.user.photoURL,
    displayName: result.user.displayName,
  });
  // db.collection("users").doc(result.user.uid).set({
  //   uid: result.user.uid,
  //   profilePic: result.user.photoURL,
  //   displayName: result.user.displayName,
  // });
}

function updateProfile(newInfo) {
  const profileRef = doc(db, "users", uid);
  updateDoc(profileRef, {
    ...newInfo,
    uid: uid,
  });
}

export async function addFriend(uid, friendUid) {
  try {
    const friendBatch = writeBatch(db);
    const friendRef = doc(db, "users", uid, "friends", friendUid);
    friendBatch.set(friendRef, {
      uid: friendUid,
    });
    const complementRef = doc(db, "users", friendUid, "friends", uid);
    friendBatch.set(complementRef, {
      uid: uid,
    });
    await friendBatch.commit();
    console.log("Added friend successfully!");
  } catch (err) {
    console.error(err);
  }
}

export async function login() {
  try {
    const result = await Google.logInAsync({
      androidClientId: apiKeys.authClient.androidID,
      iosClientId: apiKeys.authClient.iosID,
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      onSignIn(result);

      return result.accessToken;
    } else {
      console.log("Cancelled");
    }
  } catch (e) {
    console.log("error");
  }
}

export async function logout() {
  try {
    firebase.auth().signOut();
  } catch (e) {
    console.error(e);
  }
}
