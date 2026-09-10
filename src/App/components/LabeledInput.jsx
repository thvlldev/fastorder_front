
import { TextInput, View, Text, StyleSheet } from "react-native";

const INPUT_BG = "#F5F5F5";
const INPUT_BORDER = "#E8E8E8";
const LABEL_COLOR = "#36454F";

export default function LabeledInput( {label}) {

    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>
                {label }
            </Text>
            <TextInput placeholderTextColor="#B5B5B5"
            style={styles.input}/> 
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: "100%", //Faz o componente ocupar toda a largura disponível.
        marginBottom: 14, // Define o espaço abaixo do campo

        
    },

    label: {
        marginBottom: 6,
        color: LABEL_COLOR,
        fontSize: 14,
        fontWeight: 600

    },

    input: {
        backgroundColor: INPUT_BG,
        borderRadius: 8,
        borderWidth: 2, // Define o comprimento da borda
        borderColor: INPUT_BORDER,
        shadowColor: "#000", // Define a cor da borda
        shadowOffset: { width: 1, heigth: 2}, // Define a posição da sombra
        shadowOpacity: 0.08, // Define a transparência
        shadowRadius: 6,

        fontSize: 14,
        color: "#222",

        paddingHorizontal: 14,
        paddingVertical: 12,
        


    },
})