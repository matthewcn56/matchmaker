import React from "react";
import global from "../styles.js";
import { Text, View , StyleSheet, TouchableOpacity} from "react-native";
import { Entypo } from '@expo/vector-icons'; 


import Profile from "../components/Profile.js"

export default function Swipe() {
  return (
    <View style={[global.container, {paddingVertical: 50}]}>
      {/* <Text>swipe on your ships</Text> */}
      <Profile swipe={true}></Profile>
      <View style={[styles.row, {marginTop: 20}]}>
        <TouchableOpacity style={styles.reqButton}>
          <Entypo name="cross" size={60} color="#EA393D" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="check" size={55} color="#2F2F2F" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems:'center'
  },
  reqButton: {
    // justifyContent: "flex-end"
    margin: 10
  }
  
});