import React from 'react';
import { Dimensions, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const win = Dimensions.get('window');
export default class CardReserva extends React.Component {

    state = {
        imgh: 50,
    }
    componentWillMount() {
        const imgh = (win.width - 20) / 4;
        this.setState({imgh});
    }
    handleOnPress = () => {
        this.props.navigation.navigate("SingleAnuncio", {
            anuncio: this.props.anuncio,
          });
    }
    render() {
        return (
            <TouchableOpacity onPress={this.handleOnPress}>
                <View style={styles.card}>
                    <View style={styles.container}>
                        <View style={{flexDirection: "row"}}>
                            <Image source={require('../assets/hora.png')}  style={{height: 18, width: 18, marginRight: 5}}/>
                            <Text style={styles.date}>{this.props.anuncio.fecha}</Text>
                        </View>
                        <Text style={styles.title}>{this.props.anuncio.titulo}</Text>
                    </View>
                    <Image source={{uri: `https://arxsmart.com/api/uploads/images/${this.props.anuncio.imagen}`}} style={[styles.image, {height: this.state.imgh}]} />
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
        paddingVertical: 15,
        borderRadius: 5,
        flex: 3,
        flexDirection: "column",
    },
    date: {
        color: "slategray",
    },
    title: {
        fontWeight: "bold",
        marginTop: 5,
        fontSize: 17,
    },
    image: {
        flex: 1,
    }
});