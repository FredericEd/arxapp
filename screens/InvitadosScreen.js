import React from 'react';
import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native';
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
        <ScrollView>
            <FlatList
                data={this.state.elements}
                renderItem={({ item }) => (
                  <CardUsuario usuario={item} navigation={this.props.navigation} />
                )}
                keyExtractor={element => "" + element.id_usuario}
                ListHeaderComponent= {<ModalInvitado casa={this.props.casa} usuario={this.props.usuario} updateLoader={this.props.updateLoader}  handleUsuarios={this.handleUsuarios} />}
            />
          {this.state.elements.length == 0 &&
              <View>
                  <Text style={styles.emptyText}>No tiene invitados activos.</Text>
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
export default connect(mapStateToProps, {updateLoader: updateLoader})(InvitadosScreen);