import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomRoutes } from "./BottomRoutes";
import LoginScreen from "../screens/LoginScreen"
import CadastroScreen from "../screens/CadastroScreen"
import ProdutoScreen from "../screens/ProdutoScreen";
import FinalizarPedidoScreen from "../screens/FinalizarPedidoScreen";
import PedidoConfirmadoScreen from "../screens/PedidoConfirmadoScreen";
 const Stack = createNativeStackNavigator();


 export function StackRoutes(){
     return(
        <Stack.Navigator screenOptions = {{headerShown: false}}>

             <Stack.Screen
             name = "abas"
             component={BottomRoutes}
             />
             <Stack.Screen
             name = "login"
             component={LoginScreen}
             />
             <Stack.Screen
             name = "cadastro"
             component={CadastroScreen}
             />
             <Stack.Screen
             name = "produto"
             component={ProdutoScreen}
             />
             <Stack.Screen
             name = "finalizar"
             component={FinalizarPedidoScreen}
             />
             <Stack.Screen
             name = "pedidoConfirmado"
             component={PedidoConfirmadoScreen}
             />


         </Stack.Navigator>
     )
 }
