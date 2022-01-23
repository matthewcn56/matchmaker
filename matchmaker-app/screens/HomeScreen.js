import React, { useContext, useState } from "react";
import styles from "../styles.js";
import Profile from "../components/Profile";
import { Text, View, Button, Image, TextInput, ScrollView} from "react-native";
import { AuthContext } from "../navigation/AuthProvider.js";

import SendToModal from "../components/SendToModal"

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <ScrollView>
      <SendToModal modalVisible={modalVisible} setModalVisible={setModalVisible}></SendToModal>
      <View style={{
      flex: 1,
      backgroundColor: 'white',
      alignItems: "center",
      }}>
      <Profile setModalVisible={setModalVisible}></Profile>
      <Profile setModalVisible={setModalVisible}></Profile>
      <Profile setModalVisible={setModalVisible}></Profile>
    </View>
    </ScrollView>
  );
}
