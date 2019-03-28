import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text, TextInput, Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import {recoverClave, confirmClave, saveClave} from '../actions/authFunctions';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import { StackActions } from 'react-navigation';
import { updateLoader } from '../redux/actions';
import Loader from '../elements/Loader';

class RecoverScreen extends React.Component {
    state = {
        cedula: '',
        cedula2: '',
        codigo: '',
        clave1: '',
        clave2: '',
        isDialogClaveVisible: false,
    }
    handleRecover = async () => {
      try {
        if (this.state.cedula != "") {
          this.props.updateLoader(true);
          const response = await recoverClave(this.state.cedula);
          Toast.show(response["message"], Toast.LONG);
          this.setState({cedula2: this.state.cedula});
          this.props.updateLoader(false);
        } else Toast.show("Debe llenar el campo de cédula.", Toast.LONG);
      } catch (e) {
          this.props.updateLoader(false);
          Toast.show("Ha ocurrido un error. Verifique su conexión a internet.", Toast.LONG);
      }
    }
    handleConfirm = async () => {
      try {
        if (this.state.cedula2 != "" && this.state.codigo != "") {
          this.props.updateLoader(true);
          const response = await confirmClave(this.state.cedula2, this.state.codigo);
          Toast.show(response["message"], Toast.LONG);
          !response.error && this.setState({isDialogClaveVisible: true});
          this.props.updateLoader(false);
        } else Toast.show("Todos los campos son obligatorios.", Toast.LONG);
      } catch (e) {
          this.props.updateLoader(false);
          Toast.show("Ha ocurrido un error. Verifique su conexión a internet.", Toast.LONG);
      }
    }
    handleSaveClave = async () => {
      try {
        if (this.state.clave1 != "" && this.state.clave2 != "") {
          if (this.state.clave1 != this.state.clave2) {
            Toast.show("Las claves ingresadas no coinciden.", Toast.LONG);
            return;
          }
          this.props.updateLoader(true);
          const response = await saveClave(this.state.cedula2, this.state.clave1, this.state.codigo);
          Toast.show(response["message"], Toast.LONG);
          if (!response.error){
              this.cancelDialog();
              this.props.navigation.dispatch(StackActions.popToTop())
          } else Toast.show("Todos los campos son obligatorios.", Toast.LONG);
          this.props.updateLoader(false);
        }
      } catch (e) {
          this.props.updateLoader(false);
          Toast.show("Ha ocurrido un error. Verifique su conexión a internet.", Toast.LONG);
      }
    }
    cancelDialog = () =>  this.setState({isDialogClaveVisible: false});
    handleCedula = cedula => this.setState({cedula});
    handleCedula2 = cedula2 => this.setState({cedula2});
    handleCodigo = codigo => this.setState({codigo});
    handleClave1 = clave1 => this.setState({clave1});
    handleClave2 = clave2 => this.setState({clave2});

    render() {
      return (
        <ScrollView keyboardShouldPersistTaps="always">
          <Loader loader={this.props.loader} />
          <View style={styles.container}>
            <Modal
              animationType={"fade"}
              transparent={true}
              visible={this.state.isDialogClaveVisible}
              onShow={() => { this.textInput.focus(); }}
              onRequestClose={this.cancelDialog} >
                <View style={styles.modalBackground}>
                    <View style={styles.modalBody}>
                    <Text style={styles.title}>ARX</Text>
                    <Text>Ingrese su nueva clave:</Text>
                    <TextInput style = {styles.input}
                      ref={(input) => { this.textInput = input; }}
                      placeholder="nueva clave"
                      value={this.state.clave1}
                      onChangeText={this.handleClave1}
                      maxLength = {50}
                      secureTextEntry />
                    <Text>Confirme su nueva clave:</Text>
                    <TextInput style = {styles.input}
                      placeholder="confirme clave"
                      value={this.state.clave2}
                      onChangeText={this.handleClave2}
                      maxLength = {50}
                      secureTextEntry />
                    <View style={{flexDirection: "row", marginTop: 10,}}>
                    <View style={{flex:1}} />
                    <TouchableOpacity style={styles.smallButton} onPress={this.cancelDialog}>
                        <Text style={styles.textLeft}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallButton} onPress={this.handleSaveClave}>
                        <Text style={styles.textLeft}>Aceptar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={30} behavior={"position"}>
              <View style={{flexDirection:"row"}}>
                  <View style={{flex:1}}/>
                  <Text style={styles.title}>Recuperación de clave</Text>
                  <View style={{flex:1}}/>
              </View>
              <Text style={styles.instructions}>Para recuperar su clave, ingrese su cédula. Seguidamente obtendrá un código de seguridad que podrá ingresar en la parte inferior.</Text>
              <TextInput style = {styles.input}
                  placeholder="cedula"
                  value={this.state.cedula}
                  onChangeText={this.handleCedula}
                  autoCapitalize="none"
                  maxLength = {10} />
              <TouchableOpacity style={styles.buttonContainer} onPress={this.handleRecover}>
                  <Text style={styles.buttonText}>Solicitar código</Text>
              </TouchableOpacity>
              <View style={styles.separator} />
              <View style={{flexDirection:"row"}}>
                  <View style={{flex:1}}/>
                  <Text style={styles.title}>Confirmación de código</Text>
                  <View style={{flex:1}} />
              </View>
              <Text style={styles.instructions}>Si ya cuenta con un código de seguridad, ingréselo junto a su cédula:</Text>
              <TextInput style = {styles.input}
                  placeholder="cedula"
                  value={this.state.cedula2}
                  onChangeText={this.handleCedula2}
                  autoCapitalize="none"
                  maxLength = {10} />
              <TextInput style = {styles.input}
                  placeholder="código de seguridad"
                  value={this.state.codigo}
                  onChangeText={this.handleCodigo}
                  maxLength = {10} />
              <TouchableOpacity style={styles.buttonContainer} onPress={this.handleConfirm}>
                  <Text style={styles.buttonText}>Confirmar código</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      )
  }
}
const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    title: {
        fontSize: 20,
        marginBottom: 5,
    },
    smallButton: {
      margin: 5,
    },
    textLeft: {
      paddingHorizontal: 10,
      padding: 3,
      color: "#79BAEC",
    },
    instructions:{
        color:"#606060",
        marginBottom: 10,
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
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    separator:{
        height: 2,
        backgroundColor: "lightgray",
        marginVertical: 10,
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
});
export default connect(null, {updateLoader: updateLoader})(RecoverScreen)