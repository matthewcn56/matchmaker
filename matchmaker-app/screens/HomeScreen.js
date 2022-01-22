import React from "react";
import styles from "../styles.js";
import { Text, View } from "react-native";

import Profile from "../components/Profile"

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>matchmake your friends</Text>
      <Profile></Profile>
      <Profile></Profile>
      <Profile></Profile>
    </View>
  );
}