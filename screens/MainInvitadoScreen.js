import React from 'react';
import { View } from 'react-native';
import Loader from '../elements/Loader';
import MainInvitadoTabsScreen from './MainInvitadoTabsScreen';

export default class MainInvitadoScreen extends React.Component {

  cerrarSesion = () => {
    this.props.navigation.navigate('Auth');
  }
  render() {
    return (
      <View style={{flex:1}}>
        <Loader loader={this.props.loader} />
        <MainInvitadoTabsScreen screenProps={{cerrarSesion: this.cerrarSesion}} />
      </View>
    );
  }
}