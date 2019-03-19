import React from 'react';
import { View } from 'react-native';
import MainTabsScreen from './MainTabsScreen';
import Loader from '../elements/Loader';

export default class MainContainerScreen extends React.Component {

  cerrarSesion = () => {
    this.props.navigation.navigate('Auth');
  }
  render() {
    return (
      <View style={{flex:1}}>
        <Loader loader={this.props.loader} />
        <MainTabsScreen screenProps={{cerrarSesion: this.cerrarSesion}} />
      </View>
    );
  }
}