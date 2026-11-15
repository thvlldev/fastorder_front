import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import Cabecalho from "../components/Cabecalho";
import EstadoVazio from "../components/EstadoVazio";
import ProdutoImagem from "../components/ProdutoImagem";
import { useAuth } from "../contexts/AuthContext";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { TAXA_ENTREGA } from "../services/api";
import { formatarPreco, textoItens } from "../utils/formatos";

export default function CarrinhoScreen(){
    const navigation = useNavigation();
    const { usuario } = useAuth();
    const { itens, alterarQuantidade, totalItens, subtotal } = useCarrinho();

    const total = subtotal + TAXA_ENTREGA;

    // Sem login vai pra tela de login. Depois de entrar, volta pro carrinho.
    function irParaPagamento() {
        navigation.navigate(usuario ? "finalizar" : "login");
    }

    return(
        <View style={styles.container}>
            <Cabecalho
                titulo="Meu Carrinho"
                subtitulo={textoItens(totalItens)}
                onVoltar={() => navigation.navigate("inicio")}
            />

            {itens.length === 0 ? (
                <EstadoVazio
                    icone="shopping-cart"
                    titulo="Carrinho vazio"
                    texto="Explore o cardápio e adicione os itens que quiser."
                    textoBotao="Ver cardápio"
                    onPress={() => navigation.navigate("inicio")}
                />
            ) : (
                <>
                    <ScrollView contentContainerStyle={{ padding: 16 }}>
                        {itens.map((item) => (
                            <View key={item.produto.id} style={styles.cartaoItem}>
                                <ProdutoImagem imagem={item.produto.imagem} style={styles.imagem} tamanhoIcone={28} />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.nome} numberOfLines={1}>{item.produto.nome}</Text>
                                    {item.observacao ? (
                                        <Text style={styles.observacao} numberOfLines={2}>{item.observacao}</Text>
                                    ) : null}
                                    <View style={styles.linhaItem}>
                                        <View style={styles.quantidade}>
                                            {/* Com 1 unidade o menos vira lixeira e tira o item */}
                                            <Pressable
                                                style={[styles.botaoQuantidade, styles.botaoMenos]}
                                                onPress={() => alterarQuantidade(item.produto.id, item.quantidade - 1)}
                                            >
                                                <MaterialIcons
                                                    name={item.quantidade === 1 ? "delete" : "remove"}
                                                    size={16}
                                                    color="#C0392B"
                                                />
                                            </Pressable>
                                            <Text style={styles.numeroQuantidade}>{item.quantidade}</Text>
                                            <Pressable
                                                style={styles.botaoQuantidade}
                                                onPress={() => alterarQuantidade(item.produto.id, item.quantidade + 1)}
                                            >
                                                <MaterialIcons name="add" size={16} color="#F9CA5E" />
                                            </Pressable>
                                        </View>
                                        <Text style={styles.preco}>
                                            {formatarPreco(item.produto.preco * item.quantidade)}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        ))}

                        <View style={styles.cartao}>
                            <Text style={styles.tituloCartao}>RESUMO</Text>
                            <View style={styles.linhaResumo}>
                                <Text style={styles.textoResumo}>Subtotal</Text>
                                <Text style={styles.valorResumo}>{formatarPreco(subtotal)}</Text>
                            </View>
                            <View style={styles.linhaResumo}>
                                <Text style={styles.textoResumo}>Taxa de entrega</Text>
                                <Text style={styles.valorResumo}>{formatarPreco(TAXA_ENTREGA)}</Text>
                            </View>
                            <View style={[styles.linhaResumo, styles.linhaTotal]}>
                                <Text style={styles.textoTotal}>Total</Text>
                                <Text style={styles.valorTotal}>{formatarPreco(total)}</Text>
                            </View>
                        </View>

                        {!usuario && (
                            <View style={styles.aviso}>
                                <MaterialIcons name="info" size={16} color="#163469" />
                                <Text style={styles.textoAviso}>É necessário estar logado para finalizar o pedido.</Text>
                            </View>
                        )}
                    </ScrollView>

                    <View style={styles.rodape}>
                        <Pressable style={styles.botaoPagamento} onPress={irParaPagamento}>
                            <Text style={styles.textoPagamento}>Ir para pagamento</Text>
                            <Text style={styles.textoPagamento}>{formatarPreco(total)} →</Text>
                        </Pressable>
                    </View>
                </>
            )}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F6F3",
    },

    cartaoItem: {
        flexDirection: "row",
        gap: 12,
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        padding: 12,
        marginBottom: 12,
    },

    imagem: {
        width: 64,
        height: 64,
        borderRadius: 12,
    },

    nome: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#0F1F47",
    },

    observacao: {
        fontSize: 11,
        color: "#9AA1B0",
        marginTop: 2,
    },

    linhaItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 8,
    },

    quantidade: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        backgroundColor: "#F7F6F3",
        borderRadius: 12,
        padding: 4,
    },

    botaoQuantidade: {
        width: 28,
        height: 28,
        borderRadius: 9,
        backgroundColor: "#0F1F47",
        alignItems: "center",
        justifyContent: "center",
    },

    botaoMenos: {
        backgroundColor: "#FBE4E1",
    },

    numeroQuantidade: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#0F1F47",
    },

    preco: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#E38330",
    },

    cartao: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        padding: 16,
        marginBottom: 12,
    },

    tituloCartao: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#0F1F47",
        letterSpacing: 0.5,
        marginBottom: 6,
    },

    linhaResumo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 8,
    },

    textoResumo: {
        fontSize: 13,
        color: "#9AA1B0",
    },

    valorResumo: {
        fontSize: 13,
        color: "#36454F",
    },

    linhaTotal: {
        borderTopWidth: 1,
        borderColor: "#ECEAE4",
        marginTop: 12,
        paddingTop: 12,
    },

    textoTotal: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#0F1F47",
    },

    valorTotal: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#E38330",
    },

    aviso: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#E9EEF8",
        borderRadius: 12,
        padding: 12,
    },

    textoAviso: {
        flex: 1,
        fontSize: 12,
        color: "#163469",
    },

    rodape: {
        padding: 16,
    },

    botaoPagamento: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#0F1F47",
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 16,
    },

    textoPagamento: {
        color: "#F9CA5E",
        fontWeight: "bold",
        fontSize: 15,
    },
});
