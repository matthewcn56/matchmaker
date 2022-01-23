import React, { useContext } from "react";
import global from "../styles.js";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

import Profile from "../components/Profile.js";
import { AuthContext } from "../navigation/AuthProvider.js";
import { denyMatch, requestMatch } from "../db/firebaseFunctions.js";

export default function Swipe() {
  const { user, toSwipe } = useContext(AuthContext);
  const allProfiles = toSwipe.map((id) => (
    <Profile swipe={true} id={id} key={id} />
  ));
  const displayedProfile = allProfiles[toSwipe.length - 1];
  const displayedUid = toSwipe[toSwipe.length - 1];
  return (
    <View style={[global.container, { paddingVertical: 50 }]}>
      {/* <Text>swipe on your ships</Text> */}
      {displayedProfile}
      <View style={[styles.row, { marginTop: 20 }]}>
        <TouchableOpacity
          style={styles.reqButton}
          onPress={() => {
            denyMatch(user.uid, displayedUid);
          }}
        >
          <Entypo name="cross" size={60} color="#EA393D" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            requestMatch(user.uid, displayedUid);
          }}
        >
          <Entypo name="check" size={55} color="#2F2F2F" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  reqButton: {
    // justifyContent: "flex-end"
    margin: 10,
  },
});
