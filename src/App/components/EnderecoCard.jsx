// Cartão do endereço de entrega com o "Editar" (finalizar pedido e perfil)
// Busca o endereço ativo do usuário no back. Se não tiver nenhum, o Editar cria um.

import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import LabeledInput from "./LabeledInput";
import Button from "./Button";
import * as api from "../services/api";
import { formatarEndereco } from "../utils/formatos";

export default function EnderecoCard({ usuarioId, onEndereco }) {
  const [endereco, setEndereco] = useState(null);
  const [editando, setEditando] = useState(false);
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function carregar() {
    try {
      const enderecos = await api.listarEnderecos(usuarioId);
      // O back devolve só os ativos. O app trabalha com um endereço, o mais recente.
      const atual = enderecos.length > 0 ? enderecos[enderecos.length - 1] : null;
      setEndereco(atual);
      if (onEndereco) onEndereco(atual);
    } catch (erro) {
      setMensagem("Não foi possível carregar o endereço.");
    }
  }

  useEffect(() => {
    carregar();
  }, [usuarioId]);

  function abrirEdicao() {
    setLogradouro(endereco ? endereco.logradouro : "");
    setNumero(endereco ? endereco.numero : "");
    setComplemento(endereco && endereco.complemento ? endereco.complemento : "");
    setMensagem("");
    setEditando(true);
  }

  async function salvar() {
    if (!logradouro.trim() || !numero.trim()) {
      setMensagem("Informe a rua e o número.");
      return;
    }
    setSalvando(true);
    try {
      const dados = {
        logradouro: logradouro.trim(),
        numero: numero.trim(),
        complemento: complemento.trim(),
      };
      if (endereco) {
        await api.atualizarEndereco({ id: endereco.id, ...dados });
      } else {
        await api.criarEndereco({ usuarioId, ...dados });
      }
      await carregar();
      setEditando(false);
      setMensagem("");
    } catch (erro) {
      setMensagem("Não foi possível salvar o endereço.");
    }
    setSalvando(false);
  }

  return (
    <View style={styles.cartao}>
      <View style={styles.linhaTitulo}>
        <Text style={styles.tituloCartao}>ENDEREÇO DE ENTREGA</Text>
        {!editando && (
          <Pressable onPress={abrirEdicao}>
            <Text style={styles.editar}>{endereco ? "Editar" : "Adicionar"}</Text>
          </Pressable>
        )}
      </View>

      {!editando && (
        <View style={styles.linhaEndereco}>
          <View style={styles.icone}>
            <MaterialIcons name="place" size={22} color="#E38330" />
          </View>
          {endereco ? (
            <View style={{ flex: 1 }}>
              <Text style={styles.rua}>{formatarEndereco(endereco)}</Text>
              {endereco.complemento ? (
                <Text style={styles.complemento}>{endereco.complemento}</Text>
              ) : null}
            </View>
          ) : (
            <Text style={styles.semEndereco}>Nenhum endereço cadastrado</Text>
          )}
        </View>
      )}

      {editando && (
        <View style={{ marginTop: 12 }}>
          <LabeledInput label="Rua:" placeholder="Rua das Flores" value={logradouro} onChangeText={setLogradouro} />
          <LabeledInput label="Número:" placeholder="142" value={numero} onChangeText={setNumero} />
          <LabeledInput label="Complemento:" placeholder="Apto 31" value={complemento} onChangeText={setComplemento} />
          <View style={styles.botoes}>
            <Button
              onPress={() => setEditando(false)}
              textButton="Cancelar"
              backgroundButton={"#F7F6F3"}
              textColorButton={"#9AA1B0"}
              widthButton={120}
              espacamentoButton={0}
            />
            <Button
              onPress={salvar}
              disabled={salvando}
              textButton={salvando ? "Salvando..." : "Salvar"}
              backgroundButton={"#E38330"}
              widthButton={120}
              espacamentoButton={0}
            />
          </View>
        </View>
      )}

      {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 16,
    marginBottom: 14,
  },

  linhaTitulo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  tituloCartao: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0F1F47",
    letterSpacing: 0.5,
  },

  editar: {
    color: "#E38330",
    fontSize: 12,
    fontWeight: "bold",
  },

  linhaEndereco: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 14,
  },

  icone: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FDEBDA",
    alignItems: "center",
    justifyContent: "center",
  },

  rua: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0F1F47",
  },

  complemento: {
    fontSize: 12,
    color: "#9AA1B0",
    marginTop: 2,
  },

  semEndereco: {
    fontSize: 14,
    color: "#9AA1B0",
  },

  botoes: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },

  mensagem: {
    color: "#C0392B",
    fontSize: 12,
    marginTop: 8,
  },
});
