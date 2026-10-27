import { View, StyleSheet, Text, ScrollView } from "react-native";
import Button from "../components/Button";

export default function PedidoScreen() {
    return (
        <View style={styles.container}>  
            <Text style = {styles.textoDestaque}>Meus Pedidos</Text>
            <Text>0 pedidos realizados</Text>

            <ScrollView contentContainerStyle={styles.areaPedidos}>
                <View style={{fontSize: 72}}>📦</View>
                <Text style = {styles.textoDestaque}>Nenhum pedido ainda</Text>
                <Text>Seus pedidos aparecerão aqui depois de confirmados</Text>
                <Button
                    
                    textButton={"Explorar cardápio"}
                    backgroundButton={'#E38330'}
                    textColorButton={'#FFFFFF'}
                    heightButton={48}
                    widthButton={220}
                    espacamentoButton={10}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },

    textoDestaque: {
        fontWeight: 'bold',
        color: '#163469'
    },

    areaPedidos: {
        marginTop:200,
        flexGrow: 1,
        alignItems: 'center',
        padding: 10,
    }
});