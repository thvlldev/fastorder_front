import { Routes } from './App/routes';
import { AuthProvider } from './App/contexts/AuthContext';
import { CarrinhoProvider } from './App/contexts/CarrinhoContext';


export default function App() { //Precisa chamar a tela principal!
    return (
        <AuthProvider>
            <CarrinhoProvider>
                <Routes />
            </CarrinhoProvider>
        </AuthProvider>
    )
}
