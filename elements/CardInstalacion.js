import React from 'react';
import { Dimensions, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const win = Dimensions.get('window');

export default class CardInstalacion extends React.Component {

    state = {
        imgh: 50,
    }
    componentWillMount() {
        const imgh = win.width;
        this.setState({imgh});
        /*Image.getSize(`https://arxsmart.com/api/uploads/images/${this.props.instalacion.imagen}`, (width, height) => {
            console.log("h1: " + height);
            const win = Dimensions.get('window');
            const imgh = win.width / 2 * height / width;
            console.log("h2: " + imgh);
            this.setState({imgh});
        });*/
        //this.setState({height: 400});
    }

    render() {
        return (
            <TouchableOpacity style={styles.parent} onPress={() => this.props.navigation.navigate("ReservaCreate", {instalacion: this.props.instalacion})}>
                <View style={styles.card}>
                    <Image source={{uri: `https://arxsmart.com/api/uploads/images/${this.props.instalacion.imagen}`}} style={[styles.image]} />
                    <View style={styles.container}>
                        <Text style={styles.text}>{this.props.instalacion.nombre}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
      }
}
const styles = StyleSheet.create({
    parent: {
        width: win.width / 2,
        height: win.width / 2,
        paddingRight:5,
        paddingBottom:5,
    },
    card: {
        alignSelf: 'stretch',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ddd',
        elevation: 2,
        margin: 3,
        flexDirection: "row",
        position: "relative",
    },
    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        bottom: 0,
        left: 0,
        right: 0,
        position: "absolute",
    },
    image: { 
        borderRadius: 10,
        flex: 1,
        aspectRatio:1,
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: 'center',
    } 
});