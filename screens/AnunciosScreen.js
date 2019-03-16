import React from 'react';
import { FlatList } from 'react-native';
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
      this.props.updateLoader(true);
      const elements = await getAnuncios(this.props.casa.id_etapa, this.props.usuario.api_key);
      this.setState({elements});
      this.props.updateLoader(false);
    }
    render() {
        return (
          <FlatList
              data={this.state.elements}
              renderItem={({ item }) => (
                <CardAnuncio anuncio={item} navigation={this.props.navigation} />
              )}
              keyExtractor={element => "" + element.id_anuncio}
          />
        );
    }
}
const mapStateToProps = state => ({
    usuario: state.usuario,
    casa: state.casa,
});
export default connect(mapStateToProps, {updateLoader: updateLoader})(AnunciosScreen);