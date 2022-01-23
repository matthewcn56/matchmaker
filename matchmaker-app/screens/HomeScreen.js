import React, { useContext, useState, useEffect } from "react";
import styles from "../styles.js";
import Profile from "../components/Profile";
import { Text, View, Button, Image, TextInput, ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView>
      <View style={{
      flex: 1,
      backgroundColor: 'white',
      alignItems: "center",
      }}>
      <Profile swipe={false}></Profile>
      <Profile swipe={false}></Profile>
      <Profile swipe={false}></Profile>
    </View>
    </ScrollView>
  );
}
