import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import MenuRight from '../elements/MenuRight';

const MainInvitadoTabsScreen = createStackNavigator({
  Main: {
    screen: HomeScreen,
    navigationOptions: ({navigation, screenProps}) => ({
      title: 'Código ARX', headerTintColor: '#fff',
      headerRight: <MenuRight navigation={navigation} screenProps={screenProps} />,
      headerStyle: { backgroundColor: '#00ABD5', },
    }),
  }
});
export default createAppContainer(MainInvitadoTabsScreen);