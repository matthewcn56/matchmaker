import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeStack from "./HomeStack";
import AuthStack from "./AuthStack";
import { AuthContext } from "./AuthProvider";
import { ActivityIndicator } from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {
  getDoc,
  doc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../db/firebaseFunctions";

export default function NavigationStack() {
  const {
    user,
    setUser,
    setFriendUids,
    setIncomingFriendRequestUids,
    setChatIDs,
    setChats,
    chats,
    chatIDs,
    setToSwipe,
  } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(true);

  //set up firebase listener for user doc if exists, and firebase listener for chats if user exists
  useEffect(() => {
    //make empty once again if no user
    if (!user) {
      setFriendUids([]);
      setIncomingFriendRequestUids([]);
      setChatIDs([]);
      setToSwipe([]);
      return;
    }
    const userUnsubscribe = onSnapshot(
      doc(db, "users", user.uid),
      (userDocument) => {
        const userDocData = userDocument.data();
        const friendDocData = userDocData.friends ?? [];
        const friendRequestData = userDocData.friendRequests ?? [];
        const toSwipeData = userDocData.toSwipe ?? [];
        setFriendUids(friendDocData);
        setIncomingFriendRequestUids(friendRequestData);
        setToSwipe(toSwipeData);
      }
    );
    console.log("set up doc listener for user!");

    const chatQuery = query(
      collection(db, "chats"),
      where("participants", "array-contains", user.uid)
    );
    const chatUnsubscribe = onSnapshot(chatQuery, (querySnapshot) => {
      const chatsData = querySnapshot.docs.map((document) => ({
        ...document.data(),
        id: document.id,
      }));
      //console.log("CHATS DATA");
      //console.log(chatsData);
      const newChatIDs = chatsData.map((chat) => chat.id);
      setChats(chatsData);
      setChatIDs(newChatIDs);
    });
    console.log("set up doc listener for chats");
    return () => {
      if (userUnsubscribe) {
        console.log("Detaching listener to user");
        userUnsubscribe();
      }
      if (chatUnsubscribe) {
        console.log("Detaching listener to chats");
        userUnsubscribe();
      }
    };
  }, [user]);

  //firebase listeners for chatIDs
  useEffect(() => {
    console.log("chat fired");
    console.log(chats.length);
    if (chatIDs.length < 1) {
      return;
    }
    //handle initial setup

    const chatListeners = chatIDs.map((id) =>
      onSnapshot(
        query(collection(db, "chats", id, "messages"), orderBy("date", "asc")),
        (snapshot) => {
          console.log(" a message was sent!");
          const msgData = snapshot.docs.map((document) => document.data());
          const updatedChats = chats.map((chat) => {
            console.log("setting an individual");
            if (chat.id === id) {
              return {
                ...chat,
                messages: msgData,
              };
            } else
              return {
                ...chat,
              };
          });
          setChats(updatedChats);
        }
      )
    );
    console.log("Set up listener for individual chat rooms");
    return () => {
      if (chatListeners & (chatListeners.length > 0)) {
        chatListeners.forEach((unsubscribeChat) => unsubscribeChat());
      }
    };
  }, [chatIDs]);

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(function (user) {
      // setUser(user);
      try {
        if (!user) {
          setUser(null);
          if (initializing) setInitializing(false);
          setLoading(false);
          console.log("User is null");
          return;
        }
        //at this point, user is defined
        const userRef = doc(db, "users", user.uid);
        // const userSnapshot = await getDoc(userRef);
        //console.log(user);
        getDoc(userRef).then((userSnapshot) => {
          if (userSnapshot.exists()) {
            console.log(userSnapshot.data());
            setUser(userSnapshot.data());
          } else {
            setUser({
              displayName: user.displayName,
              profilePic: user.photoURL,
              uid: user.uid,
            });
          }
          if (initializing) setInitializing(false);
          setLoading(false);
        });
        // console.log("User changed!");
        // console.log(user);
      } catch (err) {
        console.error(err);
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
      {/* <HomeStack></HomeStack> */}
    </NavigationContainer>
  );
}
