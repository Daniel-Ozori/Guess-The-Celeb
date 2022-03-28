import { View, Text, StyleSheet, Image, BackHandler } from "react-native";
import RadioButton from '../components/RadioButton';
import ButtonPrimary from '../components/ButtonPrimary';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Celebs from '../assets/data.json';
import { useNavigation } from "@react-navigation/native";
  

const Quiz = (props) =>{
    const {username,highScore,best} = props;
    const navigation = useNavigation();
    const celebOptionsList = ['Felix Lengyel','Tom Holland','James Franco',
                    'Chris Hemsworth','Liam Neeson','Chris Evans','Andrew Garfield',
                    'Tobey Maguire','Keanu Reeves', 'Christian Bale'];
    

    const [celebs,setCelebs] = useState(shuffle([...Celebs]));
    const [currQuestion, setCurrQuestion] = useState(celebs[0]);
    const [options,setOptions] = useState(newOptions());
    const [questionNum,setQuestionNum] = useState(1);
    const [selected,setSelcted] = useState(0);
    const [score,setScore] = useState(0);
    
    //pick a random item from an array
    function pickRandom(arr){
        return(arr[Math.floor(Math.random() * arr.length)]);
    }
    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    
        return arr;
    }

    //remove an item from the editable celeb array
    function removeCeleb(value){
        const arr = celebs;
        var index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
            setCelebs(arr);
        }
    }

    //get a list of random new options including the corrent one
    function newOptions(){
        const arr = [];
        arr.push(celebs[0].name);
        while(arr.length < 4){
            let f = pickRandom(celebOptionsList);
            (!(arr.includes(f)) ? arr.push(f) :f = pickRandom(celebOptionsList))
            
        }
        
        arr.sort();
        return arr;
    }
    function moveToNext(){
        setQuestionNum(questionNum + 1);
        removeCeleb(currQuestion);
        setCurrQuestion(celebs[0]);
        setOptions(newOptions(celebOptionsList));
        setSelcted(0);
    }
    function mark(selected){
        if((selected !== 0) ){
            if(selected === currQuestion.name){
                alert('Correct');
                setScore(score + 1);
                
                moveToNext();
            }
            else{
                alert('Wrong');
                moveToNext();
            }
        }else{
            alert('Please select an answer');
        }
        
           
    }
    //move to the next question after successfully answering the first
    function next(){
        if(celebs.length > 1){
            mark(selected);
        }else{
            if(selected !== 0){
                (selected === currQuestion.name ? [setScore(score + 1),alert('Correct')] : alert('Wrong'));
                if(score > highScore){
                    navigation.popToTop();
                    navigation.navigate('Results',{username:username,score:score,highScore:score});
                }else{
                    navigation.popToTop();
                    navigation.navigate('Results',{username:username,score:score,highScore:highScore})
                }
            }else{
                alert('Please select an answer');
            }
            
        }
        
        
    }
    
    
    
    const childToParent = (data) =>{
        setSelcted(data);
    }
    return(
        <View>
            <View style={{marginVertical:20}}>
                <Text>Current Score: {score}</Text>
                <Text>Global Top Score: {best[0][1]} by {best[0][0]}</Text>
                <Text>Your top score: {highScore} </Text>
                <Text style={{alignSelf:'flex-end'}}>Question {questionNum}</Text>
            </View>
            <Image source={{uri:currQuestion.image}} style={styles.current_image} />
            <RadioButton 
                options={options}
                value={selected}
                childToParent={childToParent}
            />
            
            <ButtonPrimary 
                text='Next'
                onPress={() => next()}/>
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
    height:200,
}
});

export default Quiz;