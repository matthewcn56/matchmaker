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

import {
  addFriend,
  findUsersByName,
  acceptMatch,
  sendMsg,
  getNonFriendedUsers
} from "../db/firebaseFunctions";
import FriendModal from "../components/FriendModal.js";

import PersonSmall from "../components/FriendRequest";
import { TouchableOpacity } from "react-native-gesture-handler";
import PossibleFriend from "../components/PossibleFriend";

export default function UserProfileScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { user, logout, friendUids, incomingFriendRequestUids } =
    useContext(AuthContext);
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
        (friend) => friend.displayName.slice(0, searchValue.length).toLowerCase() === searchValue.toLowerCase() 
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
      <FriendModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      ></FriendModal>
      <View
        style={[
          global.container,
          { marginHorizontal: -20, paddingVertical: 20, minHeight: 700, },
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
            title="Edit"
            style={global.button}
            onPress={ () => navigation.navigate('CreateProfile')}
          >
            <Text style={global.text}>Edit Profile </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            title="Log Out" 
            style={global.button} 
            onPress={logout}>
            <Text style={[global.text]}>Log Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.friendSection}>
          <Text style={[global.text2, { marginVertical: 15 }]}>
            Friend Requests
          </Text>
          {displayedFriendRequests}

          <TouchableOpacity
            onPress={async () => {
              setPossibleFriends(await findUsersByName(searchValue));
              setSearchValue("");
              setModalVisible(true);
            }}
            title="Find User By Name"
            style={global.button}
          >
            <Text style={[global.text, {}]}>Find Friends </Text>
          </TouchableOpacity>
          
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
