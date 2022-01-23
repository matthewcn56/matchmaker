import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image
} from "react-native";
import global from "../styles.js";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { TouchableOpacity } from "react-native-gesture-handler";

const colors = ['tomato', 'thistle', 'skyblue', 'teal'];
const images = [
  require("../assets/temp.png"),
  require("../assets/Logo.png"),
  require("../assets/temp.png"),
  require("../assets/Logo.png")
]

export default function Profile(props) {
  return (
    
    <View style={styles.container}>
    <SwiperFlatList
      index={0}
      data={images}
      renderItem={({ item }) => {
        // console.log(item)
        return(
        <View style={[styles.child, { backgroundColor: item }]}>
          {/* <Text style={styles.text}>{item}</Text> */}
          
          <Image style={styles.img} source={item} />
        </View>
      )}
    }
    />
    <View style={{margin: 20, flexDirection:'row', flexWrap:'none', alignItems: 'center'}}>
      <View style={{flexShrink: 1, flexBasis: 300}}>
        <View style={{flexDirection:'row'}}>
          <Text style={global.text2}>Name • 19</Text>
        </View>
        <Text style={global.text3}>why do people have such terrible bios on tinder pls i just want a wife</Text>
      </View>
      {
        !props.swipe &&
      <TouchableOpacity style={{flexBasis: "auto", flexShrink:1, marginLeft: 20}} onPress={() => props.setModalVisible(true)}>
        <MaterialCommunityIcons name="send-circle" size={40} color="#EA393D" />
      </TouchableOpacity>
      }
    </View>
  </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width-40, 
    // flex: 1,
    backgroundColor: 'white',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  child: { 
    
    width: width-40, 
    justifyContent: 'center', 
    // height: 300
  },
  text: { 
    fontSize: 15, 
    textAlign: 'center' 
  },
  img: {
    width: width-40,
    // justifyContent: 'center', 
    height: 300,
    resizeMode: 'cover',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  }
});