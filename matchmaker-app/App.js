import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import styles from "./styles.js";
import NavigationStack from "./navigation/NavigationStack";
import Providers from "./navigation/index";

import {
  useFonts,
  // Poppins_100Thin,
  // Poppins_100Thin_Italic,
  // Poppins_200ExtraLight,
  // Poppins_200ExtraLight_Italic,
  // Poppins_300Light,
  // Poppins_300Light_Italic,
  Poppins_400Regular,
  // Poppins_400Regular_Italic,
  // Poppins_500Medium,
  // Poppins_500Medium_Italic,
  // Poppins_600SemiBold,
  // Poppins_600SemiBold_Italic,
  // Poppins_700Bold,
  // Poppins_700Bold_Italic,
  // Poppins_800ExtraBold,
  // Poppins_800ExtraBold_Italic,
  // Poppins_900Black,
  // Poppins_900Black_Italic 
} from '@expo-google-fonts/poppins';

export default function App() {

  const [loaded] = useFonts({
    title: require('./assets/fonts/klarissa.regular.ttf'),
    Poppins_400Regular
  });

  if (!loaded) {
    return null;
  }
  return <Providers />;
}
