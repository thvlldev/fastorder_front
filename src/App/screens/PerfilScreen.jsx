import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet ,ScrollView} from "react-native";

export default function PerfilScreen() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.bckHeader}>
        <Text style={styles.titleBck}>Olá, usuário.</Text>
        <Text style= {styles.textoBemVindo}>Bem-vindo de volta!</Text>
      </View>

      < ScrollView
        style={{
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: "#F7F6F3",
        }}
      >
        <View style={styles.containerBranco}>
          <Text style={[styles.titleCaixa, {paddingTop: 5, paddingLeft: 11}]}>DADOS PESSOAIS</Text>
          <View style={styles.iconTexto}>
            <MaterialIcons
              name="person"
              size={50}
              color="#001050"
              style={styles.iconStyle}
            />
            <View>
              <Text style={styles.titleCaixa}>NOME</Text>
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
              <Text style={styles.titleCaixa}>EMAIL</Text>
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
              <Text style={styles.titleCaixa}>TELEFONE</Text>
              <Text style={styles.textCaixa}>2140028922</Text>
            </View>
          </View>

        </View>
          <View style={[styles.containerBranco, {marginTop: 20}]}>
          <Text style={[styles.titleCaixa, {paddingTop: 5, paddingLeft: 11}]}>ENDEREÇO DE ENTREGA</Text>
          <View style={styles.iconTexto}>
            <MaterialIcons
              name="pin-drop"
              size={50}
              color="#001050"
              style={styles.iconStyle}
            />
            <View>
              <Text style={styles.titleCaixa}>RUA ENDEREÇO</Text>
              <Text style={styles.textCaixa}>complemento endereço</Text>
            </View>
          </View>          
        </View>

        <View style={[styles.containerBranco, {marginTop: 20}]}>
          <Text style={[styles.titleCaixa, {paddingTop: 5, paddingLeft: 11}]}>MÉTODO DE PAGAMENTO</Text>
          <View style={styles.iconTexto}>
            <MaterialIcons
              name="attach-money"
              size={50}
              color="#001050"
              style={styles.iconStyle}
            />
            <View>
              <Text style={styles.titleCaixa}>PAGAMENTO PREFERIDO</Text>
              <Text style={styles.textCaixa}>PIX</Text>
            </View>
          </View>          
        </View>
        {/* Área de ajuda */}
        <View style={[styles.containerBranco, {marginTop: 20}]}>
          <Text style={[styles.titleCaixa, {paddingTop: 5, paddingLeft: 11}]}>AJUDA</Text>
          <View style={styles.iconTexto}>
            <MaterialIcons
              name="chat"
              size={50}
              color="#001050"
              style={styles.iconStyle}
            />
            <View>
              <Text style={styles.titleCaixa}>FALAR COM O RESTAURANTE</Text>
            </View>
          </View>
          <View style={styles.iconTexto}>
            <MaterialIcons
              name="star-rate"
              size={50}
              color="#001050"
              style={styles.iconStyle}
            />
            <View>
              <Text style={styles.titleCaixa}>AVALIAR O APLICATIVO</Text>
            </View>
          </View>
          <View style={styles.iconTexto}>
            <MaterialIcons
              name="description"
              size={50}
              color="#001050"
              style={styles.iconStyle}
            />
            <View>
              <Text style={styles.titleCaixa}>TERMOS E PRIVACIDADE</Text>
            </View>
          </View>
        </View>
         {/* Sair da conta */}
          <View style= {[styles.containerBranco, {marginTop: 20}]}>
            <View style={[styles.titleCaixa, {paddingTop: 5, paddingLeft: 11}]}>SAIR</View>
            <View style={styles.iconTexto}>
            <MaterialIcons
              name="logout"
              size={50}
              color="#001050"
              style={styles.iconStyle}
            />
            <View>
              <Text style={styles.titleCaixa}>SAIR DA CONTA</Text>
            </View>
          </View>
          </View>
         
        
          

        

        




      </ScrollView>




    </View>

    
  );
}

const styles = StyleSheet.create({
  bckHeader: {
    backgroundColor: "#163469",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  textoBemVindo: {
    fontFamily: 'Nunito, sans-serif',
    fontSize: 13,
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 0.5)'
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
    fontFamily: "Outfit, sans-serif",
    color: "#fff",
    fontSize: 28,
    fontWeight: 650,
  },

  titleCaixa: {
    fontFamily: "Nunito, sans-serif",
    color: "rgb(187, 187, 187)",
    fontSize: 11,
    fontWeight: 900
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



