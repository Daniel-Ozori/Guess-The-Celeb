import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonPrimary from "./ButtonPrimary";

const Header = () =>{
    const navigation = useNavigation();

    const getCurrentUser= new Promise((resolve,reject) =>{
            AsyncStorage.getItem('currentUser')
            .then((value) => resolve(value));
           
    }
    );
    const fetchAllItems =  new Promise (async(resolve,reject) => {
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
            
            resolve(arr.slice(0,5));
        } catch (error) {
            console.log(error);
        }
    });
    
    function signout(){
        try{
            AsyncStorage.setItem('currentUser',null);
            navigation.popToTop()

            navigation.replace('Login');
        }catch{

        }
    }
    
    function deleteUser(){
        getCurrentUser.then((value) => [removeItem(value),navigation.popToTop(),navigation.replace('Login')] );
    }
    
   const removeItem = async(key) => {
        try {
            await AsyncStorage.removeItem(String(key));
            return true;
        }
        catch(exception) {
            return false;
        }
    }
    return(
        <View style={styles.container}>
            
            <Text style={styles.title}>Guess The Celeb</Text>
            <Text style={styles.caption}>How well do you know your celebrities?</Text>
            <View style={{flexDirection:'row',marginVertical:5}}>
                <ButtonPrimary 
                    text='LeaderBoard'
                    color='blue'
                    onPress={() => fetchAllItems.then((value) => navigation.navigate('LeaderBoard',{allItems:value}) ) }/>
                <ButtonPrimary 
                    text='Delete Account'
                    color='red'
                    body='red'
                    onPress={() => deleteUser()}/>
                <ButtonPrimary 
                    text='Sign Out'
                    color='black'
                    onPress={() => signout()}/>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        display:'flex',

    },
    title:{
        fontSize:20,
        fontWeight:'500',
    },
    caption:{
        fontSize:12,
        color:'gray',
    }
});
export default Header;