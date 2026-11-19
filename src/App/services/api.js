// Conexão com o back end (fastorder_back)

// No navegador e no emulador iOS, localhost funciona.
// No celular com Expo Go, troque pelo IP do computador na rede, ex: "http://192.168.0.10:8080"
export const BASE_URL = "http://10.0.2.2:8080";

// Mesmo valor de TAXA_ENTREGA no PedidoService do back. O total de verdade é calculado lá.
export const TAXA_ENTREGA = 5.0;

async function requisicao(metodo, rota, corpo) {
  let resposta;
  try {
    resposta = await fetch(BASE_URL + rota, {
      method: metodo,
      headers: corpo ? { "Content-Type": "application/json" } : undefined,
      body: corpo ? JSON.stringify(corpo) : undefined,
    });
  } catch (erro) {
    throw new Error("Não foi possível conectar ao servidor.");
  }

  // Vários endpoints do back devolvem corpo vazio (void)
  const texto = await resposta.text();
  let dados = null;
  if (texto) {
    try {
      dados = JSON.parse(texto);
    } catch (erro) {
      dados = texto;
    }
  }

  if (!resposta.ok) {
    const erro = new Error("Erro " + resposta.status);
    erro.status = resposta.status;
    throw erro;
  }
  return dados;
}

// Produtos
export function listarProdutosAtivos() {
  return requisicao("GET", "/produto/listar-produtos-ativos");
}

export function listarProdutosPorCategoria(categoria) {
  return requisicao("GET", "/produto/listar-produtos-ativos-por-categoria?categoria=" + categoria);
}

export function buscarProdutosPorNome(nome) {
  return requisicao("GET", "/produto/buscar-produto-por-nome?nome=" + encodeURIComponent(nome));
}

export function buscarProduto(id) {
  return requisicao("GET", "/produto/buscar-produto/" + id);
}

// Login e cadastro
export function login(email, senha) {
  return requisicao("POST", "/auth/login", { email, senha });
}

export function cadastrarCliente(dados) {
  return requisicao("POST", "/cliente/criar-cliente", dados);
}

export function alterarSenha(usuarioId, senhaAtual, novaSenha) {
  return requisicao("PUT", "/auth/alterar-senha", { usuarioId, senhaAtual, novaSenha });
}

// Cliente
export function buscarCliente(id) {
  return requisicao("GET", "/cliente/buscar-cliente/" + id);
}

export function atualizarCliente(dados) {
  return requisicao("PUT", "/cliente/atualizar-cliente", dados);
}

// Endereço
export function listarEnderecos(usuarioId) {
  return requisicao("GET", "/endereco/listar-enderecos-usuario/" + usuarioId);
}

export function criarEndereco(dados) {
  return requisicao("POST", "/endereco/criar-endereco", dados);
}

export function atualizarEndereco(dados) {
  return requisicao("PUT", "/endereco/atualizar-endereco", dados);
}

// Pedidos
export function criarPedido(dados) {
  return requisicao("POST", "/pedido/criar-pedido-com-itens", dados);
}

export function buscarPedido(id) {
  return requisicao("GET", "/pedido/buscar-pedido/" + id);
}

export function listarPedidosUsuario(usuarioId) {
  return requisicao("GET", "/pedido/listar-pedidos-usuario/" + usuarioId);
}
