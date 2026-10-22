import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import HomeScreen from "../screens/HomeScreen"
import CarrinhoScreen from "../screens/CarrinhoScreen"
import PedidosScreen from "../screens/PedidoScreen"
import PerfilScreen from "../screens/PerfilScreen"

const Bottom = createBottomTabNavigator();

export function BottomRoutes(){
    return(
        <Bottom.Navigator
        initialRouteName = "perfil"
        screenOptions = {{
            headerShown: false,
            tabBarActiveTintColor: "#E38330",
        }}
        
        >

        <Bottom.Screen
            name =  "inicio"
            component = {HomeScreen}
        />

        <Bottom.Screen
            name =  "carrinho"
            component = {CarrinhoScreen}
        />
        <Bottom.Screen
            name =  "pedidos"
            component = {PedidosScreen}
        />

        <Bottom.Screen
            name =  "perfil"
            component = {PerfilScreen}
        />


        

        </Bottom.Navigator>
    )
}