import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonPrimary from "../components/ButtonPrimary";

const LeaderBoard = ({route}) =>{
    
   const {allItems} = route.params;
    
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Top 5 Players</Text>
            {allItems.map(item => <Text>{item[0]}: {item[1]}</Text>)}
            
           
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontSize:20,
        fontWeight:'500',
    }
});

export default LeaderBoard;