import React from 'react';
import { Dimensions, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default class CardCasa extends React.Component {

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
          <TouchableOpacity onPress={() => this.props.updateCasa(this.props.casa)}>
            <View style={styles.card}>
                <Image source={{uri: `https://arxsmart.com/api/uploads/images/${this.props.casa.etapa.imagen}`}} style={[styles.image, {height: this.state.imgh}]} />
                <View style={styles.container}>
                    <Text style={styles.title}>{this.props.casa.etapa.urbanizacion.nombre}</Text>
                    <Text style={styles.subtitle}>{this.props.casa.etapa.nombre}</Text>
                    <Text>Manzana {this.props.casa.manzana} - {this.props.casa.numeracion}</Text>
                    <Text>{this.props.casa.etapa.urbanizacion.direccion}</Text>
                </View>
            </View>
          </TouchableOpacity>
        );
      }
}
const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#ddd',
        elevation: 2,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        flexDirection: "row",
    },
    container: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
        flex: 2,
        flexDirection: "column",
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
    },
    subtitle: {
        fontSize: 18,
    },
    image: {
        borderBottomLeftRadius: 3,
        borderTopLeftRadius: 3,
        flex: 1,
    }
});