import React, { useContext } from "react";
import styles from "../styles.js";
import Profile from "../components/Profile";
import { Text, View, Button, Image, TextInput, ScrollView } from "react-native";
import { AuthContext } from "../navigation/AuthProvider.js";

export default function HomeScreen() {
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
