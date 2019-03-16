import React from 'react';
import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import LoginScreen from './screens/LoginScreen';
import RecoverScreen from './screens/RecoverScreen';
import MainContainerScreen from './screens/MainContainerScreen';
import CasasScreen from './screens/CasasScreen';
import {store, persistor} from './redux/store';

const MainNavigator = createSwitchNavigator({
  Auth: createStackNavigator({
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },
    Recover: {
      screen: RecoverScreen,
      navigationOptions: ({navigation}) => ({
        title: 'ARX', headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#00ABD5', },
      }),
    },
  }),
  Content: MainContainerScreen,
  Casas: createStackNavigator({
    Main: {
      screen: CasasScreen,
      navigationOptions: ({navigation}) => ({
        title: 'ARX', headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#00ABD5', },
      }),
    }
  }),
},
{
  initialRouteName: 'Auth',
});
const AppNavigator = createAppContainer(MainNavigator);

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    )
  }
}