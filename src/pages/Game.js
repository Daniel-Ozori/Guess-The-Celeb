import { View, Text, StyleSheet, Image } from "react-native";
import { useEffect,useState } from "react";
import Header from "../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Quiz from '../components/Quiz';
const Game = ({route}) => {
    const {username,highScore,best} = route.params;
   
    
    return(
        <View style={styles.container}>
            <Header/>
            <Quiz
                username={username}
                highScore={highScore}
                best={best}/>
            
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:'100%',
        backgroundColor: '#fff',
        paddingHorizontal:10,
    },
    current_image:{
        width:'100%',
        height:100,
    }
});
export default Game;