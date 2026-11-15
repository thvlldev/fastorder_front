// Tela vazia com ícone, título, texto e um botão (carrinho vazio, nenhum pedido)

import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "./Button";

export default function EstadoVazio({ icone, titulo, texto, textoBotao, onPress }) {
  return (
    <View style={styles.container}>
      <MaterialIcons name={icone} size={72} color="#0F1F47" />
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.texto}>{texto}</Text>
      {textoBotao && (
        <Button
          onPress={onPress}
          textButton={textoBotao}
          backgroundButton={"#E38330"}
          textColorButton={"#FFFFFF"}
          heightButton={48}
          widthButton={200}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },

  titulo: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#0F1F47",
    marginTop: 20,
  },

  texto: {
    fontSize: 14,
    color: "#9AA1B0",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 14,
    maxWidth: 260,
  },
});
