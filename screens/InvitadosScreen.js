import React from 'react';
import { FlatList } from 'react-native';
import { getUsuarios } from '../actions/apiFunctions';
import CardUsuario from '../elements/CardUsuario';
import { connect } from 'react-redux';
import ModalInvitado from '../elements/ModalInvitado';
import { updateLoader } from '../redux/actions';

class InvitadosScreen extends React.Component {
  
  state = {
      elements: [],
  }
  componentDidMount() {
    this.didFocus = this.props.navigation.addListener('didFocus', () => this.handleUsuarios());
  }
  componentWillUnmount() {
    this.didFocus.remove();
  }
  handleUsuarios = async () => {
    this.props.updateLoader(true);
    const elements = await getUsuarios(this.props.casa.id_casa, "4", this.props.usuario.api_key);
    this.setState({elements});
    this.props.updateLoader(false);
  }
  render() {
      return (
        <FlatList
            data={this.state.elements}
            renderItem={({ item }) => (
              <CardUsuario usuario={item} navigation={this.props.navigation} />
            )}
            keyExtractor={element => "" + element.id_usuario}
            ListHeaderComponent= {<ModalInvitado usuario={this.props.usuario} updateLoader={this.props.updateLoader}  handleUsuarios={this.handleUsuarios} />}
        />
      );
  }
}
const mapStateToProps = state => ({
  usuario: state.usuario,
  casa: state.casa,
});
export default connect(mapStateToProps, {updateLoader: updateLoader})(InvitadosScreen);