import React, {useReducer, useState} from 'react'
import global from "../styles.js";
import {Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'

// import {Slider} from '@miblanchard/react-native-slider';


export default function CreateProfileScreen(){
    const [userInfo, dispatchUserInfo] = useReducer(
        infoReducer,
        initialInfo
    );

    const[age, setAge] = useState(18)

    return(
        <View style={[global.containerNoCenter, {padding: 50}]}>
        <ScrollView >
            <Text style={global.title}>MatchMaker</Text>
            <Text style={global.text2}>Let's get you set up.</Text>
            <View style = {styles.inputSection}>
            <TextInput
                style={global.input}
                placeholder="Name"
                value={userInfo.name}
                onChangeText={(event) => dispatchUserInfo({type: "name", body: event})} //reducer is smart enough to know what the previous info is 
            />      
            {/* <TextInput
                style={global.input}
                placeholder="Age"
            /> */}
            {/* <Slider
                value={this.state.value}
                onValueChange={value => this.setState({value})}
            /> */}
            {/* <Text>Value: {this.state.value}</Text> */}
            <TextInput
                style={global.input}
                placeholder="Gender"
            />
            <TextInput
                style={global.input}
                placeholder="Sexuality"
            />
            <TextInput
                style={global.input}
                placeholder="Bio"
            />
            <TouchableOpacity style={global.button} onPress={() => console.log(userInfo)}>
                <Text style={global.text}>Let's get started!</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
   inputSection: {
       marginTop: 20
   }
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

