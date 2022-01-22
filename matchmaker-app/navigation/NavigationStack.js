import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeStack from "./HomeStack";
import AuthStack from "./AuthStack";
import { AuthContext } from "./AuthProvider";
import { ActivityIndicator } from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../db/firebaseFunctions";

export default function NavigationStack() {
  const { user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(true);

  //handle user state changes
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
            setUser(user);
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
    </NavigationContainer>
  );
}
