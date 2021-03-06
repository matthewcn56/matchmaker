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
  getDocs,
  query,
  where,
  arrayUnion,
  arrayRemove,
  runTransaction,
  Timestamp,
  addDoc,
  getDoc,
} from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
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

export function updateProfile(newInfo, uid) {
  const profileRef = doc(db, "users", uid);
  updateDoc(profileRef, {
    ...newInfo,
    uid: uid,
  });
}

export async function getUserChats(uid) {
  const userQuery = query(
    collection(db, "chats"),
    where("users", "array-contains", uid)
  );
  const queryResult = await getDocs(userQuery);
  const messagesWith = queryResult.docs.map((chat) => ({
    ...chat.data(),
    id: chat.id,
  }));
  return messagesWith;
}

export async function makeChatMsg(chatID, uid, msg) {
  const chatRef = doc(db, "chats", chatID);
  setDoc(chatRef, {
    date: Date.now(),
    msg: msg,
    from: uid,
  });
}

export async function acceptFriendRequest(uid, incomingUid) {
  try {
    const friendBatch = writeBatch(db);
    const selfRef = doc(db, "users", uid);
    friendBatch.update(selfRef, {
      friends: arrayUnion(incomingUid),
      friendRequests: arrayRemove(incomingUid),
    });
    const complementRef = doc(db, "users", incomingUid);
    friendBatch.update(complementRef, {
      friends: arrayUnion(uid),
    });
    await friendBatch.commit();
    alert("Friend request accepted!");
  } catch (err) {
    console.error(err);
  }
}

export async function denyFriendRequest(uid, incomingUid) {
  try {
    const selfRef = doc(db, "users", uid);
    await updateDoc(selfRef, {
      friendRequests: arrayRemove(incomingUid),
    });
    alert("Friend request denied!");
  } catch (err) {
    console.error(err);
  }
}

export async function findUsersByName(name) {
  //console.log(name);
  const q = query(collection(db, "users"), where("displayName", "==", name)); //TODO: figure out why queury finds nothing now
  try {
    const snapshot = await getDocs(q);
    //console.log(snapshot.docs);
    const users = snapshot.docs.map((doc) => doc.data());
    // console.log("Users is: ", users); //debug
    return users;
  } catch (e) {
    console.error(e);
  }
}

export async function getAllUsers() {
  const userData = await getDocs(collection(db, "users"));
  return userData.docs.map((doc) => doc.data());
}

//pass in uid. friendUIDs is a list
export async function getNonFriendedUsers(uid, friendUIDs) {
  //need to pass in the list of people you've already requested
  const allUsers = await getAllUsers();
  const nonFriends = allUsers.filter((user) => !friendUIDs.includes(user.uid));
  return nonFriends;
}

// sign in and sign out shenanigans
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

export async function sendFriendRequest(uid, friendUid) {
  try {
    await updateDoc(doc(db, "users", friendUid), {
      friendRequests: arrayUnion(uid),
    });
    alert("Sent friend request!");
  } catch (err) {
    console.error("Error sending fr", err);
  }
}

export async function recommendMatch(friendUid, recommendeeUID) {
  try {
    await updateDoc(doc(db, "users", friendUid), {
      toSwipe: arrayUnion(recommendeeUID),
    });
    alert("Recommended to friend!");
  } catch (err) {
    console.error(err);
  }
}

export async function denyMatch(uid, matchUid) {
  try {
    await updateDoc(doc(db, "users", uid), {
      toSwipe: arrayRemove(matchUid),
    });
  } catch (err) {
    console.error(err);
  }
}

export async function requestMatch(uid, matchUid) {
  try {
    //let mutual = false;
    await runTransaction(db, async (transaction) => {
      const matchRef = doc(db, "users", matchUid);
      const userRef = doc(db, "users", uid);
      const matchDoc = await transaction.get(matchRef);
      if (!matchDoc.exists()) {
        alert("Invalid profile!");
        return;
      }
      const matchRequested = matchDoc.data().matchRequested;
      //console.log(matchRequested);
      //if mutual match
      if (matchRequested && matchRequested.includes(uid)) {
        console.log("Match!");
        await acceptMatch(uid, matchUid, transaction);
      } else {
        transaction.update(userRef, {
          matchRequested: arrayUnion(matchUid),
          toSwipe: arrayRemove(matchUid),
        });
      }
    });
  } catch (err) {
    console.error(err);
  }
}

export async function acceptMatch(uid, matchUid, transaction) {
  try {
    //const batch = writeBatch(db);
    const userRef = doc(db, "users", uid);
    //remove from swipe
    transaction.update(userRef, {
      toSwipe: arrayRemove(matchUid),
      matchRequested: arrayRemove(matchUid),
    });

    const complementRef = doc(db, "users", matchUid);
    //remove from swipe
    transaction.update(complementRef, {
      toSwipe: arrayRemove(uid),
      matchRequested: arrayRemove(uid),
    });

    const newChatRef = doc(collection(db, "chats"));
    transaction.set(newChatRef, {
      participants: [uid, matchUid],
    });
    const newMsgRef = doc(collection(newChatRef, "messages"));
    transaction.set(newMsgRef, {
      date: Timestamp.now(),
      text: "I matched with you, let's talk!",
      from: uid,
    });
    //await batch.commit();
  } catch (err) {
    console.error(err);
  }
}

export async function sendMsg(msg, uid, chatID) {
  try {
    const chatRef = doc(db, "chats", chatID);
    const newMsgRef = await addDoc(collection(chatRef, "messages"), {
      date: Timestamp.now(),
      text: msg,
      from: uid,
    });
  } catch (err) {
    console.error(err);
  }
}

export async function getAllFriends(uid) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();
  return userData.friends ?? [];
}

export async function getUserProfile(uid) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    alert("User doesn't exist!");
  }
}

export async function getUserProfileTransaction(uid, transaction) {
  const userRef = doc(db, "users", uid);
  const userSnap = await transaction.get(userRef);
  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    alert("User doesn't exist!");
  }
}

export async function logout() {
  try {
    firebase.auth().signOut();
  } catch (e) {
    console.error(e);
  }
}
