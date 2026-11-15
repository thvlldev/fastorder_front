// Guarda o usuário logado para todas as telas

import { createContext, useContext, useState } from "react";
import * as api from "../services/api";

const AuthContext = createContext(null);
const CHAVE = "fastorder_usuario";

// No navegador o login fica salvo no localStorage. No celular ele vale até fechar o app.
function lerUsuarioSalvo() {
  try {
    const salvo = globalThis.localStorage?.getItem(CHAVE);
    return salvo ? JSON.parse(salvo) : null;
  } catch (erro) {
    return null;
  }
}

function salvarUsuario(usuario) {
  try {
    if (usuario) {
      globalThis.localStorage?.setItem(CHAVE, JSON.stringify(usuario));
    } else {
      globalThis.localStorage?.removeItem(CHAVE);
    }
  } catch (erro) {
    // sem localStorage (celular), segue só na memória
  }
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(lerUsuarioSalvo);

  // O back devolve id, nome, email e tipoUsuario
  async function entrar(email, senha) {
    const dados = await api.login(email, senha);
    setUsuario(dados);
    salvarUsuario(dados);
    return dados;
  }

  function sair() {
    setUsuario(null);
    salvarUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
