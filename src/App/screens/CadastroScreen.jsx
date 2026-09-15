// Componente de tela

import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import Button from "../components/Button";
import LabeledInput from "../components/LabeledInput";
import { ImageBackground } from "react-native-web";

export default function CadastroScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/testebck.jpg")}
        resizeMode="repeat"
        style={styles.imagemBck}
      >
        <View style={styles.botaoVoltar}>
          <Button widthButton={35} heightButton={30} textButton={"⬅"}></Button>
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
              fontFamily: "Roboto, sans-serif",
              fontSize: 15,
            }}
          >
            Entre para continuar seu pedido
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.caixaInput}>
        <View style={styles.abasInput}>
          <Button
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
            textButton={"Cadastrar"}
            textColorButton={"#F9CA5E"}
          />
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <LabeledInput
            label="Nome completo:"
            placeholder="Insira seu nome completo:"
          />

          <LabeledInput
            label="Email:"
            placeholder="Insira seu endereço de email:"
          />

          <LabeledInput label="Senha:" placeholder="Insira sua senha:" />

          <LabeledInput label="Telefone:" placeholder="(00)00000-0000" />

          <LabeledInput
            label="Repita sua senha:"
            placeholder="Insira sua senha:"
          />

          <Button
            textButton="Criar conta grátis"
            backgroundButton={"#E38330"}
          />

          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Text>
              Já tem conta?
              <Pressable style={{ color: "#E38330" }}> Faça login</Pressable>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 700,
  },

  abasInput: {
    flexDirection: "row",
    justifyContent: "center",
  },

  botaoVoltar: {
    paddingTop: 20,
  },

  imagemBck: {
    width: "auto",
    height: "auto",
  },
});
