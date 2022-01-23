import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import global from "../styles.js";
import img from "../assets/temp.png";

export default function ChatPerson(props) {
  return (
    <TouchableOpacity onPress={() => {props.press()}}>
      <View style={styles.smallContainer}>
        <Image style={styles.img} source={img} />
        <View>
          <Text
            numberOfLines={1}
            style={[
              global.text2,
              {
                fontSize: 20,
                fontFamily: "Poppins_500Medium",
                color: "#2F2F2F",
              },
            ]}
          >
            Name
          </Text>
          <Text
            numberOfLines={1}
            style={[global.text3, { color: "#BCBCBC", flex: 1 }]}
          >
            wow this is a very long message i must really like you or maybe im
            just using stupid pickup lines
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    smallContainer: {
      flexDirection:'row',
      flexWrap: 'nowrap',
      paddingVertical: 15,
      borderBottomColor: "#EAEAEA",
      borderBottomWidth: 0.5,
      borderStyle: "solid",
      marginLeft: 15,
    },
    img: {
      width: 70,
      height: 70,
      borderRadius: 50,
      marginRight: 15,
    },
    lastMessage: {
      color: "#BCBCBC", flex: 1, width: 300
    }
  });
