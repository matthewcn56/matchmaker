import React, {useReducer, useContext} from 'react';
import styles from "../styles.js";
import { updateProfile } from '../db/firebaseFunctions.js';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import { AuthContext } from "../navigation/AuthProvider";

export default function CreateProfileScreen(){
    const [userInfo, dispatchUserInfo] = useReducer(
        infoReducer,
        initialInfo
    );
    const { user, setUser } = useContext(AuthContext);

    return(
        <View style={styles.container}>
            <Text>Welcome to MatchMaker create your profile here</Text>

            <TextInput
                placeholder="Name"
                value={userInfo.name}
                onChangeText={(event) => dispatchUserInfo({type: "name", body: event})} //reducer is smart enough to know what the previous info is and just use event because it's onChangeText and react-native is weird
            />    
            <TextInput
                placeholder="Age"
                value={userInfo.age}
                onChangeText={(event) => dispatchUserInfo({type: "age", body: event})}
            />
            <TextInput
                placeholder="Gender"
                value={userInfo.gender}
                onChangeText={(event) => dispatchUserInfo({type: "gender", body: event})}
            />
            <TextInput
                placeholder="Sexuality"
                value={userInfo.sexuality}
                onChangeText={(event) => dispatchUserInfo({type: "sexuality", body: event})}
            />
            <TextInput
                placeholder="Bio"
                value={userInfo.bio}
                onChangeText={(event) => dispatchUserInfo({type: "bio", body: event})}
            />
            <TouchableOpacity onPress={() => {updateProfile(userInfo, user.uid)}} style={styles.signinButton}>
                <Text>Create Profile</Text>
            </TouchableOpacity>
        </View>
    )
}

// action 
// {
//     type: String, //the type of value that is being changed 
//     body: String //text of what is typed
// }

//REDUCER SETUP
const initialInfo = {
    name: "",
    age: 0,
    gender: "",
    sexuality: "",
    bio: "",
    ciasux: true
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
            return {
                ...prevInfo, 
                age: action.body
            }
        }
        case "gender":{
            return {
                ...prevInfo,
                gender: action.body
            }
        }
        case "sexuality":{
            return {
                ...prevInfo, 
                sexuality: action.body
            }
        }
        case "bio":{
            return {
                ...prevInfo, 
                bio: action.body
            }
        }
    }
}

