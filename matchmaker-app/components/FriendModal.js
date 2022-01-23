import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  Alert, Modal, Pressable
} from "react-native";
import global from "../styles.js";
import PossibleFriend from "./PossibleFriend.js";

export default function FriendModal(props) {
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

            <PossibleFriend setModalVisible={props.setModalVisible}></PossibleFriend>
            <PossibleFriend setModalVisible={props.setModalVisible}></PossibleFriend>
            <PossibleFriend setModalVisible={props.setModalVisible}></PossibleFriend>
            <PossibleFriend setModalVisible={props.setModalVisible}></PossibleFriend>

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