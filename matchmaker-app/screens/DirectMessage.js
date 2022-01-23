import React from 'react';
import { Text , View, ScrollView, TextInput, StyleSheet, Image} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import global from "../styles"

export function MeText(props) {
    return(
        <View style={[styles.textMe]}>
            <Text style={[global.text3, {textAlign: "right"}]}>{props.message.text}</Text>
        </View>
    );
}

export function OtherText(props) {
    return(
        <View style={styles.textOther}>
            <Text style={global.text3}>{props.message.text}</Text>
        </View>
    );
}

export default function DirectMessage() {
    const other = require("../assets/temp.png")
    const me = require("../assets/temp.png")

    const messages = [
        {
            text: "hey girl did it hurt when you fell from heaven?",
            date: new Date('January 20, 2022 03:24:00'),
            me: false
        },
        {
            text: "cuz ur hot af ahaha",
            date: new Date('January 20, 2022 03:25:00'),
            me: false
        },
        {
            text: "btw im 5'11",
            date: new Date('January 20, 2022 03:26:00'),
            me: false
        },
        {
            text: "ew gross",
            date: new Date('January 22, 2022 03:20:00'),
            me: true
        },
        {
            text: "idk im bored why not",
            date: new Date('January 22, 2022 03:20:30'),
            me: true
        },
        {
            text: "oh well",
            date: new Date('January 22, 2022 03:21:00'),
            me: true
        },
        {
            text: "hey girl did it hurt when you fell from heaven?",
            date: new Date('January 23, 2022 03:24:00'),
            me: false
        },
        {
            text: "cuz ur hot af ahaha",
            date: new Date('January 23, 2022 03:25:00'),
            me: false
        },
        {
            text: "btw im 5'11",
            date: new Date('January 23, 2022 03:26:00'),
            me: false
        },
    ]

    return(
      <View style={{
        flex: 1,
        padding:15,
        flexDirection:'column',
        // backgroundColor: "#F6F6F6",
        backgroundColor: 'white',
        // alignItems: "center",
        justifyContent: "space-between",
    }}>
        {/* <View style={styles.profileImageContainer}> */}
           <Image
            style={styles.profileImage}
            source={other}
          /> 
          <Text style={[global.text2, {alignSelf: 'center', marginBottom: 20}]}>Name</Text>
        {/* </View> */}
        
        <ScrollView >
            <View>
                {/* <MeText message={messages[0]}/>
                <OtherText message={messages[1]}/> */}
                 {messages.map((item, index) =>
                    {return (
                        <View>
                            {item.me ? 
                                <MeText message={item}/> : 
                                <OtherText message={item}/>
                            }
                            {/* {item.me ? 
                            <Image style={styles.profileImage} source={me}/> :
                            <Image style={styles.profileImage} source={other}/>
                            } */}
                        </View>
                    )}
                )}
            </View>
        </ScrollView>
        <View style={{flexDirection:'row', alignItems: "center", marginHorizontal: 10}}>
                <TextInput style={[global.input, {flexGrow: 15}]}/>
                <MaterialCommunityIcons style={{flexBasis:20, flexGrow: 1, marginTop: 10}} name="send-circle" size={40} color="#EA393D" />
            </View>
      </View>
    )
}

const styles = StyleSheet.create({
    textMe: {
        alignSelf: 'flex-end',
        padding: 10,
        borderRadius: 14,
        borderBottomRightRadius: 0,
        margin: 1,
        backgroundColor: '#EA393D',
        
    },
    textOther: {
        alignSelf: 'flex-start',
        padding: 10,
        borderRadius: 14,
        borderBottomLeftRadius: 0,
        margin: 1,
        backgroundColor: '#EAEAEA',
        maxWidth: 250
    },
    profileImage: {
        height: 50,
        width: 50,
        borderRadius: 100,
        margin: 5,
        alignSelf:'center'
    },
    profileImageContainer: {
        borderColor: "#EA393D",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 100,
        margin: 20,
        // marginBottom: 10,
        flexDirection:'row',
        alignItems: "center",
    },
 });