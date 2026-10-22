import { View, Text } from "react-native";
import {useNavigation}from "@react-navigation/native"

export default function HomeScreen(){
    const navigation =useNavigation();
    return(
        <View>
    <Text>HomeScreen</Text>
    <Button 
    onPress ={()=>navigation.navigate('login')}
    textButton="Entrar" 
    backgroundButton={'#E38330'}/>
        <Button 
    onPress ={()=>navigation.navigate('produto')}
    textButton="Produto" 
    backgroundButton={'#E38330'}/>
</View>

    )
}
