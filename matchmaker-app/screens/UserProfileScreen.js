import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../navigation/AuthProvider.js";
import global from "../styles.js";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import { addFriend, findUsersByName, acceptMatch, getNonFriendedUsers } from "../db/firebaseFunctions";

import PersonSmall from "../components/FriendRequest";
import { TouchableOpacity } from "react-native-gesture-handler";
import PossibleFriend from "../components/PossibleFriend";

export default function UserProfileScreen() {
  const { user, logout, friendUids, incomingFriendRequestUids } =
    useContext(AuthContext);
  // const [friendId, setFriendID] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [possibleFriends, setPossibleFriends] = useState([]); //array of possible people you can friend

  //set possible friends when first mounted
  useEffect(()=> {
    const grabPossibleFriends = async() => {
      const possFriends = await getNonFriendedUsers(user.uid, friendUids); //TODO: also filter out users who you sent requests to but haven't responded
      setPossibleFriends(possFriends); 
    };
    grabPossibleFriends();   
  },[])

  const displayedFriendRequests = incomingFriendRequestUids.map((uid) => (
    <PersonSmall uid={uid} key={uid} />
  ));

  const renderPossibleFriends = () => {
    let tempPossibleFriends = [...possibleFriends]; //copy possible friends
    if (searchValue !== ""){
      tempPossibleFriends = tempPossibleFriends.filter(
        (friend) => friend.displayName.slice(0, searchValue.length).toLowerCase() === searchValue.toLowerCase() //TODO: add a tolower 
      );
    }
    return tempPossibleFriends.map((friendObj, index) => 
      <PossibleFriend 
      friend={friendObj} 
      onAccept={() => {
        let newPossibleFriends = [
          ...possibleFriends.slice(0, index),
          ...possibleFriends.slice(index+1),
        ]
        setPossibleFriends(newPossibleFriends);
      }}
      />
    )
  }

  return (
    <ScrollView>
      <View
        style={[
          global.container,
          { marginHorizontal: -20, paddingVertical: 20 },
        ]}
      >
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.profileImage}
            source={{ uri: user.profilePic || user.photoURL }}
          />
        </View>

        <View style={[styles.buttonSection, { marginTop: 0 }]}>
          <TouchableOpacity
            onPress={logout}
            title="Log Out"
            style={global.button}
          >
            <Text style={global.text}>Edit Profile </Text>
          </TouchableOpacity>
          <TouchableOpacity title="Edit" style={global.button}>
            <Text style={[global.text]}>Log Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.friendSection}>
          <Text style={[global.text2, { marginVertical: 15 }]}>
            Friend Requests
          </Text>
          {displayedFriendRequests}
          <Text style={[global.text2, { marginVertical: 15 }]}>
            Find Friends
          </Text>

          <TextInput
            placeholder="Search Name"
            onChangeText={(text) => setSearchValue(text)}
            value={searchValue}
          />

          <Button
            onPress={async () => {
              setSearchValue("");
            }}
            title="Find User By Name"
          />
 
          {renderPossibleFriends()}
          
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonSection: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  profileImage: {
    height: 125,
    width: 125,
    borderRadius: 100,
    margin: 5,
  },
  profileImageContainer: {
    borderColor: "#EA393D",
    borderWidth: 5,
    borderStyle: "solid",
    borderRadius: 100,
    marginBottom: 10,
  },
  friendSection: {
    alignItems: "flex-start",
    alignSelf: "stretch",
    paddingHorizontal: 50,
  },
});
