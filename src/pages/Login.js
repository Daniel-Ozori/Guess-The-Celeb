import { useNavigation } from "@react-navigation/native";
import { View, TextInput, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
const login_icon = require('../assets/login_icon.png');

const Login = () =>{
    const navigation = useNavigation();
    const [username,setUsername] = useState('');

    const login = (username) =>{
        if(!username.match(/^$|\s+/)){
            setCurrentUser(username);
            getHighScore.then((highScore) => [setUser(highScore),
                fetchBest.then(
                    (value) => navigate(highScore,value))]);

        }else{
            alert('Please fill out a username');
        }
    }

    function navigate(highScore,best){
        navigation.push('Game',{username:username,highScore:process(highScore),best:best})
    }

    function setUser(highScore){
        AsyncStorage.setItem(username,process(highScore));
    }

    function setCurrentUser (username){
        try{
            AsyncStorage.setItem('currentUser',username);
        }catch{

        }

    }
    const fetchBest =  new Promise (async(resolve,reject) => {
        try {
            const result = [];
            const keys = await AsyncStorage.getAllKeys();
            for (const key of keys) {
                const val = await AsyncStorage.getItem(key);
                (!isNaN(Number(val)) ? result[key] = Number(val) : null )
                
            }
            const sorted = Object.fromEntries(
                Object.entries(result).sort(([,a],[,b]) => b-a)
            );
            var arr = Object.keys(sorted).map((key) => [key, sorted[key]]);
            if(arr.length > 0){
                resolve(arr.slice(0,1));
            }else{
                resolve([['','']])
            }
            
        } catch (error) {
            console.log(error);
        }
    });
    const clearAll = async () => {
        try {
          await AsyncStorage.clear()
        } catch(e) {
          // clear error
        }
      
        console.log('Done.')
      }
    function process(value){
        if(value !== null){
            return String(value);
        }else{
            return String(0);
        }
    }
    const getHighScore = new Promise((resolve,reject) =>{
             AsyncStorage.getItem(username).then((value) => resolve(value));
            
       
    }
    );
   
    return(
        <View style={styles.container}>
            <View style={styles.form_con}>
                <Text>Username</Text>
                <TextInput
                    placeholder="Please enter username"
                    onChangeText={(value) => setUsername(value)}
                    style={styles.input}/>

            </View>
           

           <TouchableOpacity
                style={styles.login_btn}
                onPress={() => login(username)}>
                <Image style={styles.login_icon} source={login_icon}/>
            </TouchableOpacity> 

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form_con:{
        width:'80%'
    },
    input:{
        height:40,
        borderColor:'gray',
        borderWidth:1,
        padding:4,
        marginVertical:10,
    },
    login_btn:{
        width:'80%',
        height:30,
        borderColor:'gray',
        borderWidth:1,
        marginVertical:10,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        
    },
    login_icon:{
        width:20,
        height:20,
    }
});

export default Login;