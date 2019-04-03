import React from 'react';
import { Dimensions, StyleSheet, View, Text, Switch } from 'react-native';

const win = Dimensions.get('window');
export default class CardNotificacion extends React.Component {

    state = {
        activado: 0,
    }
    handleOnChange = value => {
        value = value ? 0 : 1;
        this.setState({activado: value});
        this.props.handleChangeNotification(this.props.notificacion.id_tipo_notificacion, value);

    }
    componentDidMount() {
        this.setState({activado: this.props.notificacion.activado});
    }
    render() {
        return (
            <View style={styles.card}>
                <View style={{flexDirection: "row"}}>
                    <Text style={{flex:1}}>{this.props.notificacion.nombre}</Text>
                    <Switch
                        onValueChange = {this.handleOnChange}
                        value = {this.state.activado == 0}/>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    card: {
        marginTop: 20,
        flexDirection: "column",
    },
});