// Componente reutilizável do botão principal

import { Pressable, Text, StyleSheet } from "react-native";

const BG_BUTTON = '#00213d';
const TEXT_PRIMARY = '#FFFFFF';

export default function Button({ textButton, heightButton, widthButton, espacamentoButton, backgroundButton, textColorButton}) { // Pra avisar que vai ser um componente reutilizavel
    return(
    
        <Pressable style={[
                styles.button, 
                { height: heightButton, width: widthButton, marginHorizontal: espacamentoButton, backgroundColor: backgroundButton}
            ]} >
            <Text style={[styles.title, {color: textColorButton}]}>
                {textButton ? textButton : "Enviar"}
            </Text>
        </Pressable>
        
        
    )
}





const styles = StyleSheet.create({
    button: {
        backgroundColor: BG_BUTTON,
        borderRadius: 8,
        marginHorizontal: 20,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        color: TEXT_PRIMARY,
        textAlign: "center",
        marginVertical: 2,
        paddingVertical: 7,

    }

})