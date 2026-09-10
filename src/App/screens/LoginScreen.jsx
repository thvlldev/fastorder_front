// Componente de tela

import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import Button from "../components/Button";
import LabeledInput from "../components/LabeledInput";


export default function LoginScreen() {
    return(
        <View style={styles.container}>
            <View>
                <View><Button widthButton= {35} heightButton={30} textButton={"⬅"}></Button></View>
                <View style = {{alignItems: 'center'}}><Image source={require('../../assets/logo_fast_order.png')}
                style={{ width: 100, height: 100}}/>
                <Text style= {{marginBottom: 20, color: '#f7f6f3'}}>Entre para continuar seu pedido</Text></View>
                
                
            </View>
            <View style={styles.caixaInput}>
                <View style={styles.abasInput}>
                    <Button heightButton={40} widthButton={130} espacamentoButton={0} textButton={'Entrar'} textColorButton={'#F9CA5E'}/>
                    <Button heightButton={40} widthButton={130} espacamentoButton={0} textButton={'Cadastrar'} textColorButton={'#ABB3C5'} backgroundButton={'#F7F6F3'}/>
                    
                </View>
               <View>
                    <LabeledInput label="Email:"
                    placeholder="Insira seu endereço de email:"
                    />
                    <LabeledInput label="Senha:"
                    placeholder="Insira sua senha:"/>
                    <Button textButton="Entrar" backgroundButton={'#E38330'}/>
                    
                    <Pressable style = {{alignItems: 'center', color: '#055296'}}>Esqueci minha senha</Pressable>
                    <View style = {{alignItems: 'center'}}>
                        <Text>Ainda não tem conta? 
                            <Pressable style = {{color: '#E38330'}}>Cadastre-se grátis</Pressable>
                        </Text>
                    </View>
            </View> 
            </View>

            
                    
        </View>
    )
}


const styles = StyleSheet.create({


    container:{
        flex: 1,
        backgroundColor: "#243E73",
        paddingTop: 62,

    },
    title: {
        fontSize: 20,
        fontWeight: 700,
        textAlign: "center",
        color: "#6B6E71",
        marginBottom: 26,
        
    },
    caixaInput: {
        backgroundColor: "#FFFFFF",
        paddingTop: 20,
        borderRadius: 20,
        height: 700
        
    },

    abasInput: {
        flexDirection: 'row',
        justifyContent: 'center',
    }


})