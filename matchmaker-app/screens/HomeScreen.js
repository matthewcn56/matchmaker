import React, { useContext, useState, useEffect } from "react";
import styles from "../styles.js";
import Profile from "../components/Profile";
import { Text, View, Button, Image, TextInput, ScrollView } from "react-native";

export default function HomeScreen() {
  // const { user, logout } = useContext(AuthContext);
  // const [friendId, setFriendID] = useState("");

  return (
    <ScrollView>
      <View style={{
      flex: 1,
      backgroundColor: 'white',
      alignItems: "center",
      }}>
      <Profile></Profile>
      <Profile></Profile>
      <Profile></Profile>
    </View>
    </ScrollView>
  );
}
