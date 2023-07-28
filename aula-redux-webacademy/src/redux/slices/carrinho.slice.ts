import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ProdutoCarrinho {
  nome: string;
  quantidade: number;
  preco: number;
  precoTotal: number; // Adicionando a propriedade precoTotal
}

interface CarrinhoState {
  produtos: ProdutoCarrinho[];
}

const initialState: CarrinhoState = {
  produtos: [],
};

const carrinhoSlice = createSlice({
  name: "carrinhoSlice",
  initialState,
  reducers: {
    addProdutoNome: (state, action: PayloadAction<string>) => {
      const nome = action.payload;
      const produtoNoCarrinho = state.produtos.find((p) => p.nome === nome);
      if (produtoNoCarrinho) {
        produtoNoCarrinho.quantidade++;
        produtoNoCarrinho.precoTotal =
          produtoNoCarrinho.preco * produtoNoCarrinho.quantidade;
      } else {
        const produto = { nome, quantidade: 1, preco: 0, precoTotal: 0 };
        state.produtos.push(produto);
      }
    },
    removeProdutoNome: (state, action: PayloadAction<string>) => {
      const nome = action.payload;
      state.produtos = state.produtos.filter((p) => p.nome !== nome);
    },
    incrementarQuantidade: (state, action: PayloadAction<string>) => {
      const nome = action.payload;
      const produtoNoCarrinho = state.produtos.find((p) => p.nome === nome);
      if (produtoNoCarrinho) {
        produtoNoCarrinho.quantidade++;
        produtoNoCarrinho.precoTotal =
          produtoNoCarrinho.preco * produtoNoCarrinho.quantidade;
      }
    },
    decrementarQuantidade: (state, action: PayloadAction<string>) => {
      const nome = action.payload;
      const produtoNoCarrinho = state.produtos.find((p) => p.nome === nome);
      if (produtoNoCarrinho && produtoNoCarrinho.quantidade > 1) {
        produtoNoCarrinho.quantidade--;
        produtoNoCarrinho.precoTotal =
          produtoNoCarrinho.preco * produtoNoCarrinho.quantidade;
      }
    },
  },
});

export const {
  addProdutoNome,
  removeProdutoNome,
  incrementarQuantidade,
  decrementarQuantidade,
} = carrinhoSlice.actions;
export default carrinhoSlice.reducer;

export const selectCarrinhoItems = (state: RootState) =>
  state.carrinho.produtos;
