import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Text, View, ScrollView } from 'react-native';
import { getPedidos } from '../actions/apiFunctions';
import CardReserva from '../elements/CardReserva';
import { connect } from 'react-redux';
import { updateLoader } from '../redux/actions';
import Toast from 'react-native-root-toast';

const ReservasHeader = props => {
  return (
      <TouchableOpacity style={styles.buttonContainer} onPress={props.handleNewReserva}>
        <Text  style={styles.buttonText}>Nueva reseva</Text>
      </TouchableOpacity>
  );
}
class ReservasScreen extends React.Component {
    state = {
      elements: [],
    }
    componentDidMount() {
      this.didFocus = this.props.navigation.addListener('didFocus', () => this.handlePedidos());
    }
    componentWillUnmount() {
      this.didFocus.remove();
    }
    handlePedidos = async () => {
      try {
        this.props.updateLoader(true);
        const elements = await getPedidos(this.props.casa.id_casa, this.props.usuario.api_key);
        this.setState({elements});
        this.props.updateLoader(false);
      } catch (e) {
          this.props.updateLoader(false);
          Toast.show("Ha ocurrido un error. Verifique su conexión a internet.", {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
          });
      }
    }
    handleNewReserva = () => {
      this.props.casa.is_mora == "0" ? this.props.navigation.navigate("Instalaciones") : 
      Toast.show("No puede acceder a esta funcionalidad mientras esté en mora.", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    }
    render() {
      return (
        <ScrollView>
          <FlatList
            data={this.state.elements}
            renderItem={({ item }) => (
              <CardReserva pedido={item} />
            )}
            keyExtractor={element => "" + element.id_instalacion_pedido}
            ListHeaderComponent= {<ReservasHeader handleNewReserva={this.handleNewReserva} />}
          />
          {this.state.elements.length == 0 &&
              <View>
                  <Text style={styles.emptyText}>No tiene reservas futuras.</Text>
              </View>
          }
          </ScrollView>
      );
    }
}
const styles = StyleSheet.create({
  buttonContainer:{
      backgroundColor: '#2980b6',
      paddingVertical: 12,
      paddingHorizontal: 30,
      marginHorizontal: 10,
      marginVertical: 10,
      borderRadius: 5,
  },
  buttonText:{
      color: '#fff',
      textAlign: 'center',
      fontWeight: '700'
  },
  emptyText:{
    padding:10,
    fontStyle:"italic",
  },
});
const mapStateToProps = state => ({
    usuario: state.usuario,
    casa: state.casa,
});
export default connect(mapStateToProps, {updateLoader: updateLoader})(ReservasScreen);