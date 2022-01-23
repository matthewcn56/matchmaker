import React, { useContext, useState, useEffect } from "react";
import styles from "../styles.js";
import Profile from "../components/Profile";
import { Text, View, Button, Image, TextInput, ScrollView } from "react-native";
import { AuthContext } from "../navigation/AuthProvider.js";
import {
  getDoc,
  doc,
  getDocs,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../db/firebaseFunctions";

import SendToModal from "../components/SendToModal";

export default function HomeScreen() {
  const [allProfiles, setAllProfiles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    const profilesUnsubscribe = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const profiles = snapshot.docs.map((doc) => doc.data());
        setAllProfiles(profiles);
      }
    );
    return () => {
      profilesUnsubscribe();
    };
  }, []);
  const displayedProfiles = allProfiles.map((profile) => (
    <Profile
      setModalVisible={setModalVisible}
      key={profile.uid}
      profile={profile}
    />
  ));
  return (
    <ScrollView>
      <SendToModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      ></SendToModal>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
        }}
      >
        {displayedProfiles}
      </View>
    </ScrollView>
  );
}
