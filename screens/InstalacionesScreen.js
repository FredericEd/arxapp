import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import {getInstalaciones} from '../actions/apiFunctions';
import CardInstalacion from '../elements/CardInstalacion';
import { connect } from 'react-redux';
import { updateLoader } from '../redux/actions';

class ReservasScreen extends React.Component {

    state = {
      elements: [], 
    }
    componentDidMount() {
      this.didFocus = this.props.navigation.addListener('didFocus', () => this.handleInstalaciones());
    }
    componentWillUnmount() {
      this.didFocus.remove();
    }
    handleInstalaciones = async () => {
      this.props.updateLoader(true);
      const elements = await getInstalaciones(this.props.casa.id_casa, this.props.usuario.api_key);
      this.setState({elements});
      this.props.updateLoader(false);
    }
    render() {
      return (
          <FlatList
            style={{paddingLeft:5, paddingTop:5}}
            data={this.state.elements}
            renderItem={({ item }) => (
              <CardInstalacion instalacion={item} navigation={this.props.navigation} />
            )}
            keyExtractor={element => "" + element.id_instalacion}
            numColumns={2}
          />
      );
    }
  }
  const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
    },
  });
const mapStateToProps = state => ({
    usuario: state.usuario,
    casa: state.casa,
})
export default connect(mapStateToProps, {updateLoader: updateLoader})(ReservasScreen);