import { useCallback, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet ,ScrollView, Pressable} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../components/Button";
import LabeledInput from "../components/LabeledInput";
import EnderecoCard from "../components/EnderecoCard";
import { useAuth } from "../contexts/AuthContext";
import * as api from "../services/api";
import { PAGAMENTOS, nomePagamento } from "../utils/formatos";

export default function PerfilScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { usuario, sair } = useAuth();

  const [cliente, setCliente] = useState(null);
  const [editando, setEditando] = useState(null); // "telefone", "senha" ou "pagamento"
  const [telefone, setTelefone] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);

  // GET de cliente por id, com telefone e pagamento
  useFocusEffect(
    useCallback(() => {
      setCliente(null);
      setEditando(null);
      setMensagem("");
      if (!usuario) return;
      api.buscarCliente(usuario.id)
        .then(setCliente)
        .catch(() => {}); // usuário que não é cliente mostra só nome e e-mail
    }, [usuario])
  );

  function avisar(texto, deuErro) {
    setMensagem(texto);
    setErro(!!deuErro);
  }

  function abrir(campo) {
    setTelefone(cliente && cliente.telefone ? cliente.telefone : "");
    setSenhaAtual("");
    setNovaSenha("");
    setMensagem("");
    setEditando(editando === campo ? null : campo);
  }

  async function salvarTelefone() {
    try {
      await api.atualizarCliente({ id: usuario.id, telefone: telefone.trim() });
      setCliente({ ...cliente, telefone: telefone.trim() });
      setEditando(null);
      avisar("Telefone atualizado.");
    } catch (e) {
      avisar("Não foi possível atualizar o telefone.", true);
    }
  }

  async function salvarPagamento(valor) {
    try {
      await api.atualizarCliente({ id: usuario.id, metodoPagamento: valor });
      setCliente({ ...cliente, metodoPagamento: valor });
      setEditando(null);
      avisar("Pagamento preferido atualizado.");
    } catch (e) {
      avisar("Não foi possível atualizar o pagamento.", true);
    }
  }

  async function salvarSenha() {
    if (novaSenha.length < 6) {
      avisar("A nova senha precisa ter pelo menos 6 caracteres.", true);
      return;
    }
    try {
      await api.alterarSenha(usuario.id, senhaAtual, novaSenha);
      setEditando(null);
      avisar("Senha alterada.");
    } catch (e) {
      // O back devolve 401 quando a senha atual não confere
      avisar(e.status === 401 ? "Senha atual incorreta." : "Não foi possível alterar a senha.", true);
    }
  }

  // Perfil deslogado
  if (!usuario) {
    return (
      <View style={{ flex: 1, backgroundColor: "#F7F6F3" }}>
        <View style={[styles.bckHeader, { paddingTop: insets.top + 30 }]}>
          <Text style= {styles.textoBemVindo}>Fast Order</Text>
          <Text style={styles.titleBck}>Sua conta</Text>
          <Text style= {styles.textoBemVindo}>Entre para personalizar sua experiência</Text>
        </View>

        <View style={{ padding: 20 }}>
          <View style={[styles.containerBranco, { padding: 20 }]}>
            <MaterialIcons name="person" size={30} color="#163469" style={[styles.iconStyle, { alignSelf: "flex-start" }]} />
            <Text style={styles.tituloDeslogado}>Tudo do seu jeito</Text>
            <Text style={styles.textoDeslogado}>
              Entre ou crie uma conta para deixar seus próximos pedidos ainda mais rápidos.
            </Text>

            <View style={styles.vantagens}>
              {[
                "Acompanhe seus pedidos em um só lugar",
                "Salve seus dados para pedir mais rápido",
                "Atualize suas preferências quando quiser",
              ].map((texto) => (
                <View key={texto} style={styles.vantagem}>
                  <MaterialIcons name="check" size={16} color="#E38330" style={styles.iconeVantagem} />
                  <Text style={styles.textCaixa}>{texto}</Text>
                </View>
              ))}
            </View>

            <Button
              onPress={() => navigation.navigate("login")}
              textButton="Entrar ou criar conta"
              backgroundButton={"#E38330"}
              heightButton={48}
              espacamentoButton={0}
            />
          </View>
          <Text style={styles.versao}>Fast Order App · v1.0.0</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.bckHeader, { paddingTop: insets.top + 30 }]}>
        <Text style= {styles.textoBemVindo}>Bem-vindo de volta!</Text>
        <Text style={styles.titleBck}>Olá, {usuario.nome.split(" ")[0]}</Text>
      </View>

      < ScrollView
        style={{
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: "#F7F6F3",
        }}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {mensagem ? (
          <Text style={[styles.mensagem, erro && { color: "#C0392B" }]}>{mensagem}</Text>
        ) : null}

        <View style={styles.containerBranco}>
          <Text style={[styles.titleCaixa, styles.tituloSecao]}>DADOS PESSOAIS</Text>
          <View style={styles.iconTexto}>
            <MaterialIcons
              name="person"
              size={26}
              color="#001050"
              style={styles.iconStyle}
            />
            <View>
              <Text style={styles.titleCaixa}>NOME</Text>
              <Text style={styles.textCaixa}>{usuario.nome}</Text>
            </View>
          </View>
          <View style={styles.iconTexto}>
            <MaterialIcons
              name="mail"
              size={26}
              color="#001050"
              style={styles.iconStyle}
            />
            <View>
              <Text style={styles.titleCaixa}>EMAIL</Text>
              <Text style={styles.textCaixa}>{usuario.email}</Text>
            </View>
          </View>

          {/* Telefone e pagamento só existem para cliente */}
          {cliente && (
            <View style={styles.iconTexto}>
              <MaterialIcons
                name="call"
                size={26}
                color="#001050"
                style={styles.iconStyle}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.titleCaixa}>TELEFONE</Text>
                <Text style={styles.textCaixa}>{cliente.telefone || "Não informado"}</Text>
              </View>
              <Pressable onPress={() => abrir("telefone")}>
                <Text style={styles.textEditar}>Editar</Text>
              </Pressable>
            </View>
          )}
          {editando === "telefone" && (
            <View style={styles.areaEdicao}>
              <LabeledInput
                label="Telefone:"
                placeholder="(00)00000-0000"
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
              />
              <Button onPress={salvarTelefone} textButton="Salvar" backgroundButton={"#E38330"} espacamentoButton={0} />
            </View>
          )}

          <View style={styles.iconTexto}>
            <MaterialIcons
              name="lock"
              size={26}
              color="#001050"
              style={styles.iconStyle}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.titleCaixa}>SENHA</Text>
              <Text style={styles.textCaixa}>••••••</Text>
            </View>
            <Pressable onPress={() => abrir("senha")}>
              <Text style={styles.textEditar}>Alterar</Text>
            </Pressable>
          </View>
          {editando === "senha" && (
            <View style={styles.areaEdicao}>
              <LabeledInput
                label="Senha atual:"
                placeholder="Insira sua senha atual:"
                value={senhaAtual}
                onChangeText={setSenhaAtual}
                secureTextEntry
              />
              <LabeledInput
                label="Nova senha:"
                placeholder="Mínimo 6 caracteres"
                value={novaSenha}
                onChangeText={setNovaSenha}
                secureTextEntry
              />
              <Button onPress={salvarSenha} textButton="Alterar senha" backgroundButton={"#E38330"} espacamentoButton={0} />
            </View>
          )}
        </View>

        <View style={{ marginTop: 20 }}>
          <EnderecoCard usuarioId={usuario.id} />
        </View>

        {cliente && (
          <View style={[styles.containerBranco, {marginTop: 6}]}>
            <Text style={[styles.titleCaixa, styles.tituloSecao]}>MÉTODO DE PAGAMENTO</Text>
            <View style={styles.iconTexto}>
              <MaterialIcons
                name="attach-money"
                size={26}
                color="#001050"
                style={styles.iconStyle}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.titleCaixa}>PAGAMENTO PREFERIDO</Text>
                <Text style={styles.textCaixa}>{nomePagamento(cliente.metodoPagamento)}</Text>
              </View>
              <Pressable onPress={() => abrir("pagamento")}>
                <Text style={styles.textEditar}>Alterar</Text>
              </Pressable>
            </View>
            {editando === "pagamento" && (
              <View style={[styles.areaEdicao, styles.opcoesPagamento]}>
                {PAGAMENTOS.map((opcao) => (
                  <Button
                    key={opcao.valor}
                    onPress={() => salvarPagamento(opcao.valor)}
                    textButton={opcao.nome}
                    backgroundButton={cliente.metodoPagamento === opcao.valor ? "#E38330" : "#F7F6F3"}
                    textColorButton={cliente.metodoPagamento === opcao.valor ? "#FFFFFF" : "#36454F"}
                    widthButton={90}
                    espacamentoButton={0}
                  />
                ))}
              </View>
            )}
          </View>
        )}

        {/* Área de ajuda */}
        <View style={[styles.containerBranco, {marginTop: 20}]}>
          <Text style={[styles.titleCaixa, styles.tituloSecao]}>AJUDA</Text>
          <View style={styles.iconTexto}>
            <MaterialIcons
              name="chat"
              size={26}
              color="#001050"
              style={styles.iconStyle}
            />
            <View>
              <Text style={styles.textCaixa}>Falar com o restaurante</Text>
            </View>
          </View>
          <View style={styles.iconTexto}>
            <MaterialIcons
              name="star-rate"
              size={26}
              color="#001050"
              style={styles.iconStyle}
            />
            <View>
              <Text style={styles.textCaixa}>Avaliar o aplicativo</Text>
            </View>
          </View>
          <View style={styles.iconTexto}>
            <MaterialIcons
              name="description"
              size={26}
              color="#001050"
              style={styles.iconStyle}
            />
            <View>
              <Text style={styles.textCaixa}>Termos e privacidade</Text>
            </View>
          </View>
        </View>
         {/* Sair da conta */}
          <View style= {[styles.containerBranco, {marginTop: 20}]}>
            <Text style={[styles.titleCaixa, styles.tituloSecao]}>SAIR</Text>
            <Pressable style={styles.iconTexto} onPress={sair}>
            <MaterialIcons
              name="logout"
              size={26}
              color="#001050"
              style={styles.iconStyle}
            />
            <View>
              <Text style={styles.textCaixa}>Sair da conta</Text>
            </View>
          </Pressable>
          </View>

          <Text style={styles.versao}>Fast Order App · v1.0.0</Text>

      </ScrollView>




    </View>


  );
}

