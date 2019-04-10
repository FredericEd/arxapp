import React from 'react';
import { FlatList, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { getNotificaciones, saveNotificaciones } from '../actions/apiFunctions';
import CardNotificacion from '../elements/CardNotificacion';
import { connect } from 'react-redux';
import { updateLoader } from '../redux/actions';
import Toast from 'react-native-root-toast';

class ConfiguracionesScreen extends React.Component {
    state = {
      notificaciones: [],
    }
    componentDidMount() {
      this.didFocus = this.props.navigation.addListener('didFocus', () => this.handleNotificaciones());
    }
    componentWillUnmount() {
      this.didFocus.remove();
    }
    handleChangeNotification = (id_tipo_notificacion, value) => {
      const notificaciones = [];
      for (notificacion of this.state.notificaciones) {
        notificacion.id_tipo_notificacion == id_tipo_notificacion && (notificacion.activado = value);
        notificaciones.push(notificacion);
      }
      this.setState({notificaciones});
    }
    handleNotificaciones = async () => {
      try {
        this.props.updateLoader(true);
        const notificaciones = await getNotificaciones(this.props.usuario.api_key);
        this.setState({notificaciones});
        this.props.updateLoader(false);
      } catch (e) {
        this.props.updateLoader(false);
        Toast.show("Ha ocurrido un error. Verifique su conexión a internet.", {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      }
    }
    handleSaveNotificaciones = async () => {
      try {
        let data = "";
        for (notificacion of this.state.notificaciones) {
          if (notificacion.activado == 1) {
            data = data + (data == "" ? "" : ",") + notificacion.id_tipo_notificacion;
          }
        }
        this.props.updateLoader(true);
        const response = await saveNotificaciones(data, this.props.usuario.api_key);
        Toast.show(response["message"], {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
        this.props.updateLoader(false);
      } catch (e) {
          this.props.updateLoader(false);
          Toast.show("Ha ocurrido un error. Verifique su conexión a internet.", {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
          });
      }
    }
    render() {
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Notificaciones activas</Text>
          <View style={styles.separator} />
          <FlatList
            data={this.state.notificaciones}
            renderItem={({ item }) => (
              <CardNotificacion notificacion={item} handleChangeNotification={this.handleChangeNotification} />
            )}
            keyExtractor={element => "" + element.id_tipo_notificacion}
          />
          {this.state.notificaciones.length == 0 &&
            <View>
              <Text style={styles.emptyText}>No hay configuraciones de notificaciones.</Text>
            </View>
          }
          <TouchableOpacity style={styles.buttonContainer} onPress={this.handleSaveNotificaciones}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    }
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  emptyText: {
    padding:10,
    fontStyle:"italic",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  separator: {
      height: 2,
      backgroundColor: "lightgray",
      marginTop: 5,
  },
  buttonContainer:{
      backgroundColor: '#2980b6',
      paddingVertical: 12,
      paddingHorizontal: 30,
      marginTop: 20,
      borderRadius: 5,
  },
  buttonText:{
      color: '#fff',
      textAlign: 'center',
      fontWeight: '700'
  },
});
const mapStateToProps = state => ({
  usuario: state.usuario,
  casa: state.casa,
});
export default connect(mapStateToProps, {updateLoader: updateLoader})(ConfiguracionesScreen);