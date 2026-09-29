import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

export default function PerfilScreen() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.bckHeader}>
        <Text style={styles.titleBck}>Olá, usuário.</Text>
        <Text>Bem-vindo de volta!</Text>
      </View>

      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: "#F7F6F3",
        }}
      >
        <View style={styles.containerBranco}>
          <Text style={[styles.titleCaixa, {paddingTop: 5, paddingLeft: 11}]}>Dados pessoais</Text>
          <View style={styles.iconTexto}>
            <MaterialIcons
              name="person"
              size={50}
              color="#001050"
              style={styles.iconStyle}
            />
            <View>
              <Text style={styles.titleCaixa}>Nome</Text>
              <Text style={styles.textCaixa}>wad</Text>
            </View>
          </View>
          <View style={styles.iconTexto}>
            <MaterialIcons
              name="mail"
              size={50}
              color="#001050"
              style={styles.iconStyle}
            />
            <View>
              <Text style={styles.titleCaixa}>Email</Text>
              <Text style={styles.textCaixa}>wad@wad.com</Text>
            </View>
          </View>
          <View style={styles.iconTexto}>
            <MaterialIcons
              name="call"
              size={50}
              color="#001050"
              style={styles.iconStyle}
            />
            <View>
              <Text style={styles.titleCaixa}>Telefone</Text>
              <Text style={styles.textCaixa}>2140028922</Text>
            </View>
          </View>

        </View>
                <View style={[styles.containerBranco, {marginTop: 20}]}>
          <Text style={[styles.titleCaixa, {paddingTop: 5, paddingLeft: 11}]}>Endereço de entrega</Text>
          <View style={styles.iconTexto}>
            <MaterialIcons
              name="pin-drop"
              size={50}
              color="#001050"
              style={styles.iconStyle}
            />
            <View>
              <Text style={styles.titleCaixa}>Rua endereço</Text>
              <Text style={styles.textCaixa}>complemento endereço</Text>
            </View>
          </View>
 

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bckHeader: {
    backgroundColor: "#2516fd",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  containerBranco: {
    backgroundColor: "#fff",
    borderRadius: 15,
    justifyContent:'center'
  },

  iconTexto: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    paddingTop: 10

  },

  iconStyle: {
    backgroundColor: "#f0f2fa",
    borderRadius: 15,
  },

  titleBck: {
    fontFamily: "Arial",
    color: "#fff",
    fontSize: 28,
    fontWeight: 650,
  },

  titleCaixa: {
    fontFamily: "Arial", // arial aqui é placeholder
    color: "#e0e0e0",
    fontSize: 16,
    fontWeight: 600,
  },
  textCaixa: {
    fontFamily: "Arial", // arial aqui é placeholder
    color: "#211b74",
    fontSize: 14,
    fontWeight: 500,
  },
  textEditar: {
    fontFamily: "Arial", // placeholder
    color: "#f78629", // laranja
    fontSize: 12,
    fontWeight: 500,
  },
});
