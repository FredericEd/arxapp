import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { getPedidos } from '../actions/apiFunctions';
import CardReserva from '../elements/CardReserva';
import { connect } from 'react-redux';
import { updateLoader } from '../redux/actions';

const ReservasHeader = props => {
  return (
      <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate("Instalaciones")}>
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
      this.props.updateLoader(true);
      const elements = await getPedidos(this.props.casa.id_casa, this.props.usuario.api_key);
      this.setState({elements});
      this.props.updateLoader(false);
    }
    render() {
      return (
          <FlatList
            data={this.state.elements}
            renderItem={({ item }) => (
              <CardReserva pedido={item} />
            )}
            keyExtractor={element => "" + element.id_instalacion_pedido}
            ListHeaderComponent= {<ReservasHeader navigation={this.props.navigation} />}
          />
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
});
const mapStateToProps = state => ({
    usuario: state.usuario,
    casa: state.casa,
});
export default connect(mapStateToProps, {updateLoader: updateLoader})(ReservasScreen);