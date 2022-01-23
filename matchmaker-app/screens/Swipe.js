import React, { useContext, useEffect, useState } from "react";
import global from "../styles.js";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

import Profile from "../components/Profile.js";
import { AuthContext } from "../navigation/AuthProvider.js";
import {
  denyMatch,
  getUserProfile,
  requestMatch,
} from "../db/firebaseFunctions.js";

export default function Swipe() {
  const { user, toSwipe } = useContext(AuthContext);
  console.log(toSwipe);
  const [allProfiles, setAllProfiles] = useState([]);
  useEffect(() => {
    const grabProfiles = async () => {
      const newPeople = await Promise.all(
        toSwipe.map(async (swipe) => {
          const personUid = swipe;
          const person = await getUserProfile(personUid);
          console.log(person);
          console.log("SWIPE", person);
          return <Profile profile={person} key={person.uid} />;
        })
      );
      setAllProfiles(newPeople);
    };

    if (toSwipe.length < 1) {
      return;
    }
    grabProfiles();
  }, [toSwipe]);
  // useEffect(() => {
  //   const grabProfiles = async () => {
  //     const profiles = toSwipe.map(async (uid) => await getUserProfile(uid));
  //     const profilesData = await Promise.all(profiles);
  //     console.log("PROFILE DATA", profilesData);
  //     setAllProfiles(profilesData);
  //   };
  //   if (toSwipe.length > 0) {
  //     console.log("GRABBING STUFF");
  //     grabProfiles();
  //   }
  // }, [toSwipe]);
  // console.log("ALL PROFILES");
  // console.log(allProfiles);
  let displayedProfile;
  if (allProfiles.length > 0) {
    console.log("NOW ALL PROFILES", allProfiles);
    displayedProfile = allProfiles[toSwipe.length - 1].props.profile;
  }
  console.log("DISPLAYED PROFILES", displayedProfile);
  const displayedUid = toSwipe[toSwipe.length - 1];
  return (
    <View style={[global.container, { paddingVertical: 50 }]}>
      {/* <Text>swipe on your ships</Text> */}
      {toSwipe.length != 0 && displayedProfile ? (
        <View style={[styles.row, { marginTop: 20 }]}>
          <Profile
            key={displayedProfile.uid}
            profile={displayedProfile}
            swipe={true}
          />
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
      ) : (
        <Text>No more profiles</Text>
      )}
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