const styles = StyleSheet.create({
  bckHeader: {
    backgroundColor: "#163469",
    paddingBottom: 30,
    paddingHorizontal: 20,
  },

  textoBemVindo: {
    fontSize: 13,
    fontWeight: 400,
    color: 'rgba(255, 255, 255, 0.5)'
  },



  containerBranco: {
    backgroundColor: "#fff",
    borderRadius: 15,
    justifyContent:'center',
    paddingBottom: 12,
  },

  tituloSecao: {
    paddingTop: 14,
    paddingLeft: 16,
  },

  iconTexto: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: "#ECEAE4",
    borderStyle: "solid",
    paddingTop: 10,
    paddingHorizontal: 16,

  },

  iconStyle: {
    backgroundColor: "#f0f2fa",
    borderRadius: 12,
    padding: 8,
  },

  titleBck: {
    color: "#fff",
    fontSize: 28,
    fontWeight: 700,
  },

  titleCaixa: {
    color: "rgb(187, 187, 187)",
    fontSize: 11,
    fontWeight: 900
  },
  textCaixa: {
    color: "#211b74",
    fontSize: 14,
    fontWeight: 500,
  },
  textEditar: {
    color: "#f78629", // laranja
    fontSize: 12,
    fontWeight: 700,
  },

  areaEdicao: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  opcoesPagamento: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  mensagem: {
    color: "#2E8B57",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: 600,
  },

  tituloDeslogado: {
    fontSize: 18,
    fontWeight: 700,
    color: "#0F1F47",
    marginTop: 16,
  },

  textoDeslogado: {
    fontSize: 13,
    color: "#9AA1B0",
    marginTop: 8,
    lineHeight: 19,
  },

  vantagens: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ECEAE4",
    marginVertical: 16,
    paddingVertical: 8,
  },

  vantagem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 6,
  },

  iconeVantagem: {
    backgroundColor: "#FDEBDA",
    borderRadius: 6,
    padding: 3,
  },

  versao: {
    textAlign: "center",
    color: "#C4C8D0",
    fontSize: 11,
    marginTop: 20,
  },
});
