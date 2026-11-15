// Pedido confirmado e acompanhamento do pedido (mesma tela, vem do finalizar ou do "Acompanhar")

import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../components/Button";
import * as api from "../services/api";
import { formatarPreco, nomePagamento, nomeStatus, formatarEndereco } from "../utils/formatos";

// Etapas da linha do tempo e o status do back que corresponde a cada uma
const ETAPAS = [
  { titulo: "Pedido recebido", texto: "Sua comanda foi registrada com sucesso", icone: "check" },
  { titulo: "Em preparo", texto: "A cozinha está trabalhando no seu pedido", icone: "restaurant" },
  { titulo: "Saiu para entrega", texto: "O entregador está a caminho", icone: "delivery-dining" },
  { titulo: "Entregue!", texto: "Aproveite! Bom apetite!", icone: "celebration" },
];

const ETAPA_DO_STATUS = {
  PENDENTE: 0,
  EM_PREPARO: 1,
  PRONTO: 1,
  EM_TRANSPORTE: 2,
  FINALIZADO: 3,
};

export default function PedidoConfirmadoScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const [pedido, setPedido] = useState(null);
  const [mensagem, setMensagem] = useState("");

  // GET de pedido por id, com os itens dentro
  useEffect(() => {
    api.buscarPedido(route.params.id)
      .then(setPedido)
      .catch((erro) => setMensagem(erro.status ? "Pedido não encontrado." : erro.message));
  }, [route.params.id]);

  function verMeusPedidos() {
    navigation.popTo("abas", { screen: "pedidos" }); // popTo volta pras abas que já estão abertas, o navigate abriria outra cópia
  }

  function fazerNovoPedido() {
    navigation.popTo("abas", { screen: "inicio" });
  }

  if (!pedido) {
    return (
      <View style={styles.centro}>
        {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : <ActivityIndicator color="#E38330" />}
        <Button onPress={verMeusPedidos} textButton="Ver meus pedidos" widthButton={180} />
      </View>
    );
  }

  const cancelado = pedido.status === "CANCELADO" || pedido.status === "RECUSADO";
  const etapaAtual = ETAPA_DO_STATUS[pedido.status];
  const entregue = pedido.status === "FINALIZADO";

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
        <View style={[styles.topo, { paddingTop: insets.top + 30 }]}>
          <View style={[styles.circulo, cancelado && { backgroundColor: "#F3B6AE" }]}>
            <MaterialIcons name={cancelado ? "close" : "check"} size={34} color="#0F1F47" />
          </View>
          <Text style={styles.confirmado}>
            {cancelado ? "PEDIDO " + nomeStatus(pedido.status) : route.params.novo ? "PEDIDO CONFIRMADO!" : "ACOMPANHE SEU PEDIDO"}
          </Text>
          <Text style={styles.numero}>#{pedido.numero}</Text>
        </View>

        {!cancelado && (
          <View style={styles.cartao}>
            <Text style={styles.tituloCartao}>ACOMPANHE SEU PEDIDO</Text>
            {ETAPAS.map((etapa, indice) => {
              const concluida = indice < etapaAtual || entregue;
              const atual = indice === etapaAtual && !entregue;
              const ultima = indice === ETAPAS.length - 1;
              return (
                <View key={etapa.titulo} style={styles.etapa}>
                  <View style={{ alignItems: "center" }}>
                    <View
                      style={[
                        styles.bolinha,
                        concluida && { backgroundColor: "#0F1F47" },
                        atual && { backgroundColor: "#E38330" },
                      ]}
                    >
                      <MaterialIcons
                        name={concluida ? "check" : etapa.icone}
                        size={18}
                        color={concluida || atual ? "#FFFFFF" : "#C4C8D0"}
                      />
                    </View>
                    {!ultima && <View style={[styles.traco, concluida && { backgroundColor: "#0F1F47" }]} />}
                  </View>
                  <View style={{ flex: 1, paddingBottom: ultima ? 0 : 18 }}>
                    <Text style={[styles.tituloEtapa, !concluida && !atual && { color: "#C4C8D0" }]}>
                      {etapa.titulo}
                    </Text>
                    <Text style={[styles.textoEtapa, !concluida && !atual && { color: "#D5D8DE" }]}>
                      {etapa.texto}
                    </Text>
                    {atual && (
                      <View style={styles.emAndamento}>
                        <Text style={styles.textoEmAndamento}>● Em andamento</Text>
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        )}

        <View style={styles.cartao}>
          <Text style={styles.tituloCartao}>ITENS DO PEDIDO</Text>
          {pedido.itens.map((item) => (
            <View key={item.produtoId} style={{ marginTop: 8 }}>
              <View style={styles.linha}>
                <Text style={styles.textoItem} numberOfLines={1}>{item.quantidade}× {item.nome}</Text>
                <Text style={styles.valorItem}>{formatarPreco(item.preco_unitario * item.quantidade)}</Text>
              </View>
              {item.observacao ? <Text style={styles.observacao}>{item.observacao}</Text> : null}
            </View>
          ))}
          <View style={[styles.linha, styles.linhaEntrega]}>
            <Text style={styles.textoSuave}>Entrega</Text>
            <Text style={styles.valorItem}>{formatarPreco(pedido.taxaEntrega)}</Text>
          </View>
          <View style={[styles.linha, { marginTop: 8 }]}>
            <Text style={styles.textoTotal}>Total</Text>
            <Text style={styles.valorTotal}>{formatarPreco(pedido.total)}</Text>
          </View>
        </View>

        <View style={styles.cartao}>
          <Text style={styles.tituloCartao}>ENTREGA E PAGAMENTO</Text>
          <View style={[styles.linha, { marginTop: 8 }]}>
            <Text style={styles.textoSuave}>Endereço</Text>
            <Text style={styles.valorItem}>
              {pedido.endereco ? formatarEndereco(pedido.endereco) : "Não informado"}
            </Text>
          </View>
          <View style={[styles.linha, { marginTop: 8 }]}>
            <Text style={styles.textoSuave}>Pagamento</Text>
            <Text style={styles.valorItem}>{nomePagamento(pedido.metodoPagamento)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.rodape, { paddingBottom: insets.bottom + 10 }]}>
        <Button
          onPress={verMeusPedidos}
          textButton="Ver meus pedidos"
          backgroundButton={"#0F1F47"}
          textColorButton={"#F9CA5E"}
          heightButton={48}
          espacamentoButton={0}
        />
        <Button
          onPress={fazerNovoPedido}
          textButton="Fazer novo pedido"
          backgroundButton={"#FDEBDA"}
          textColorButton={"#E38330"}
          heightButton={48}
          espacamentoButton={0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F6F3",
  },

  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  mensagem: {
    color: "#C0392B",
  },

  topo: {
    backgroundColor: "#163469",
    alignItems: "center",
    paddingBottom: 30,
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  circulo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F9CA5E",
    alignItems: "center",
    justifyContent: "center",
  },

  confirmado: {
    color: "#F9CA5E",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
    marginTop: 16,
  },

  numero: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 6,
  },

  cartao: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 14,
  },

  tituloCartao: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0F1F47",
    letterSpacing: 0.5,
    marginBottom: 10,
  },

  etapa: {
    flexDirection: "row",
    gap: 14,
  },

  bolinha: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F1F0EC",
    alignItems: "center",
    justifyContent: "center",
  },

  traco: {
    flex: 1,
    width: 2,
    backgroundColor: "#E4E2DC",
  },

  tituloEtapa: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0F1F47",
  },

  textoEtapa: {
    fontSize: 12,
    color: "#9AA1B0",
    marginTop: 2,
  },

  emAndamento: {
    alignSelf: "flex-start",
    backgroundColor: "#FDEBDA",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 6,
  },

  textoEmAndamento: {
    color: "#E38330",
    fontSize: 11,
    fontWeight: "bold",
  },

  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },

  textoItem: {
    flex: 1,
    fontSize: 13,
    color: "#36454F",
  },

  valorItem: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#36454F",
  },

  observacao: {
    fontSize: 11,
    color: "#9AA1B0",
    marginTop: 2,
  },

  linhaEntrega: {
    borderTopWidth: 1,
    borderColor: "#ECEAE4",
    marginTop: 12,
    paddingTop: 12,
  },

  textoSuave: {
    fontSize: 13,
    color: "#9AA1B0",
  },

  textoTotal: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#0F1F47",
  },

  valorTotal: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E38330",
  },

  rodape: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },
});
