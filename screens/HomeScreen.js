import React from 'react';
import { Dimensions, Image, StyleSheet, View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { updateLoader } from '../redux/actions';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { saveEmergencia } from '../actions/apiFunctions';
import { Permissions, Notifications } from 'expo';

const sha1 = require('sha1');
const win = Dimensions.get('window');
class HomeScreen extends React.Component {
  
    state = {
      base64: "", 
      code: "",
      alarma: "0",
      token_push: "",
      isDialogVisible: false,
    }
    interval;
    componentWillMount() {
      this.interval = setInterval(() => this.drawCode(), 5000);
      this.drawCode();
      this.registerForPushNotificationsAsync(this.props.usuario.api_key);
    }
    componentWillUnmount() {
      clearInterval(this.interval);
    }
    changeDialogState = isDialogVisible => this.setState({isDialogVisible});
    handleSaveEmergencia = async () => {
        this.changeDialogState(false);
        this.props.updateLoader(true);
        const response = await saveEmergencia(this.props.casa.id_casa, this.props.usuario.api_key);
        Toast.show(response["message"], Toast.LONG);
        this.props.updateLoader(false);
    }
    lastTap = null;
    handleDoubleTap = () => {
      const now = Date.now();
      const DOUBLE_PRESS_DELAY = 300;
      if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
        this.setState({alarma: "1"});
        this.drawCode();
      } else {
        this.lastTap = now;
      }
    }
    drawCode = () => {
      this.props.updateLoader(false);
      let coeff = 1000 * 60 * 3; //cada 3 minutos
      let date = new Date();
      let rounded = new Date(Math.ceil(date.getTime() / coeff) * coeff);
      rounded = rounded.getTime().toString().replace(/0+$/,'');
      let code = sha1(rounded + this.props.usuario.api_key);

      if (code != this.state.code) {
        const qrcode = require('yaqrcode');
        const base64 = qrcode(this.props.usuario.id_usuario + "." + this.props.casa.id_casa + "." + code + "." + this.state.alarma);
        this.setState({base64, code});
      }
    } 
    registerForPushNotificationsAsync = async (token) => {
      try {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
      
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
      
        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') return;
      
        // Get the token that uniquely identifies this device
        let token_push = await Notifications.getExpoPushTokenAsync();
      
        // POST the token to your backend server from where you can retrieve it to send push notifications.
        const queryString = require('query-string');
        const response = await fetch('https://arxsmart.com/api/v1/usuarios/push', {
          method: 'POST',
          headers: {
              'Content-Type':'application/x-www-form-urlencoded',
              'token': token,
              'Cache-Control': 'no-cache',
              'Expires': '0',
          },
          body: queryString.stringify({token: token_push}),
        });
        console.log(response);
      } catch(error) {
        console.error(error);
      }
    }
    render() {
      return (
        <View style={{padding: 20}}>
          <Modal
            animationType={"fade"}
            transparent={true}
            visible={this.state.isDialogVisible}
            onRequestClose={() => this.changeDialogState(false)}>
            <View style={styles.modalBackground}>
              <View style={styles.modalBody}>
                <Text style={styles.title}>ARX</Text>
                <Text>¿Está seguro de que desea enviar una alerta de emergencia?</Text>
                <View style={{flexDirection: "row", marginTop: 10}}>
                  <View style={{flex:1}} />
                  <TouchableOpacity style={styles.smallButton} onPress={() => this.changeDialogState(false)}>
                    <Text style={styles.textLeft}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.smallButton} onPress={this.handleSaveEmergencia}>
                    <Text style={styles.textLeft}>Sí</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Text style={styles.title}>¡BIENVENIDO A ARX!</Text>
          <Text style={styles.text}>Éste es tu código QR:</Text>
          <View style={styles.container}>
          <TouchableWithoutFeedback onPress={this.handleDoubleTap}>
            <Image style={styles.img} source={{uri: this.state.base64}} />
          </TouchableWithoutFeedback>
          </View>
          {this.props.casa.id_tipo_usuario != 4 &&
          <TouchableOpacity style={[styles.buttonContainer, {marginTop:40}]} onPress={()=>this.changeDialogState(true)}>
            <Text style={styles.buttonText}>Botón de emergencia</Text>
          </TouchableOpacity>
          }
        </View>
      );
    }
}
const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
    },
    title: {
        fontSize: 20,
        marginVertical: 5,
        fontWeight: "bold",
        textAlign: 'center',
    },
    text: {
      textAlign: 'center',
      marginBottom: 20,
      fontSize: 16,
    },
    img: {
      flex: 1,
      height: win.width - 40,
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 12,
        paddingHorizontal: 30,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 5,
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    modalBackground:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)', 
    },
    modalBody:{
      backgroundColor: "white",
      width:300,
      marginTop: 50,
      padding: 20,
      alignSelf: 'center',
      borderRadius: 5,
    },
    textLeft: {
      paddingHorizontal: 10,
      padding: 3,
      color: "#79BAEC",
    },
  });
  const mapStateToProps = state => ({
    usuario: state.usuario,
    casa: state.casa,
  });
export default connect(mapStateToProps, {updateLoader: updateLoader})(HomeScreen);