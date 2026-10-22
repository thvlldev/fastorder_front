import { View, Text } from "react-native";
import {useNavigation}from "@react-navigation/native"

export default function ProdutoScreen(){
    const navigation =useNavigation();
    return(
        <View>
    <Text>ProdutoScreen</Text>
            <Button 
    onPress ={()=>navigation.goBack()}
    textButton="Voltar" 
    backgroundButton={'#E38330'}/>
</View>

    )
}
