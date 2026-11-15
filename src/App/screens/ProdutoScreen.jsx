import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../components/Button";
import ProdutoImagem from "../components/ProdutoImagem";
import { useCarrinho } from "../contexts/CarrinhoContext";
import * as api from "../services/api";
import { formatarPreco, nomeCategoria } from "../utils/formatos";

export default function ProdutoScreen(){
    const navigation =useNavigation();
    const route = useRoute();
    const insets = useSafeAreaInsets();
    const { adicionar } = useCarrinho();

    const [produto, setProduto] = useState(null);
    const [quantidade, setQuantidade] = useState(1);
    const [observacao, setObservacao] = useState("");
    const [mensagem, setMensagem] = useState("");

    // GET de produto por id
    useEffect(() => {
        api.buscarProduto(route.params.id)
            .then(setProduto)
            .catch((erro) => setMensagem(erro.status ? "Produto não encontrado." : erro.message));
    }, [route.params.id]);

    function adicionarAoCarrinho() {
        adicionar(produto, quantidade, observacao.trim());
        navigation.goBack();
    }

    if (!produto) {
        return (
            <View style={styles.centro}>
                {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : <ActivityIndicator color="#E38330" />}
                <Button
                    onPress ={()=>navigation.goBack()}
                    textButton="Voltar"
                    backgroundButton={'#E38330'}
                    widthButton={140}/>
            </View>
        )
    }

    const disponivel = produto.status === "DISPONIVEL";

    return(
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <View>
                    <ProdutoImagem imagem={produto.imagem} style={styles.imagem} tamanhoIcone={90} />
                    <Pressable onPress={()=>navigation.goBack()} style={[styles.voltar, { top: insets.top + 14 }]}>
                        <MaterialIcons name="arrow-back" size={22} color="#0F1F47" />
                    </Pressable>
                    <View style={styles.categoria}>
                        <Text style={styles.textoCategoria}>{nomeCategoria(produto.categoria)}</Text>
                    </View>
                </View>

                <View style={styles.conteudo}>
                    <Text style={styles.nome}>{produto.nome}</Text>
                    <Text style={styles.descricao}>{produto.descricao}</Text>

                    {/* Ingredientes pra retirar vão dentro da observação do item (anotacoes.md, 1.1) */}
                    <Text style={styles.tituloSecao}>OBSERVAÇÃO</Text>
                    <TextInput
                        style={styles.observacao}
                        placeholder="Ex: sem cebola, bem passado, molho à parte..."
                        placeholderTextColor="#B5B5B5"
                        value={observacao}
                        onChangeText={setObservacao}
                        multiline
                        maxLength={255}
                    />
                </View>
            </ScrollView>

            <View style={[styles.rodape, { paddingBottom: insets.bottom + 12 }]}>
                <View style={styles.linhaPreco}>
                    <View>
                        <Text style={styles.rotuloPreco}>Preço unitário</Text>
                        <Text style={styles.preco}>{formatarPreco(produto.preco)}</Text>
                    </View>
                    <View style={styles.quantidade}>
                        <Pressable
                            style={[styles.botaoQuantidade, styles.botaoMenos]}
                            onPress={() => setQuantidade(Math.max(1, quantidade - 1))}
                        >
                            <MaterialIcons name="remove" size={18} color="#36454F" />
                        </Pressable>
                        <Text style={styles.numeroQuantidade}>{quantidade}</Text>
                        <Pressable style={styles.botaoQuantidade} onPress={() => setQuantidade(quantidade + 1)}>
                            <MaterialIcons name="add" size={18} color="#F9CA5E" />
                        </Pressable>
                    </View>
                </View>

                <Button
                    onPress={adicionarAoCarrinho}
                    disabled={!disponivel}
                    textButton={disponivel
                        ? "Adicionar ao carrinho  " + formatarPreco(produto.preco * quantidade)
                        : "Produto indisponível"}
                    backgroundButton={'#E38330'}
                    heightButton={48}
                    espacamentoButton={0}/>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
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

    imagem: {
        width: "100%",
        height: 280,
    },

    voltar: {
        position: "absolute",
        left: 16,
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
    },

    categoria: {
        position: "absolute",
        left: 16,
        bottom: 12,
        backgroundColor: "#F9CA5E",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },

    textoCategoria: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#0F1F47",
    },

    conteudo: {
        padding: 20,
    },

    nome: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#0F1F47",
    },

    descricao: {
        fontSize: 14,
        color: "#6B6E71",
        lineHeight: 21,
        marginTop: 10,
    },

    tituloSecao: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#0F1F47",
        letterSpacing: 0.5,
        marginTop: 22,
        marginBottom: 10,
    },

    observacao: {
        backgroundColor: "#F7F6F3",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ECEAE4",
        padding: 12,
        minHeight: 80,
        fontSize: 14,
        color: "#222",
        textAlignVertical: "top",
    },

    rodape: {
        borderTopWidth: 1,
        borderColor: "#ECEAE4",
        paddingHorizontal: 20,
        paddingTop: 12,
    },

    linhaPreco: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    rotuloPreco: {
        fontSize: 11,
        color: "#9AA1B0",
    },

    preco: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#E38330",
    },

    quantidade: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        backgroundColor: "#F7F6F3",
        borderRadius: 14,
        padding: 6,
    },

    botaoQuantidade: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: "#0F1F47",
        alignItems: "center",
        justifyContent: "center",
    },

    botaoMenos: {
        backgroundColor: "#E4E2DC",
    },

    numeroQuantidade: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#0F1F47",
        minWidth: 16,
        textAlign: "center",
    },
});
