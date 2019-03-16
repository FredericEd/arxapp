import React from 'react';
import { TouchableOpacity, Image, View, StyleSheet, Modal, Text } from 'react-native';
import {connect} from 'react-redux';
import { Updates } from 'expo';
import {updateUser, updateCasa} from '../redux/actions';

class MenuRight extends React.Component {
  state = {
    isDialogClaveVisible: false,
  }
  cancelDialog = () => {
    this.setState({isDialogClaveVisible: false});
  }
  handleModal = () => {
    this.setState({isDialogClaveVisible: true});
  }
  cerrarSesion = () => {
    this.cancelDialog();
    this.props.updateUser({});
    this.props.updateCasa({});
    //Updates.reload();
  }
  render() {
    return (
      <View>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.isDialogClaveVisible}
          onRequestClose={this.cancelDialog}>
          <View style={styles.modalBackground}>
            <View style={styles.modalBody}>
              <Text style={styles.title}>ARX</Text>
              <Text>¿Está seguro de que desea cerrar sesión?</Text>
              <View style={{flexDirection: "row", marginTop: 10}}>
                <View style={{flex:1}} />
                <TouchableOpacity style={styles.smallButton} onPress={this.cancelDialog}>
                    <Text style={styles.textLeft}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallButton} onPress={this.cerrarSesion}>
                    <Text style={styles.textLeft}>Sí</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity onPress={this.handleModal}>
          <Image style={styles.img} source={require('../assets/ic_menu2.png')} />
        </TouchableOpacity>
      </View>
    )
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
  img: {
    margin: 10,
    tintColor: "#fff",
  },
  smallButton: {
    margin: 5,
  },
  textLeft: {
    paddingHorizontal: 10,
    padding: 3,
    color: "#79BAEC",
  },
  title: {
      fontSize: 20,
      marginBottom: 5,
  },
});
export default connect(null, {updateUser: updateUser, updateCasa: updateCasa})(MenuRight);