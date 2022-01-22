import React, {useReducer} from 'react'
import styles from "../styles.js";
import {Text, View, TextInput, TouchableOpacity} from 'react-native'
export default function CreateProfileScreen(){
    const [userInfo, dispatchUserInfo] = useReducer(
        infoReducer,
        initialInfo
    );

    return(
        <View style={styles.container}>
            <Text>Welcome to MatchMaker create your profile here</Text>

            <TextInput
                placeholder="Name"
                value={userInfo.name}
                onChangeText={(event) => dispatchUserInfo({type: "name", body: event})} //reducer is smart enough to know what the previous info is 
            />
            <TextInput
                placeholder="Username"
            />
            <TextInput
                placeholder="Password"
            />            
            <TextInput
                placeholder="Age"
            />
            <TextInput
                placeholder="Gender"
            />
            <TextInput
                placeholder="Sexuality"
            />
            <TextInput
                placeholder="Bio"
            />
            <TouchableOpacity onPress={() => console.log(userInfo)} style={styles.signinButton}>
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
    username: "", 
    password: "",
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
        case "username": {
            return {
                ...prevInfo,
                username: action.body
            }
        }
        case "password": {
            return {
                ...prevInfo,
                password: action.body
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

