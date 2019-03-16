import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text, TextInput, Image} from 'react-native';
import {login} from '../actions/authFunctions';
import {connect} from 'react-redux';
import {updateUser, updateLoader} from '../redux/actions';
import Toast from 'react-native-simple-toast';
import Loader from '../elements/Loader';

class LoginScreen extends React.Component {
    state = {
        correo: '',
        clave: '',
    }
    handleLogin = async () => {
        if (this.state.correo != "" && this.state.clave != "") {
            this.props.updateLoader(true);
            const response = await login(this.state.correo, this.state.clave);
            Toast.show(response[1]["message"], Toast.LONG);
            this.props.updateLoader(false);
            if (response[0]) {
                this.props.updateUser(response[1]["usuario"]);
                this.props.navigation.navigate('Casas');
            }
        } else Toast.show("Todos los campos son obligatorios.", Toast.LONG);
    }
    handleCorreo = correo => this.setState({correo});
    handleClave = clave => this.setState({clave});
    componentDidMount(){
        this.props.updateLoader(false);
        const usuario = this.props.usuario;
        const casa = this.props.casa;
        if (typeof usuario.correo != "undefined") {
            if (typeof casa.numeracion != "undefined")
                this.props.navigation.navigate('Content');
            else
                this.props.navigation.navigate('Casas');
        }
    }

    render() {
        return (
        <View style={{flex:1}}>
            <Loader loader={this.props.loader} />
            <View style={styles.container}>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}}/>
                    <Image style={styles.logo} source={require('../assets/arxlogo2.jpg')} />
                    <View style={{flex:1}}/>
                </View>
                <Text style={styles.error}>{this.state.error}</Text>
                <TextInput style = {styles.input}
                    placeholder="correo"
                    value={this.state.correo}
                    onChangeText={this.handleCorreo}
                    autoCapitalize="none"
                    maxLength = {50}
                />
                <TextInput style = {styles.input}
                    placeholder="clave"
                    value={this.state.clave}
                    onChangeText={this.handleClave}
                    maxLength = {50}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={this.handleLogin}>
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Recover')}>
                    <Text style={styles.buttonText}>Recuperar clave</Text>
                </TouchableOpacity>
            </View>
        </View>
        )
  }
}
const styles = StyleSheet.create({
    container: {
     padding: 20,
     flex:1,
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 12,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    error: {
        textAlign: 'center',
        color: 'red',
    },
    logo: {
        flex: 4,
        marginVertical: 40,
        resizeMode: 'contain',
        aspectRatio:1,
    },
});
const mapStateToProps = state => ({
    usuario: state.usuario,
    casa: state.casa,
});
export default connect(mapStateToProps, {updateUser: updateUser, updateLoader: updateLoader})(LoginScreen);