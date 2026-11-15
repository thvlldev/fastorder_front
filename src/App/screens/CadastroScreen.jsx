// Componente de tela

import { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, ImageBackground, ScrollView } from "react-native";
import Button from "../components/Button";
import LabeledInput from "../components/LabeledInput";
import {useNavigation}from "@react-navigation/native"
import { useAuth } from "../contexts/AuthContext";
import * as api from "../services/api";

export default function CadastroScreen() {
  const navigation =useNavigation();
  const { entrar } = useAuth();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function criarConta() {
    if (!nome.trim() || !email.trim() || !senha) {
      setMensagem("Preencha nome, e-mail e senha.");
      return;
    }
    if (senha.length < 6) {
      setMensagem("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }
    if (senha !== confirmarSenha) {
      setMensagem("As senhas não são iguais.");
      return;
    }

    setCarregando(true);
    setMensagem("");
    try {
      // O back faz o hash da senha. O pagamento preferido começa como PIX e pode ser trocado no perfil.
      await api.cadastrarCliente({
        nome: nome.trim(),
        email: email.trim(),
        senha,
        telefone: telefone.trim(),
        metodoPagamento: "PIX",
      });
      await entrar(email.trim(), senha); // já entra com a conta nova
      navigation.popToTop();
    } catch (erro) {
      setMensagem(erro.status ? "Não foi possível criar a conta. Confira os dados." : erro.message);
      setCarregando(false);
    }
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <ImageBackground
        source={require("../../assets/testebck.jpg")}
        resizeMode="repeat"
        style={styles.imagemBck}
      >
        <View style={styles.botaoVoltar}>
          <Button onPress={()=>navigation.goBack()} widthButton={35} heightButton={30} textButton={"⬅"}></Button>
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/logo_fast_order.png")}
            style={{ width: 100, height: 100 }}
          />
          <Text
            style={{
              marginBottom: 20,
              color: "#000",
              fontSize: 15,
            }}
          >
            Crie sua conta gratuitamente
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.caixaInput}>
        <View style={styles.abasInput}>
          <Button
            onPress={()=>navigation.replace('login')}
            heightButton={40}
            widthButton={130}
            espacamentoButton={0}
            textButton={"Entrar"}
            textColorButton={"#ABB3C5"}
            backgroundButton={"#F7F6F3"}
          />
          <Button
            heightButton={40}
            widthButton={130}
            espacamentoButton={0}
            textButton={"Criar conta"}
            textColorButton={"#F9CA5E"}
          />
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <LabeledInput
            label="Nome completo:"
            placeholder="Insira seu nome completo:"
            value={nome}
            onChangeText={setNome}
          />

          <LabeledInput
            label="Email:"
            placeholder="Insira seu endereço de email:"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <LabeledInput
            label="Telefone:"
            placeholder="(00)00000-0000"
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
          />

          <LabeledInput
            label="Senha:"
            placeholder="Mínimo 6 caracteres"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <LabeledInput
            label="Repita sua senha:"
            placeholder="Insira sua senha:"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry
          />

          {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}

          <Button
            onPress={criarConta}
            disabled={carregando}
            textButton={carregando ? "Criando conta..." : "Criar conta grátis"}
            backgroundButton={"#E38330"}
          />

          <View style={{ alignItems: "center", marginTop: 10, flexDirection: "row", justifyContent: "center" }}>
            <Text>Já tem conta? </Text>
            <Pressable onPress={()=>navigation.replace('login')}>
              <Text style={{ color: "#E38330", fontWeight: "bold" }}>Faça login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },

  botaoVoltar: {
    paddingTop: 30,
    alignItems: "flex-start",
  },

  imagemBck: {
    width: "auto",
    height: "auto",
  },

  mensagem: {
    color: "#C0392B",
    textAlign: "center",
    marginBottom: 4,
  },
});
