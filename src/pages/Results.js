import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Text,View,StyleSheet, BackHandler } from "react-native";
import { useEffect } from "react";
import  ButtonPrimary  from "../components/ButtonPrimary";
import Header from "../components/Header";

const Results = ({route}) =>{
    const {highScore,username,score} = route.params;
    const navigation = useNavigation();
    

    //update storage with user's new highscore
    const newHighScore =  async(username,score) =>{
        try{
            await AsyncStorage.setItem(username,String(score));
        }catch(error){
            console.log(error)
        }
        
    };
    newHighScore(username, highScore);
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

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => [navigation.popToTop, navigation.replace('Login')];
      }, [])
    return(
        <View style={styles.container}>
            <Header/>
            <View style={styles.wrapper}>
                
                <Text>Player: {username}</Text>
                <Text>Score: {score}</Text>
                <Text>Highscore: {highScore}</Text>
                
                <ButtonPrimary
                    onPress={() => fetchBest.then((value) => navigation.push('Game',{username:username,highScore:highScore,best:value}))}
                    text='Play Again'/>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal:10,
    },
    wrapper:{
        alignItems:'center',
        marginTop:30,
        width:'100%'
    }
});
export default Results;