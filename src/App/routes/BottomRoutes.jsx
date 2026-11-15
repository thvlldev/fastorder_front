import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialIcons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen"
import CarrinhoScreen from "../screens/CarrinhoScreen"
import PedidosScreen from "../screens/PedidoScreen"
import PerfilScreen from "../screens/PerfilScreen"
import { useCarrinho } from "../contexts/CarrinhoContext";

const Bottom = createBottomTabNavigator();

// Ícone de cada aba
function icone(nome) {
    return ({ color, size }) => <MaterialIcons name={nome} size={size} color={color} />
}

export function BottomRoutes(){
    const { totalItens } = useCarrinho();

    return(
        <Bottom.Navigator
        initialRouteName = "inicio"
        screenOptions = {{
            headerShown: false,
            tabBarActiveTintColor: "#E38330",
            tabBarInactiveTintColor: "#B4BAC6",
            tabBarLabelStyle: { fontWeight: "bold" },
        }}

        >

        <Bottom.Screen
            name =  "inicio"
            component = {HomeScreen}
            options = {{ tabBarLabel: "Início", tabBarIcon: icone("home") }}
        />

        <Bottom.Screen
            name =  "carrinho"
            component = {CarrinhoScreen}
            options = {{
                tabBarLabel: "Carrinho",
                tabBarIcon: icone("shopping-cart"),
                tabBarBadge: totalItens > 0 ? totalItens : undefined,
                tabBarBadgeStyle: { backgroundColor: "#E38330", color: "#FFFFFF" },
            }}
        />
        <Bottom.Screen
            name =  "pedidos"
            component = {PedidosScreen}
            options = {{ tabBarLabel: "Pedidos", tabBarIcon: icone("receipt-long") }}
        />

        <Bottom.Screen
            name =  "perfil"
            component = {PerfilScreen}
            options = {{ tabBarLabel: "Perfil", tabBarIcon: icone("person") }}
        />




        </Bottom.Navigator>
    )
}
