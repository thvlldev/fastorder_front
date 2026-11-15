import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Cabecalho from "../components/Cabecalho";
import EnderecoCard from "../components/EnderecoCard";
import { useAuth } from "../contexts/AuthContext";
import { useCarrinho } from "../contexts/CarrinhoContext";
import * as api from "../services/api";
import { PAGAMENTOS, formatarPreco, textoItens } from "../utils/formatos";

export default function FinalizarPedidoScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { usuario } = useAuth();
  const { itens, totalItens, subtotal, limpar } = useCarrinho();

  const [endereco, setEndereco] = useState(null);
  const [pagamento, setPagamento] = useState("PIX");
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);

  const total = subtotal + api.TAXA_ENTREGA;

  // Começa com o pagamento preferido do cliente
  useEffect(() => {
    if (!usuario) return;
    api.buscarCliente(usuario.id)
      .then((cliente) => {
        if (cliente.metodoPagamento) setPagamento(cliente.metodoPagamento);
      })
      .catch(() => {}); // usuário que não é cliente fica com PIX
  }, [usuario]);

  async function confirmarPedido() {
    if (!endereco) {
      setMensagem("Adicione um endereço de entrega.");
      return;
    }
    setEnviando(true);
    setMensagem("");
    try {
      // O back define numero, data, status e total, com o preço do banco
      const pedido = await api.criarPedido({
        usuarioId: usuario.id,
        enderecoId: endereco.id,
        metodoPagamento: pagamento,
        itens: itens.map((item) => ({
          produtoId: item.produto.id,
          quantidade: item.quantidade,
          observacao: item.observacao || null,
        })),
      });
      navigation.replace("pedidoConfirmado", { id: pedido.id, novo: true });
      limpar();
    } catch (erro) {
      setMensagem(
        erro.status === 400
          ? "Algum item do pedido não está mais disponível."
          : erro.status
          ? "Não foi possível confirmar o pedido."
          : erro.message
      );
      setEnviando(false);
    }
  }

  // Sem login ou com o carrinho vazio não tem o que finalizar
  if (!usuario || itens.length === 0) {
    return (
      <View style={styles.container}>
        <Cabecalho titulo="Finalizar Pedido" onVoltar={() => navigation.goBack()} />
        <Text style={styles.vazio}>
          {usuario ? "Seu carrinho está vazio." : "Entre na sua conta para finalizar o pedido."}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Cabecalho
        titulo="Finalizar Pedido"
        subtitulo={textoItens(totalItens) + " · " + formatarPreco(total)}
        onVoltar={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={styles.cartao}>
          <Text style={styles.tituloCartao}>SEUS ITENS</Text>
          {itens.map((item) => (
            <View key={item.produto.id} style={styles.linha}>
              <Text style={styles.textoItem} numberOfLines={1}>
                {item.quantidade}× {item.produto.nome}
              </Text>
              <Text style={styles.valorItem}>{formatarPreco(item.produto.preco * item.quantidade)}</Text>
            </View>
          ))}
          <View style={[styles.linha, styles.linhaEntrega]}>
            <Text style={styles.textoEntrega}>Entrega</Text>
            <Text style={styles.valorItem}>{formatarPreco(api.TAXA_ENTREGA)}</Text>
          </View>
          <View style={styles.linha}>
            <Text style={styles.textoTotal}>Total</Text>
            <Text style={styles.valorTotal}>{formatarPreco(total)}</Text>
          </View>
        </View>

        <EnderecoCard
          usuarioId={usuario.id}
          onEndereco={(atual) => {
            setEndereco(atual);
            if (atual) setMensagem("");
          }}
        />

        <View style={styles.cartao}>
          <Text style={styles.tituloCartao}>FORMA DE PAGAMENTO</Text>
          {PAGAMENTOS.map((opcao) => {
            const selecionado = pagamento === opcao.valor;
            return (
              <Pressable
                key={opcao.valor}
                onPress={() => setPagamento(opcao.valor)}
                style={[styles.opcao, selecionado && styles.opcaoSelecionada]}
              >
                <MaterialIcons name={opcao.icone} size={26} color={selecionado ? "#E38330" : "#0F1F47"} />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.nomeOpcao, selecionado && { color: "#E38330" }]}>{opcao.nome}</Text>
                  <Text style={styles.descricaoOpcao}>{opcao.descricao}</Text>
                </View>
                <MaterialIcons
                  name={selecionado ? "radio-button-checked" : "radio-button-unchecked"}
                  size={22}
                  color={selecionado ? "#E38330" : "#D5D8DE"}
                />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={[styles.rodape, { paddingBottom: insets.bottom + 16 }]}>
        {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}
        <Pressable
          style={[styles.botaoConfirmar, enviando && { opacity: 0.5 }]}
          onPress={confirmarPedido}
          disabled={enviando}
        >
          <Text style={styles.textoConfirmar}>{enviando ? "Enviando..." : "Confirmar pedido"}</Text>
          <Text style={styles.textoConfirmar}>{formatarPreco(total)} ✓</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F6F3",
  },

  vazio: {
    textAlign: "center",
    color: "#9AA1B0",
    marginTop: 40,
  },

  cartao: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 16,
    marginBottom: 14,
  },

  tituloCartao: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0F1F47",
    letterSpacing: 0.5,
    marginBottom: 6,
  },

  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
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

  linhaEntrega: {
    borderTopWidth: 1,
    borderColor: "#ECEAE4",
    marginTop: 12,
    paddingTop: 12,
  },

  textoEntrega: {
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

  opcao: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#ECEAE4",
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
  },

  opcaoSelecionada: {
    borderColor: "#E38330",
    backgroundColor: "#FDEBDA",
  },

  nomeOpcao: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0F1F47",
  },

  descricaoOpcao: {
    fontSize: 12,
    color: "#9AA1B0",
    marginTop: 2,
  },

  rodape: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  mensagem: {
    color: "#C0392B",
    textAlign: "center",
    marginBottom: 8,
  },

  botaoConfirmar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E38330",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  textoConfirmar: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },
});
