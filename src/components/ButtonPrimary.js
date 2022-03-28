import { View,Text,StyleSheet,TouchableOpacity } from "react-native";

const ButtonPrimary = ({text,color,onPress,body}) =>{
    return(
        <TouchableOpacity
            onPress={onPress}>
            <View style={[styles.container,{borderColor:body}]}>
                <Text style={{color:color}}>{text}</Text>
            </View>
        </TouchableOpacity>
        
    );
}

const styles = StyleSheet.create({
    container: {
        height:40,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'gray',
        borderWidth:0.2,
        paddingHorizontal:10,
        margin:5,
        borderRadius:5,
    },
});

export default ButtonPrimary;