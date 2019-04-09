import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import Toast from 'react-native-root-toast';
import { saveUsuario, getUsuariosByCedula } from '../actions/apiFunctions';

export default class ModalInvitado extends React.Component {

  state = {
    isDialogVisible: false,
    cedula: "",
    cantidad: "1",
    nombre: "",
    correo: "",
    id_usuario: "",
    telefono: "",
    id_casa: "3",
    paso: 0,
  }
  handleCedula = cedula => this.setState({cedula});
  handleCantidad = cantidad => this.setState({cantidad});
  handleNombre = nombre => this.setState({nombre});
  handleCorreo = correo => this.setState({correo});
  handleTelefono = telefono => this.setState({telefono});
  handleSaveUsuario = async () => {
    switch (this.state.paso) {
      case 0:
        if (this.state.cedula.length == 10) {
          const usuarios = await getUsuariosByCedula(this.state.cedula, this.props.usuario.api_key);
          if (usuarios.length > 0) {
            this.setState({paso: 2, id_usuario: usuarios[0]["id_usuario"]});
            this.textCantidad.focus();
          } else {
            this.setState({paso: 1});
            this.textNombre.focus();
          }
        } else Toast.show("La cédula debe tener 10 caracteres.", {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
        break;
      case 1:
        if (this.state.nombre == "" || this.state.correo == "" || this.state.telefono == "") {
          Toast.show("Todos los campos son requeridos.", {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
          });
          return;
        }
      case 2:
        if (this.state.cantidad.length == 0) {
          Toast.show("Debe ingresar la cantidad de veces que podrá ingresar.", {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
          });
          return;
        } else if (parseInt(this.state.cantidad) < 1 || parseInt(this.state.cantidad) > 5) {
          Toast.show("La cantidad debe estar entre 1 y 5.", {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
          });
          return;
        }
        this.cancelUsuario();
        this.props.updateLoader(true);
        const response = await saveUsuario(this.state.id_usuario, this.state.cantidad, this.state.id_casa, this.state.cedula, this.state.nombre, this.state.correo, this.state.telefono, this.props.usuario.api_key);
        Toast.show(response["message"], {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
        !response.error && this.props.handleUsuarios();
        this.props.updateLoader(false);
        break;
    }
  }
  handleNewInvitado = () => {
    this.props.casa.is_mora == "0" ? this.setState({isDialogVisible: true}): 
    Toast.show("No puede acceder a esta funcionalidad mientras esté en mora.", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
    });
  }
  cancelUsuario = () => {
    this.setState({
      isDialogVisible: false,
      cedula: "",
      cantidad: "1",
      nombre: "",
      correo: "",
      id_usuario: "",
      telefono: "",
      paso: 0,
    });
    return true;
  }
  render() {
      return (
        <View keyboardShouldPersistTaps="always">
            <TouchableOpacity style={styles.buttonContainer} onPress={this.handleNewInvitado}>
              <Text style={styles.buttonText}>Nuevo invitado</Text>
            </TouchableOpacity>
          <Modal
            animationType={"fade"}
            transparent={true}
            visible={this.state.isDialogVisible}
            onRequestClose={this.cancelUsuario}
            onShow={() => { this.textCedula.focus(); }}>
            <View style={styles.modalBackground}>
              <View style={styles.modalBody}>
                <Text style={styles.title}>ARX</Text>
                {this.state.paso == 0 &&
                <View>
                  <Text>Ingrese la cédula del invitado o invitada:</Text>
                  <TextInput style = {styles.input} 
                      ref={(input) => { this.textCedula = input; }}
                      placeholder="cédula"
                      keyboardType="number-pad"
                      value={this.state.cedula}
                      onChangeText={this.handleCedula}
                      maxLength = {10}
                  />
                </View>
                }
                {this.state.paso == 1 &&
                <View style={{marginBottom:5}}>
                  <Text>Ingrese los datos del invitado o invitada:</Text>
                  <TextInput style = {styles.input}
                      ref={(input) => { this.textNombre = input; }}
                      placeholder="nombre"
                      autoCapitalize="words"
                      value={this.state.nombre}
                      onChangeText={this.handleNombre}
                      maxLength = {50}
                  />
                  <TextInput style = {styles.input}
                      placeholder="correo"
                      value={this.state.correo}
                      onChangeText={this.handleCorreo}
                      keyboardType="email-address"
                      maxLength = {50}
                  />
                  <TextInput style = {styles.input}
                      placeholder="telefono"
                      value={this.state.telefono}
                      onChangeText={this.handleTelefono}
                      keyboardType="phone-pad"
                      maxLength = {10}
                  />
                </View>
                }
                {(this.state.paso == 1 || this.state.paso == 2) &&
                <View>
                  <Text>Ingrese la cantidad de veces que podrá ingresar el invitado o invitada:</Text>
                  <TextInput style = {styles.input}
                      ref={(input) => { this.textCantidad = input; }}
                      placeholder="de 1 a 5"
                      value={this.state.cantidad}
                      onChangeText={this.handleCantidad}
                      keyboardType="number-pad"
                      maxLength = {1}
                  />
                </View>
                }
                <View style={{flexDirection: "row", marginTop: 10,}}>
                  <View style={{flex:1}} />
                  <TouchableOpacity style={styles.smallButton} onPress={this.cancelUsuario}>
                      <Text style={styles.textLeft}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.smallButton} onPress={this.handleSaveUsuario}>
                      <Text style={styles.textLeft}>Aceptar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      );
  }
}
const styles = StyleSheet.create({
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
    input:{
        backgroundColor: 'rgba(225,225,225,0.5)',
        marginVertical: 5,
        padding: 10,
        borderRadius: 2,
    },
    textLeft: {
        paddingHorizontal: 10,
        padding: 3,
        color: "#79BAEC",
    },
    title: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight: "bold",
    },
    smallButton: {
        margin: 5,
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 12,
        paddingHorizontal: 30,
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 5,
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
});