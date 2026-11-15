import { useCallback, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Cabecalho from "../components/Cabecalho";
import EstadoVazio from "../components/EstadoVazio";
import { useAuth } from "../contexts/AuthContext";
import * as api from "../services/api";
import { formatarData, formatarPreco, nomeStatus, pedidoEmAndamento } from "../utils/formatos";

export default function PedidoScreen() {
    const navigation = useNavigation();
    const { usuario } = useAuth();

    const [pedidos, setPedidos] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState("");

    // Recarrega toda vez que a aba abre, pra aparecer o pedido que acabou de ser feito.
    // O back já devolve só os não excluídos, do mais recente pro mais antigo.
    useFocusEffect(
        useCallback(() => {
            if (!usuario) {
                setPedidos([]);
                return;
            }
            let cancelado = false;
            setCarregando(true);
            setMensagem("");
            api.listarPedidosUsuario(usuario.id)
                .then((lista) => {
                    if (!cancelado) setPedidos(lista);
                })
                .catch((erro) => {
                    if (!cancelado) setMensagem(erro.status ? "Não foi possível carregar os pedidos." : erro.message);
                })
                .finally(() => {
                    if (!cancelado) setCarregando(false);
                });
            return () => {
                cancelado = true;
            };
        }, [usuario])
    );

    const subtitulo = pedidos.length === 1 ? "1 pedido realizado" : pedidos.length + " pedidos realizados";

    return (
        <View style={styles.container}>
            <Cabecalho titulo="Meus Pedidos" subtitulo={subtitulo} />

            {carregando && pedidos.length === 0 && <ActivityIndicator color="#E38330" style={{ marginTop: 30 }} />}
            {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}

            {!usuario && (
                <EstadoVazio
                    icone="inventory-2"
                    titulo="Entre para ver seus pedidos"
                    texto="Seus pedidos aparecerão aqui depois de confirmados."
                    textoBotao="Entrar"
                    onPress={() => navigation.navigate("login")}
                />
            )}

            {usuario && !carregando && !mensagem && pedidos.length === 0 && (
                <EstadoVazio
                    icone="inventory-2"
                    titulo="Nenhum pedido ainda"
                    texto="Seus pedidos aparecerão aqui depois de confirmados."
                    textoBotao="Explorar cardápio"
                    onPress={() => navigation.navigate("inicio")}
                />
            )}

            {pedidos.length > 0 && (
                <ScrollView contentContainerStyle={styles.areaPedidos}>
                    {pedidos.map((pedido) => {
                        const emAndamento = pedidoEmAndamento(pedido.status);
                        return (
                            <View key={pedido.id} style={styles.cartao}>
                                <View style={styles.linha}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.textoDestaque}>#{pedido.numero}</Text>
                                        <Text style={styles.data}>{formatarData(pedido.data)}</Text>
                                    </View>
                                    <View style={[styles.status, !emAndamento && styles.statusEncerrado]}>
                                        <Text style={[styles.textoStatus, !emAndamento && { color: "#9AA1B0" }]}>
                                            {nomeStatus(pedido.status)}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.itens}>
                                    {pedido.itens.map((item) => (
                                        <View key={item.produtoId} style={[styles.linha, { marginTop: 6 }]}>
                                            <Text style={styles.textoItem} numberOfLines={1}>
                                                {item.quantidade}×  {item.nome}
                                            </Text>
                                            <Text style={styles.valorItem}>
                                                {formatarPreco(item.preco_unitario * item.quantidade)}
                                            </Text>
                                        </View>
                                    ))}
                                </View>

                                <View style={styles.linha}>
                                    <View>
                                        <Text style={styles.data}>Total</Text>
                                        <Text style={styles.total}>{formatarPreco(pedido.total)}</Text>
                                    </View>
                                    <Pressable onPress={() => navigation.navigate("pedidoConfirmado", { id: pedido.id })}>
                                        <Text style={styles.acompanhar}>
                                            {emAndamento ? "● Acompanhar" : "Ver detalhes"}
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F6F3",
    },

    textoDestaque: {
        fontWeight: 'bold',
        color: '#163469',
        fontSize: 15,
    },

    areaPedidos: {
        padding: 16,
    },

    mensagem: {
        color: "#C0392B",
        textAlign: "center",
        marginTop: 30,
        marginHorizontal: 30,
    },

    cartao: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        padding: 16,
        marginBottom: 14,
    },

    linha: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
    },

    data: {
        fontSize: 12,
        color: "#9AA1B0",
        marginTop: 2,
    },

    status: {
        backgroundColor: "#FDEBDA",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },

    statusEncerrado: {
        backgroundColor: "#F1F0EC",
    },

    textoStatus: {
        color: "#E38330",
        fontSize: 11,
        fontWeight: "bold",
    },

    itens: {
        borderTopWidth: 1,
        borderColor: "#ECEAE4",
        marginVertical: 12,
        paddingTop: 6,
    },

    textoItem: {
        flex: 1,
        fontSize: 13,
        color: "#36454F",
    },

    valorItem: {
        fontSize: 13,
        color: "#9AA1B0",
    },

    total: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#E38330",
    },

    acompanhar: {
        color: "#E38330",
        fontSize: 13,
        fontWeight: "bold",
    },
});
