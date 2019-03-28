import React from 'react';
import { FlatList, ScrollView, View, Text, StyleSheet } from 'react-native';
import {getAnuncios} from '../actions/apiFunctions';
import CardAnuncio from '../elements/CardAnuncio';
import { connect } from 'react-redux';
import { updateLoader } from '../redux/actions';

class AnunciosScreen extends React.Component {
  
    state = {
        elements: [],
    }
    componentDidMount() {
      this.didFocus = this.props.navigation.addListener('didFocus', () => this.handleAnuncios());
    }
    componentWillUnmount() {
      this.didFocus.remove();
    }
    handleAnuncios = async () => {
      try {
        this.props.updateLoader(true);
        const elements = await getAnuncios(this.props.casa.id_etapa, this.props.usuario.api_key);
        this.setState({elements});
        this.props.updateLoader(false);
      } catch (e) {
          this.props.updateLoader(false);
          Toast.show("Ha ocurrido un error. Verifique su conexión a internet.", Toast.LONG);
      }
    }
    render() {
        return (
          <ScrollView>
            {this.state.elements.length > 0 &&
            <FlatList
                data={this.state.elements}
                renderItem={({ item }) => (
                  <CardAnuncio anuncio={item} navigation={this.props.navigation} />
                )}
                keyExtractor={element => "" + element.id_anuncio}
            />
            }
            {this.state.elements.length == 0 &&
                <View>
                    <Text style={styles.emptyText}>No hay anuncios disponibles.</Text>
                </View>
            }
          </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
  emptyText:{
    padding:10,
    fontStyle:"italic",
  },
});
const mapStateToProps = state => ({
    usuario: state.usuario,
    casa: state.casa,
});
export default connect(mapStateToProps, {updateLoader: updateLoader})(AnunciosScreen);