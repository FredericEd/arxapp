import React from 'react';
import { FlatList, ScrollView, View, Text, StyleSheet } from 'react-native';
import { getCasas } from '../actions/apiFunctions';
import CardCasa from '../elements/CardCasa';
import { connect } from 'react-redux';
import { updateCasa, updateLoader } from '../redux/actions';
import Loader from '../elements/Loader';

class CasasScreen extends React.Component {
    state = {
      elements: [],
    }
    componentDidMount() {
      this.handleCasas();
    }
    handleCasas = async () => {
      try {
        this.props.updateLoader(true);
        const elements = await getCasas(this.props.usuario.api_key);
        this.setState({elements});
        elements.length == 1 && this.updateCasa(elements[0]);
        this.props.updateLoader(false);
      } catch (e) {
          this.props.updateLoader(false);
          Toast.show("Ha ocurrido un error. Verifique su conexión a internet.", Toast.LONG);
      }
    }
    updateCasa = casa => {
      this.props.updateCasa(casa);
      this.props.navigation.navigate((casa.id_tipo_usuario == 4 || casa.id_tipo_usuario == 3) ? 'Invitado' :  'Content');
    }
    render() {
      return (
        <View style={{flex:1}}>
          <Loader loader={this.props.loader} />
          {this.state.elements.length > 0 &&
          <View>
            <Text style={styles.title}>Unidades funcionales asignadas:</Text>
            <FlatList
              data={this.state.elements}
              renderItem={({ item }) => (
                <CardCasa casa={item} updateCasa={this.updateCasa} />
              )}
              keyExtractor={element => "" + element.id_casa}
            />
          </View>
          }
          {this.state.elements.length == 0 &&
            <View>
                <Text style={styles.emptyText}>No tiene unidades funcionales asignadas.</Text>
            </View>
          }
        </View>
      );
    }
}
const styles = StyleSheet.create({
  emptyText:{
    padding:10,
    fontStyle:"italic",
  },
  title: {
      paddingHorizontal: 10,
      paddingTop: 10,
      fontSize: 17,
      fontWeight: "bold",
  },
});
const mapStateToProps = state => ({
    usuario: state.usuario,
});
export default connect(mapStateToProps, {updateCasa: updateCasa, updateLoader: updateLoader})(CasasScreen);