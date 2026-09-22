import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

export default function PerfilScreen() {

    return (
        <View style = {{flex: 1}}>
            <View style = {styles.bckHeader}>
                <Text style = {styles.titleBck}>Olá, usuário.</Text>
                <Text>Bem-vindo de volta!</Text>
            </View>

            <View>
                <View>
                    <Text style={styles.titleCaixa}>Dados pessoais</Text>
                    <View>
                        <MaterialIcons name='account-box'/>
                        <View>
                            <Text style={styles.titleCaixa}>Nome</Text>
                            <Text style={styles.textCaixa}>Nome do usuario aqui </Text>
                        </View>
                    </View>
                </View>
                <View></View>
                <View></View>
                <View></View>
            </View>


        </View>
    )

        

    

    


}

const styles = StyleSheet.create({
    bckHeader: {
        backgroundColor: "#2516fd",
        paddingVertical: 40,
        paddingHorizontal: 20
    },


    titleBck: {
        fontFamily: "Arial",
        color: "#fff",
        fontSize: 28,
        fontWeight: 650
    },

    titleCaixa:{
        fontFamily:"Arial",// arial aqui é placeholder
        color:"#e0e0e0",
        fontSize:16,
        fontWeight: 600
    },
    textCaixa:{
        fontFamily:"Arial",// arial aqui é placeholder
        color:"#211b74",
        fontSize:14,
        fontWeight: 500
    },
    textEditar:{
        fontFamily:"Arial",// placeholder
        color:"#f78629",// laranja
        fontSize: 12,
        fontWeight:500
    }

})
