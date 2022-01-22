import React, {useState} from "react";
import styles from "../styles.js";
import { Text, View } from "react-native";

import PersonSmall from "../components/PersonSmall.js";

export default function Chat() {
  const [isDMMode, setDMMode] = useState(false);
  
  return (
    <View style={styles.container}>
      <Text>Chat</Text>

      <PersonSmall></PersonSmall>
      <PersonSmall></PersonSmall>
      <PersonSmall></PersonSmall>
    </View>
  );
}