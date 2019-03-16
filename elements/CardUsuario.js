import React from 'react';
import { Dimensions, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const win = Dimensions.get('window');
export default class CardUsuario extends React.Component {

    handleOnPress = () => {

    }
    render() {
        return (
            <TouchableOpacity onPress={this.handleOnPress}>
                <View style={styles.card}>
                    <View style={styles.container}>
                        <Text style={styles.date}>{this.props.usuario.cedula} -  {this.props.usuario.cantidad} uso(s) disponibles</Text>
                        <Text style={styles.title}>{this.props.usuario.nombre}</Text>
                        <Text>{this.props.usuario.correo}</Text>
                    </View>
                    <Image source={{uri: `https://arxsmart.com/api/uploads/images/${this.props.usuario.imagen}`}} style={[styles.image]} />
                </View>
                <View style={styles.separator} />
            </TouchableOpacity>
        );
      }
}
const styles = StyleSheet.create({
    card: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        flexDirection: "row",
    },
    separator: {
        height: 2,
        backgroundColor: "lightgray",
        width: win.width - 20,
        marginLeft: 10,
        marginTop: 5,
    },
    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        flex: 3,
        flexDirection: "column",
    },
    date: {
        marginLeft: 10,
        color: "slategray",
    },
    title: {
        fontWeight: "bold",
        marginVertical: 5,
        fontSize: 17,
    },
    image: {
        flex: 1,
    }
});