import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, ScrollView, TextInput, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProdutoImagem from "../components/ProdutoImagem";
import { useAuth } from "../contexts/AuthContext";
import { useCarrinho } from "../contexts/CarrinhoContext";
import * as api from "../services/api";
import { CATEGORIAS, formatarPreco, textoItens } from "../utils/formatos";

export default function HomeScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { usuario } = useAuth();
  const { adicionar } = useCarrinho();

  const [produtos, setProdutos] = useState([]);
  const [categoria, setCategoria] = useState("TODOS");
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState("");

  // Busca no back sempre que muda a categoria ou o texto da busca
  useEffect(() => {
    let cancelado = false;

    async function carregar() {
      setCarregando(true);
      setMensagem("");
      try {
        let lista;
        if (busca.trim()) {
          lista = await api.buscarProdutosPorNome(busca.trim());
          if (categoria !== "TODOS") {
            lista = lista.filter((produto) => produto.categoria === categoria);
          }
        } else if (categoria !== "TODOS") {
          lista = await api.listarProdutosPorCategoria(categoria);
        } else {
          lista = await api.listarProdutosAtivos();
        }
        if (!cancelado) setProdutos(lista);
      } catch (erro) {
        if (!cancelado) {
          setProdutos([]);
          setMensagem(erro.status ? "Não foi possível carregar o cardápio." : erro.message);
        }
      }
      if (!cancelado) setCarregando(false);
    }

    // espera o usuário parar de digitar antes de buscar
    const espera = setTimeout(carregar, busca ? 400 : 0);
    return () => {
      cancelado = true;
      clearTimeout(espera);
    };
  }, [categoria, busca]);

  // Destaques são os produtos da categoria OFERTAS, só na lista completa
  const destaques =
    categoria === "TODOS" && !busca.trim()
      ? produtos.filter((produto) => produto.categoria === "OFERTAS")
      : [];

  function abrirProduto(produto) {
    navigation.navigate("produto", { id: produto.id });
  }

  return (
    <View style={styles.container}>
      <View style={[styles.cabecalho, { paddingTop: insets.top + 16 }]}>
        <View style={styles.linhaTopo}>
          <Image source={require("../../assets/logo_fast_order.png")} style={styles.logo} />
          {usuario ? (
            <Pressable style={styles.botaoEntrar} onPress={() => navigation.navigate("perfil")}>
              <MaterialIcons name="person" size={16} color="#F9CA5E" />
              <Text style={styles.textoEntrar}>{usuario.nome.split(" ")[0]}</Text>
            </Pressable>
          ) : (
            <Pressable style={styles.botaoEntrar} onPress={() => navigation.navigate("login")}>
              <MaterialIcons name="person" size={16} color="#F9CA5E" />
              <Text style={styles.textoEntrar}>Entrar</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.busca}>
          <MaterialIcons name="search" size={20} color="#B5B5B5" />
          <TextInput
            style={styles.inputBusca}
            placeholder="Buscar no cardápio..."
            placeholderTextColor="#B5B5B5"
            value={busca}
            onChangeText={setBusca}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Categorias */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categorias}>
          {[{ valor: "TODOS", nome: "Todos" }, ...CATEGORIAS].map((item) => (
            <Pressable
              key={item.valor}
              onPress={() => setCategoria(item.valor)}
              style={[styles.chip, categoria === item.valor && styles.chipAtivo]}
            >
              <Text style={[styles.textoChip, categoria === item.valor && styles.textoChipAtivo]}>
                {item.nome}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Destaques */}
        {destaques.length > 0 && (
          <View>
            <Text style={[styles.tituloSecao, { marginHorizontal: 16 }]}>Destaques</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.destaques}>
              {destaques.map((produto) => (
                <Pressable key={produto.id} style={styles.cartaoDestaque} onPress={() => abrirProduto(produto)}>
                  <ProdutoImagem imagem={produto.imagem} style={styles.imagemDestaque} />
                  <View style={{ padding: 10 }}>
                    <Text style={styles.nomeProduto} numberOfLines={1}>{produto.nome}</Text>
                    <Text style={styles.preco}>{formatarPreco(produto.preco)}</Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Cardápio completo */}
        <View style={styles.linhaSecao}>
          <Text style={styles.tituloSecao}>Cardápio completo</Text>
          <Text style={styles.contador}>{textoItens(produtos.length)}</Text>
        </View>

        {carregando && <ActivityIndicator color="#E38330" style={{ marginTop: 30 }} />}
        {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}
        {!carregando && !mensagem && produtos.length === 0 && (
          <Text style={styles.vazio}>Nenhum produto encontrado.</Text>
        )}

        {!carregando &&
          produtos.map((produto) => {
            const disponivel = produto.status === "DISPONIVEL";
            return (
              <Pressable key={produto.id} style={styles.cartaoProduto} onPress={() => abrirProduto(produto)}>
                <ProdutoImagem imagem={produto.imagem} style={styles.imagemProduto} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.nomeProduto} numberOfLines={1}>{produto.nome}</Text>
                  <Text style={styles.descricao} numberOfLines={2}>{produto.descricao}</Text>
                  <View style={styles.linhaPreco}>
                    <Text style={styles.preco}>{formatarPreco(produto.preco)}</Text>
                    {disponivel ? (
                      <Pressable style={styles.botaoMais} onPress={() => adicionar(produto)}>
                        <MaterialIcons name="add" size={20} color="#FFFFFF" />
                      </Pressable>
                    ) : (
                      <Text style={styles.indisponivel}>Indisponível</Text>
                    )}
                  </View>
                </View>
              </Pressable>
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F6F3",
  },

  cabecalho: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingBottom: 14,
  },

  linhaTopo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    width: 56,
    height: 40,
    resizeMode: "contain",
  },

  botaoEntrar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#0F1F47",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },

  textoEntrar: {
    color: "#F9CA5E",
    fontWeight: "bold",
    fontSize: 13,
  },

  busca: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F7F6F3",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ECEAE4",
    paddingHorizontal: 14,
    marginTop: 14,
  },

  inputBusca: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: "#222",
  },

  categorias: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
  },

  chip: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ECEAE4",
    paddingHorizontal: 16,
    paddingVertical: 9,
  },

  chipAtivo: {
    backgroundColor: "#0F1F47",
    borderColor: "#0F1F47",
  },

  textoChip: {
    color: "#36454F",
    fontWeight: "bold",
    fontSize: 13,
  },

  textoChipAtivo: {
    color: "#F9CA5E",
  },

  linhaSecao: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 6,
    marginBottom: 10,
  },

  tituloSecao: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0F1F47",
  },

  contador: {
    fontSize: 12,
    color: "#9AA1B0",
  },

  destaques: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
  },

  cartaoDestaque: {
    width: 150,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    overflow: "hidden",
  },

  imagemDestaque: {
    width: 150,
    height: 100,
  },

  cartaoProduto: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 12,
  },

  imagemProduto: {
    width: 84,
    height: 84,
    borderRadius: 12,
  },

  nomeProduto: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#0F1F47",
  },

  descricao: {
    fontSize: 12,
    color: "#9AA1B0",
    marginTop: 3,
  },

  linhaPreco: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },

  preco: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E38330",
  },

  botaoMais: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#E38330",
    alignItems: "center",
    justifyContent: "center",
  },

  indisponivel: {
    fontSize: 12,
    color: "#9AA1B0",
    fontWeight: "bold",
  },

  mensagem: {
    color: "#C0392B",
    textAlign: "center",
    marginTop: 30,
    marginHorizontal: 30,
  },

  vazio: {
    color: "#9AA1B0",
    textAlign: "center",
    marginTop: 30,
  },
});
