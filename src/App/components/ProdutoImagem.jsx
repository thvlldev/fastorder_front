// Imagem do produto. Se a URL do banco não abrir, mostra um ícone no lugar.

import { useState } from "react";
import { Image, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProdutoImagem({ imagem, style, tamanhoIcone }) {
  const [falhou, setFalhou] = useState(false);

  if (!imagem || falhou) {
    return (
      <View style={[styles.semImagem, style]}>
        <MaterialIcons name="fastfood" size={tamanhoIcone || 36} color="#E38330" />
      </View>
    );
  }

  return (
    <Image
      source={{ uri: imagem }}
      style={style}
      resizeMode="cover"
      onError={() => setFalhou(true)}
    />
  );
}

const styles = StyleSheet.create({
  semImagem: {
    backgroundColor: "#FDEBDA",
    alignItems: "center",
    justifyContent: "center",
  },
});
