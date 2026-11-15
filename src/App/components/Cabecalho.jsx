// Cabeçalho branco com botão de voltar, título e subtítulo (carrinho, finalizar pedido, pedidos)

import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Cabecalho({ titulo, subtitulo, onVoltar }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.cabecalho, { paddingTop: insets.top + 16 }]}>
      {onVoltar && (
        <Pressable onPress={onVoltar} style={styles.voltar}>
          <MaterialIcons name="arrow-back" size={22} color="#0F1F47" />
        </Pressable>
      )}
      <View>
        <Text style={styles.titulo}>{titulo}</Text>
        {subtitulo ? <Text style={styles.subtitulo}>{subtitulo}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cabecalho: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },

  voltar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F7F6F3",
    alignItems: "center",
    justifyContent: "center",
  },

  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F1F47",
  },

  subtitulo: {
    fontSize: 12,
    color: "#9AA1B0",
    marginTop: 2,
  },
});
