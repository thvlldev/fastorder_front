import {NavigationContainer} from "@react-navigation/native"

import {StackRoutes} from "./StackRoutes";

// A Stack é a navegação principal e as abas (BottomRoutes) são a primeira tela dela.
// Assim login, cadastro, produto e finalizar pedido abrem por cima das abas.
export function Routes() {
    return(
        <NavigationContainer>
            <StackRoutes/>
        </NavigationContainer>
    )
}
