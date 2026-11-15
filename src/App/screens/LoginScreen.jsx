// Componente de tela

import { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, ImageBackground, ScrollView } from "react-native";
import Button from "../components/Button";
import LabeledInput from "../components/LabeledInput";
import {useNavigation}from "@react-navigation/native"
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen() {
    const navigation =useNavigation();
    const { entrar } = useAuth();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function fazerLogin() {
        if (!email.trim() || !senha) {
            setMensagem("Informe o e-mail e a senha.");
            return;
        }
        setCarregando(true);
        setMensagem("");
        try {
            await entrar(email.trim(), senha);
            navigation.goBack(); // volta pra tela de onde veio (carrinho, perfil, início)
        } catch (erro) {
            // O back devolve 401 pra e-mail ou senha errados
            setMensagem(erro.status === 401 ? "E-mail ou senha inválidos." : erro.message);
            setCarregando(false);
        }
    }

    return(
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
            <ImageBackground source={require('../../assets/testebck.jpg')} resizeMode="repeat" style={styles.imagemBck}>
                <View style={styles.botaoVoltar}><Button onPress={()=>navigation.goBack()} widthButton= {35} heightButton={30} textButton={"⬅"} ></Button></View>
                <View style = {{alignItems: 'center'}}><Image source={require('../../assets/logo_fast_order.png')}
                style={{ width: 100, height: 100}}/>
                <Text style= {{marginBottom: 20, color: '#000', fontSize: 15}}>Entre para continuar seu pedido</Text></View>


            </ImageBackground>
            <View style={styles.caixaInput}>
                <View style={styles.abasInput}>
                    <Button heightButton={40}
                    widthButton={130}
                    espacamentoButton={0}
                    textButton={'Entrar'}
                    textColorButton={'#F9CA5E'}/>
                    <Button
                    onPress={()=>navigation.replace('cadastro')}
                    heightButton={40}
                    widthButton={130}
                    espacamentoButton={0}
                    textButton={'Criar conta'}
                    textColorButton={'#ABB3C5'}
                    backgroundButton={'#F7F6F3'}/>

                </View>
               <View style={{paddingHorizontal: 20}}>
                    <LabeledInput label="Email:"
                    placeholder="Insira seu endereço de email:"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    />
                    <LabeledInput label="Senha:"
                    placeholder="Insira sua senha:"
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry
                    />

                    {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}

                    <Button
                    onPress={fazerLogin}
                    disabled={carregando}
                    textButton={carregando ? "Entrando..." : "Entrar"}
                    backgroundButton={'#E38330'}/>

                    <View style = {{alignItems: 'center', marginTop: 10, flexDirection: 'row', justifyContent: 'center'}}>
                        <Text>Ainda não tem conta? </Text>
                        <Pressable onPress={()=>navigation.replace('cadastro')}>
                            <Text style = {{color: '#E38330', fontWeight: 'bold'}}>Cadastre-se grátis</Text>
                        </Pressable>
                    </View>
            </View>
            </View>



        </ScrollView>
    )
}


const styles = StyleSheet.create({


    container:{
        flex: 1,
        backgroundColor: "#FFFFFF",

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
        paddingBottom: 30,
        borderRadius: 20,

    },

    abasInput: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },

    imagemBck: {
        width: 'auto',
        height: 'auto'
    },

    botaoVoltar: {
        paddingTop: 30,
        alignItems: 'flex-start',
    },

    mensagem: {
        color: '#C0392B',
        textAlign: 'center',
        marginBottom: 4,
    }


})
