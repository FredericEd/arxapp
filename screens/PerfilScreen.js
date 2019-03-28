import React from 'react';
import { Dimensions, View, Text, StyleSheet, Image, TouchableOpacity, Linking, TextInput, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';
import { saveComentario, saveClave } from '../actions/apiFunctions';
import { updateLoader } from '../redux/actions';
const win = Dimensions.get('window');

class PerfilScreen extends React.Component {

  state = {
    comentario: "",
    isDialogClaveVisible: false,
    clave1: "",
    clave2: "",
    time: 0,
  }
  handleComentario = comentario => this.setState({comentario});
  handleClave1 = clave1 => this.setState({clave1});
  handleClave2 = clave2 => this.setState({clave2});
  handleSaveComentario = async () => {
    if (this.props.casa.is_mora == "0") {
      if (this.state.comentario != "") {
        this.props.updateLoader(true);
        const response = await saveComentario("3", this.state.comentario, this.props.usuario.api_key);
        Toast.show(response["message"], Toast.LONG);
        this.setState({comentario: ""});
        this.props.updateLoader(false);
      } else Toast.show("No puede enviar comentarios vacíos", Toast.LONG);
    } else Toast.show("No puede acceder a esta funcionalidad mientras esté en mora.", Toast.LONG);
  }
  handleSaveClave = async () => {
    if (this.state.clave1 != "" && this.state.clave2 != "") {
      if (this.state.clave1 != this.state.clave2) {
        Toast.show("Las claves ingresadas no coinciden.", Toast.LONG);
        return;
      }
      this.props.updateLoader(true);
      const response = await saveClave(this.state.clave1, this.props.usuario.api_key);
      Toast.show(response["message"], Toast.LONG);
      !response.error && this.cancelClave();
      this.props.updateLoader(false);
    }
  }
  cancelClave = () => {
    this.setState({
      clave1: "",
      clave2: "", 
      isDialogClaveVisible: false,
    });
  }
  render() {
    return (
        <ScrollView keyboardShouldPersistTaps="always">
        <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={50} behavior={"position"}>
          <View style={styles.container}>
            <Modal
              animationType={"fade"}
              transparent={true}
              visible={this.state.isDialogClaveVisible}
              onShow={() => { this.textInput.focus(); }}
              onRequestClose={this.cancelClave}>
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
                      secureTextEntry
                  />
                  <Text>Confirme su nueva clave:</Text>
                  <TextInput style = {styles.input}
                      placeholder="confirme clave"
                      value={this.state.clave2}
                      onChangeText={this.handleClave2}
                      maxLength = {50}
                      secureTextEntry
                  />
                  <View style={{flexDirection: "row", marginTop: 10,}}>
                    <View style={{flex:1}} />
                    <TouchableOpacity style={styles.smallButton} onPress={this.cancelClave}>
                        <Text style={styles.textLeft}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallButton} onPress={this.handleSaveClave}>
                        <Text style={styles.textLeft}>Aceptar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
              <View style={styles.container}>
                <View style={{flexDirection:"row"}}>
                  <View style={{flex:1}}/>
                  <Image style={styles.logo} source={require('../assets/arxlogo2.png')} />
                  <View style={{flex:1}}/>
                </View>
                <View style={styles.upperText}>
                  <Image source={require('../assets/ic_phone.png')}  style={{height: 18, width: 18, marginRight: 5}}/>
                  <Text>{this.props.usuario.cedula}</Text>
                </View>
                <View style={styles.upperText}>
                  <Image source={require('../assets/ic_user.png')}  style={{height: 18, width: 18, marginRight: 5}}/>
                  <Text>{this.props.usuario.nombre}</Text>
                </View>
                <View style={styles.upperText}>
                  <Image source={require('../assets/ic_mail.png')}  style={{height: 18, width: 18, marginRight: 5}}/>
                  <Text>{this.props.usuario.correo}</Text>
                </View>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.setState({isDialogClaveVisible: true})}>
                    <Text style={styles.buttonText}>Actualizar clave</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.separator} />
              <View style={styles.container}>
                  <Text style={styles.title}>Contactos {this.props.casa.etapa.nombre}</Text>
                  <View style={styles.upperText}>
                    <Image source={require('../assets/ic_phone.png')}  style={{height: 18, width: 18, marginRight: 5}}/>
                    <TouchableOpacity onPress={() => Linking.openURL(`tel:${this.props.casa.etapa.telefono}`)}>
                      <Text style={styles.textLeft}>{this.props.casa.etapa.telefono}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.upperText}>
                    <Image source={require('../assets/ic_mail.png')}  style={{height: 18, width: 18, marginRight: 5}}/>
                    <TouchableOpacity onPress={() => Linking.openURL('mailto:' + this.props.casa.etapa.correo)}>
                      <Text style={styles.textLeft}>{this.props.casa.etapa.correo}</Text>
                    </TouchableOpacity>
                  </View>
              </View>
              <View style={styles.separator} />
              <View style={styles.container}>
                  <Text style={styles.title}>Envía tu comentario:</Text>
                  <TextInput style = {[styles.input, {minHeight: 80}]}
                    placeholder="Mensaje"
                    value={this.state.comentario}
                    onChangeText={this.handleComentario}
                    multiline={true}
                    maxLength = {500} />
                  <TouchableOpacity style={styles.buttonContainer} onPress={this.handleSaveComentario}>
                      <Text style={styles.buttonText}>Enviar</Text>
                  </TouchableOpacity>
              </View>
          </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      padding: 10,
      flexDirection: "column",
    },
    input:{
        backgroundColor: 'rgba(225,225,225,0.5)',
        marginVertical: 5,
        padding: 10,
        borderRadius: 2,
    },
    logo: {
        flex: 2,
        marginBottom: 10,
        aspectRatio:1,
    },
    textLeft: {
      paddingHorizontal: 5,
      color: "#79BAEC",
    },
    title: {
        fontSize: 20,
        marginBottom: 5,
    },
    separator: {
        height: 2,
        backgroundColor: "lightgray",
        width: win.width - 20,
        marginTop: 5,
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 12,
        borderRadius: 5,
        marginTop: 15,
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    upperText:{
      padding:5,
      flexDirection:"row",
    },
    smallButton: {
      margin: 5,
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
const mapStateToProps = state => ({
    usuario: state.usuario,
    casa: state.casa,
});
export default connect(mapStateToProps, {updateLoader: updateLoader})(PerfilScreen);