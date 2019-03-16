import React from 'react';
import { Dimensions, Image, StyleSheet, View, Text } from 'react-native';

export default class CardReserva extends React.Component {

    state = {
        imgh: 50,
    }
    componentWillMount() {
        const win = Dimensions.get('window');
        const imgh = (win.width - 10) / 3;
        this.setState({imgh});
    }
    render() {
        return (
          <View>
            <View style={styles.card}>
                <Image source={{uri: `https://arxsmart.com/api/uploads/images/${this.props.pedido.instalacion.imagen}`}} style={styles.image} />
                <View style={{flex:2}}>
                <View style={styles.container}>
                    <Text style={styles.title}>{this.props.pedido.instalacion.nombre}</Text>
                    <Text style={styles.text}>{this.props.pedido.fecha}</Text>
                    <Text style={styles.text}>{this.props.pedido.horas} hora(s)</Text>
                    <Text style={styles.text}>Valor ${this.props.pedido.instalacion.precio}.00</Text>
                </View>
                </View>
            </View>
          </View>
        );
      }
}
const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#ddd',
        elevation: 2,
        marginHorizontal: 10,
        marginBottom: 10,
        flexDirection: "row",
    },
    container: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
        flexDirection: "column",
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
    },
    text: {
        color:"#B2B2B2",
    },
    image: {
        borderBottomLeftRadius: 3,
        borderTopLeftRadius: 3,
        flex: 1,
        aspectRatio:1,
    }
});