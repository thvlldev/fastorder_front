// Cores, textos e formatações usados em mais de uma tela

export const CORES = {
  azul: "#163469",
  azulEscuro: "#0F1F47",
  laranja: "#E38330",
  laranjaClaro: "#FDEBDA",
  amarelo: "#F9CA5E",
  fundo: "#F7F6F3",
  branco: "#FFFFFF",
  texto: "#36454F",
  textoSuave: "#9AA1B0",
  borda: "#ECEAE4",
  erro: "#C0392B",
  sucesso: "#2E8B57",
};

// Categoria do back (enum Categoria)
export const CATEGORIAS = [
  { valor: "OFERTAS", nome: "Ofertas" },
  { valor: "CARNE", nome: "Carne" },
  { valor: "FRANGO", nome: "Frango" },
  { valor: "ACOMPANHAMENTOS", nome: "Acompanhamentos" },
  { valor: "SOBREMESAS", nome: "Sobremesas" },
  { valor: "BEBIDAS", nome: "Bebidas" },
];

// Forma de pagamento do back (enum MetodoPagamento)
export const PAGAMENTOS = [
  { valor: "PIX", nome: "PIX", descricao: "Pagamento instantâneo", icone: "bolt" },
  { valor: "CARTAO", nome: "Cartão", descricao: "Crédito ou débito na entrega", icone: "credit-card" },
  { valor: "DINHEIRO", nome: "Dinheiro", descricao: "Pagamento na entrega", icone: "attach-money" },
];

// Status do pedido no back (enum Status)
const STATUS_PEDIDO = {
  PENDENTE: "PENDENTE",
  EM_PREPARO: "EM PREPARO",
  PRONTO: "PRONTO",
  EM_TRANSPORTE: "A CAMINHO",
  RECUSADO: "RECUSADO",
  CANCELADO: "CANCELADO",
  FINALIZADO: "ENTREGUE",
};

export function nomeCategoria(valor) {
  const categoria = CATEGORIAS.find((c) => c.valor === valor);
  return categoria ? categoria.nome : valor;
}

export function nomePagamento(valor) {
  const pagamento = PAGAMENTOS.find((p) => p.valor === valor);
  return pagamento ? pagamento.nome : "Não informado";
}

export function nomeStatus(valor) {
  return STATUS_PEDIDO[valor] || valor;
}

export function pedidoEmAndamento(status) {
  return status !== "FINALIZADO" && status !== "CANCELADO" && status !== "RECUSADO";
}

// 32.9 -> "R$ 32,90"
export function formatarPreco(valor) {
  return "R$ " + Number(valor || 0).toFixed(2).replace(".", ",");
}

// "2026-11-15T16:44:08" -> "15/11/2026"
export function formatarData(data) {
  if (!data) return "";
  const [ano, mes, dia] = String(data).substring(0, 10).split("-");
  return dia + "/" + mes + "/" + ano;
}

export function formatarEndereco(endereco) {
  return endereco.logradouro + ", " + endereco.numero;
}

export function textoItens(quantidade) {
  if (quantidade === 0) return "Nenhum item";
  return quantidade + (quantidade === 1 ? " item" : " itens");
}
