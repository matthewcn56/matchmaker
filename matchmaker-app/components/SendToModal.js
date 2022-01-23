import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../navigation/AuthProvider.js";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  Alert, Modal, Pressable
} from "react-native";
import {
  getAllFriends,
  getUserProfile
} from "../db/firebaseFunctions";
import global from "../styles.js";
import Friend from "./Friend.js";

export default function FriendModal(props) {
  const { user, logout, friendUids, incomingFriendRequestUids } = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState("");
  const [friends, setFriends] = useState([]);
  

  //set possible friends when first mounted
  useEffect(()=> {
    const grabFriends = async() => {
      const friendsIDs = await getAllFriends(user.uid, friendUids); //TODO: change this to be a function that returns an array of objects
      const friends = friendsIDs.map(async (uid) => await getUserProfile(uid));
      friendObjects = await Promise.all(friends)
      setFriends(friendObjects); 
    };
    grabFriends();   
  },[])

  const renderFriends = () => {
    let tempFriends = [...friends]; //copy possible friends
    if (searchValue !== ""){
      tempFriends = tempFriends.filter(
        (friend) => friend.displayName.slice(0, searchValue.length).toLowerCase() === searchValue.toLowerCase() 
      );
    }

    return tempFriends.map((friendObj, index) => 
      <Friend 
      setModalVisible={props.setModalVisible}
      friend={friendObj} 
      onAccept={() => {
        let newFriends = [
          ...friends.slice(0, index),
          ...friends.slice(index+1),
        ]
        setFriends(newFriends);
      }}
      />
    )
  }

  return (
    <Modal
        visible={props.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          props.setModalVisible(!props.modalVisible);
        }}>
        <View style={styles.centeredView}>
            <Text style={global.text2}>Send to a Friend</Text>
            <TextInput
            style={[global.input, {width: 300, marginTop: 20, marginVertical: 20}]}
            placeholder="Search Name"
            // onChangeText={(text) => setFriendName(text)}
            // value={friendName}
            />

            {renderFriends()}

            <Pressable
              style={global.button}
              onPress={() => props.setModalVisible(!props.modalVisible)}>
              <Text style={global.text}>Cancel</Text>
            </Pressable>
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})