 import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen"
import CadastroScreen from "../screens/CadastroScreen"
import ProdutoScreen from "../screens/ProdutoScreen";
 const Stack = createNativeStackNavigator();


 export function StackRoutes(){
     return(
        <Stack.Navigator screenOptions = {{headerShown: false}}>

             <Stack.Screen
             name = "inicio"
             component={HomeScreen}
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

                
         </Stack.Navigator>
     )
 }
