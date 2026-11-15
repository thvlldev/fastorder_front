// Componente reutilizável do botão principal

import { Pressable, Text, StyleSheet } from "react-native";

const BG_BUTTON = '#00213d';
const TEXT_PRIMARY = '#FFFFFF';

export default function Button({ textButton, heightButton, widthButton, espacamentoButton, backgroundButton, textColorButton, onPress, disabled}) { // Pra avisar que vai ser um componente reutilizavel
    return(

        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={[
                styles.button,
                { height: heightButton, width: widthButton, marginHorizontal: espacamentoButton, backgroundColor: backgroundButton},
                disabled && styles.desabilitado
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
        justifyContent: 'center',
    },

    desabilitado: {
        opacity: 0.5,
    },

    title: {
        color: TEXT_PRIMARY,
        textAlign: "center",
        marginVertical: 2,
        paddingVertical: 7,
        fontWeight: 'bold'

    }

})
