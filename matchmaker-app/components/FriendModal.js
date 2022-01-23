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
  addFriend,
  findUsersByName,
  acceptMatch,
  sendMsg,
  getNonFriendedUsers
} from "../db/firebaseFunctions";
import global from "../styles.js";
import PossibleFriend from "./PossibleFriend.js";

export default function FriendModal(props) {
  const { user, logout, friendUids, incomingFriendRequestUids } = useContext(AuthContext);
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

  const renderPossibleFriends = () => {
    let tempPossibleFriends = [...possibleFriends]; //copy possible friends
    if (searchValue !== ""){
      tempPossibleFriends = tempPossibleFriends.filter(
        (friend) => friend.displayName.slice(0, searchValue.length).toLowerCase() === searchValue.toLowerCase() 
      );
    }
    return tempPossibleFriends.map((friendObj, index) => 
      <PossibleFriend 
      setModalVisible={props.setModalVisible}
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
    <Modal
        visible={props.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          props.setModalVisible(!props.modalVisible);
        }}>
        <View style={styles.centeredView}>
            <Text style={global.text2}>Get Connected!</Text>
            <TextInput
            style={[global.input, {width: 300, marginTop: 20, marginVertical: 20}]}
            placeholder="Search Name"
            // onChangeText={(text) => setFriendName(text)}
            // value={friendName}
            />

            {renderPossibleFriends()}
            {/* <PossibleFriend setModalVisible={props.setModalVisible}></PossibleFriend>
            <PossibleFriend setModalVisible={props.setModalVisible}></PossibleFriend>
            <PossibleFriend setModalVisible={props.setModalVisible}></PossibleFriend>
            <PossibleFriend setModalVisible={props.setModalVisible}></PossibleFriend> */}

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