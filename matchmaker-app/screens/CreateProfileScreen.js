import React, {useReducer, useState} from 'react'
import global from "../styles.js";
import { Checkbox } from 'react-native-paper';
import { FontAwesome } from "@expo/vector-icons";
import {Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'

import Slider from '@react-native-community/slider';


export default function CreateProfileScreen(){
    const [userInfo, dispatchUserInfo] = useReducer(
        infoReducer,
        initialInfo
    );

    const[age, setAge] = useState(18)
    const [men, setMen] = useState(false);
    const [women, setWomen] = useState(false);
    const [nb, setNB] = useState(false);

    return(
        <View style={[global.containerNoCenter, {paddingLeft: 50}]}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[global.title, {paddingTop: 50}]}>MatchMaker</Text>
            <Text style={global.text2}>Let's get you set up.</Text>
            <View style = {styles.inputSection}>
            <Text style={[global.text3, styles.label]}>Name:</Text>
            <TextInput
                style={global.input}
                // placeholder="Name"
                value={userInfo.name}
                onChangeText={(event) => dispatchUserInfo({type: "name", body: event})} //reducer is smart enough to know what the previous info is 
            />      
            {/* <TextInput
                style={global.input}
                placeholder="Age"
            /> */}
            <Text style={[global.text3, styles.label]}>Age: {age}</Text>
            <Slider
                style={{height: 40}}
                minimumValue={18}
                maximumValue={100}
                step={1}
                minimumTrackTintColor="#EA393D"
                maximumTrackTintColor="#EAEAEA"
                onValueChange={value => setAge(value)}
            />
            {/* <Text>Value: {this.state.value}</Text> */}
            <Text style={[global.text3, styles.label]}>Gender</Text>
            <Text style={[global.text3, styles.label]}>Looking For</Text>
            <View style={styles.section}>
                <View  style={{
                        borderType: 'solid',
                        borderWidth: 1,
                        margin: 5,
                        borderColor: 'red',
                        borderRadius: 30
                    }}>
                <Checkbox
                    status={men ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setMen(!men);
                    }}
                    style={{margin: 0}}
                    color={'#EA393D'}
                />
                </View>
                <Text style={[global.text3, styles.labelCheck]}>Men</Text>
            </View>
            <View style={styles.section}>
                <View  style={{
                        borderType: 'solid',
                        borderWidth: 1,
                        margin: 5,
                        borderColor: 'red',
                        borderRadius: 30
                    }}>
                <Checkbox
                    status={women ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setWomen(!women);
                    }}
                    style={{margin: 0}}
                    color={'#EA393D'}
                />
                </View>
                <Text style={[global.text3, styles.labelCheck]}>Women</Text>
            </View>
            <View style={styles.section}>
                <View  style={{
                        borderType: 'solid',
                        borderWidth: 1,
                        margin: 5,
                        borderColor: 'red',
                        borderRadius: 30
                    }}>
                <Checkbox
                    status={nb ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setNB(!nb);
                    }}
                    style={{margin: 0}}
                    color={'#EA393D'}
                />
                </View>
                <Text style={[global.text3, styles.labelCheck]}>Non-Binary People</Text>
            </View>
            <Text style={[global.text3, styles.label]}>Bio</Text>
            <TextInput
                style={[global.input, {height: 100, borderRadius: 10}]}
                multiline={true}
                numberOfLines={4}
                // placeholder="Bio"
            />
            <TouchableOpacity style={global.button} onPress={() => console.log(userInfo)}>
                <Text style={global.text}>Let's get started!</Text>
            </TouchableOpacity>
            </View>
            <FontAwesome style={{marginTop:90, marginBottom:100,alignSelf:'center'}} name="heart" color={"#EAEAEA"} size={24} />
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
   inputSection: {
       marginTop: 20
   },
   label: {
        fontSize: 15, marginTop: 10, color: "#2F2F2F"
   },
   labelCheck: {
    fontSize: 15, color: "#2F2F2F"
    },
   section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:5
    },
    checkbox: {
        borderWidth: 1,
        margin: 5,
        borderColor: 'red',
        borderRadius: 30,
    },

})

//REDUCER SETUP
const initialInfo = {
    name: "",
    age: 0,
    gender: "",
    sexuality: "",
    bio: ""
};

const infoReducer = (prevInfo, action) => {
    switch(action.type){
        case "name": {
            return {
                ...prevInfo,
                name: action.body
            }
        }
        case "age":{

        }
        case "gender":{

        }
        case "sexuality":{

        }
        case "bio":{

        }
    }
}

