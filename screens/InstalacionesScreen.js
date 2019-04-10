import React from 'react';
import { FlatList, ScrollView, View, Text, StyleSheet } from 'react-native';
import {getInstalaciones} from '../actions/apiFunctions';
import CardInstalacion from '../elements/CardInstalacion';
import { connect } from 'react-redux';
import { updateLoader } from '../redux/actions';

class ReservasScreen extends React.Component {

    state = {
      elements: "", 
    }
    componentDidMount() {
      this.didFocus = this.props.navigation.addListener('didFocus', () => this.handleInstalaciones());
    }
    componentWillUnmount() {
      this.didFocus.remove();
    }
    handleInstalaciones = async () => {
      try {
        this.props.updateLoader(true);
        const elements = await getInstalaciones(this.props.casa.id_casa, this.props.usuario.api_key);
        this.setState({elements});
        this.props.updateLoader(false);
      } catch (e) {
        const elements = [];
        this.props.updateLoader(false);
        this.setState({elements});
        Toast.show("Ha ocurrido un error. Verifique su conexión a internet.", Toast.LONG);
      }
    }
    render() {
      return (
        <ScrollView>
          {this.state.elements != "" && this.state.elements.length > 0 &&
          <FlatList
            style={{paddingLeft:5, paddingTop:5}}
            data={this.state.elements}
            renderItem={({ item }) => (
              <CardInstalacion instalacion={item} navigation={this.props.navigation} />
            )}
            keyExtractor={element => "" + element.id_instalacion}
            numColumns={2} />
          }
          {this.state.elements != "" && this.state.elements.length == 0 &&
              <View>
                  <Text style={styles.emptyText}>No hay instalaciones disponibles.</Text>
              </View>
          }
          </ScrollView>
      );
    }
  }
  const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
    },
    emptyText:{
      padding:10,
      fontStyle:"italic",
    },
  });
const mapStateToProps = state => ({
    usuario: state.usuario,
    casa: state.casa,
})
export default connect(mapStateToProps, {updateLoader: updateLoader})(ReservasScreen);