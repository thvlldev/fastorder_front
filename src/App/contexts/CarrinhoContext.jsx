// O carrinho fica só no front até confirmar o pedido (anotacoes.md, 2.0)

import { createContext, useContext, useState } from "react";

const CarrinhoContext = createContext(null);

export function CarrinhoProvider({ children }) {
  // Cada item: { produto, quantidade, observacao }
  const [itens, setItens] = useState([]);

  // O back não aceita o mesmo produto duas vezes no pedido,
  // então adicionar de novo soma na quantidade do item que já existe.
  function adicionar(produto, quantidade = 1, observacao = "") {
    setItens((atuais) => {
      const existente = atuais.find((item) => item.produto.id === produto.id);
      if (!existente) {
        return [...atuais, { produto, quantidade, observacao }];
      }
      return atuais.map((item) =>
        item.produto.id === produto.id
          ? {
              ...item,
              quantidade: item.quantidade + quantidade,
              observacao: observacao || item.observacao,
            }
          : item
      );
    });
  }

  // Quantidade zero tira o item do carrinho
  function alterarQuantidade(produtoId, quantidade) {
    setItens((atuais) =>
      quantidade <= 0
        ? atuais.filter((item) => item.produto.id !== produtoId)
        : atuais.map((item) =>
            item.produto.id === produtoId ? { ...item, quantidade } : item
          )
    );
  }

  function limpar() {
    setItens([]);
  }

  const totalItens = itens.reduce((soma, item) => soma + item.quantidade, 0);
  const subtotal = itens.reduce(
    (soma, item) => soma + item.produto.preco * item.quantidade,
    0
  );

  return (
    <CarrinhoContext.Provider
      value={{ itens, adicionar, alterarQuantidade, limpar, totalItens, subtotal }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  return useContext(CarrinhoContext);
}
