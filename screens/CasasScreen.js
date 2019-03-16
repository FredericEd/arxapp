import React from 'react';
import { FlatList, View } from 'react-native';
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
      this.props.updateLoader(true);
      const elements = await getCasas(this.props.usuario.api_key);
      this.setState({elements});
      if (elements.length == 1) {
        this.props.updateCasa(elements[0]);
        this.props.navigation.navigate('Content');
      }
      this.props.updateLoader(false);
    }
    updateCasa = casa => {
      this.props.updateCasa(casa);
      this.props.navigation.navigate('Content');
    }
    render() {
      return (
        <View style={{flex:1}}>
          <Loader loader={this.props.loader} />
          <FlatList
            data={this.state.elements}
            renderItem={({ item }) => (
              <CardCasa casa={item} updateCasa={this.updateCasa} />
            )}
            keyExtractor={element => "" + element.id_casa}
          />
        </View>
      );
    }
}
const mapStateToProps = state => ({
    usuario: state.usuario,
});
export default connect(mapStateToProps, {updateCasa: updateCasa, updateLoader: updateLoader})(CasasScreen);