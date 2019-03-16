import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createAppContainer, createDrawerNavigator, createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import PerfilScreen from './PerfilScreen';
import InvitadosScreen from './InvitadosScreen';
import AnunciosScreen from './AnunciosScreen';
import AnuncioScreen from './AnuncioScreen';
import PagosHistorial from './PagosHistorial';
import PagosPendientesScreen from './PagosPendientesScreen';
import ReservasScreen from './ReservasScreen';
import PagoScreen from './PagoScreen';
import InstalacionesScreen from './InstalacionesScreen';
import ReservaScreen from './ReservaScreen';
import MenuButton from '../elements/MenuButton';
import MenuRight from '../elements/MenuRight';
import CustomDrawerContentComponent from '../elements/CustomDrawerContentComponent';

const MainDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: createStackNavigator({
      Main: {
        screen: HomeScreen,
        navigationOptions: ({navigation}) => ({
          title: 'Home', headerTintColor: '#fff',
          headerLeft: <MenuButton navigation={navigation} />,
          headerRight: <MenuRight navigation={navigation} />,
          headerStyle: { backgroundColor: '#00ABD5', },
        }),
      }
    }),
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => 
        <Image source={require('../assets/ic_home.png')} style={[styles.icon, {tintColor}]} />,
    }
  },
  Perfil: {
    screen: createStackNavigator({
      Main: {
        screen: PerfilScreen,
        navigationOptions: ({navigation}) => ({
          title: 'Perfil', headerTintColor: '#fff',
          headerLeft: <MenuButton navigation={navigation} />,
          headerRight: <MenuRight navigation={navigation} />,
          headerStyle: { backgroundColor: '#00ABD5', },
        }),
      }
    }),
    navigationOptions: {
      drawerLabel: 'Perfil',
      drawerIcon: ({ tintColor }) => 
        <Image source={require('../assets/ic_perfil.png')} style={[styles.icon, {tintColor}]} />,
    },
  },
  Alicuotas: {
    screen: createStackNavigator({
      Main: {
        screen: createMaterialTopTabNavigator({
          Vencidos: PagosPendientesScreen, 
          Historial: PagosHistorial,
        }, {
          tabBarOptions: {
            scrollEnabled: false,
            style: {
              backgroundColor: '#0073B2',
            },
            indicatorStyle: {
              backgroundColor: '#fff'
            }
          },
        }),
        navigationOptions: ({navigation}) => ({
          title: 'Pagos', headerTintColor: '#fff',
          headerLeft: <MenuButton navigation={navigation} />,
          headerRight: <MenuRight navigation={navigation} />,
          headerStyle: { backgroundColor: '#00ABD5', },
        }),
      },
      Pago: {
        screen: PagoScreen,
        navigationOptions: ({navigation}) => ({
          title: 'Pago', headerTintColor: '#fff',
          headerLeft: <MenuButton navigation={navigation} />,
          headerStyle: { backgroundColor: '#00ABD5', },
        }),
      },
    }),
    navigationOptions: {
      drawerLabel: 'Pagos',
      drawerIcon: ({ tintColor }) => 
        <Image source={require('../assets/ic_alicuotas.png')} style={[styles.icon, {tintColor}]} />,
    },
  },
  Invitados: {
    screen: createStackNavigator({
      Main: {
        screen: InvitadosScreen,
        navigationOptions: ({navigation}) => ({
          title: 'Invitados', headerTintColor: '#fff',
          headerLeft: <MenuButton navigation={navigation} />,
          headerRight: <MenuRight navigation={navigation} />,
          headerStyle: { backgroundColor: '#00ABD5', },
        }),
      }
    }),
    navigationOptions: {
      drawerLabel: 'Invitados',
      drawerIcon: ({ tintColor }) => 
        <Image source={require('../assets/ic_invit.png')} style={[styles.icon, {tintColor}]} />,
    },
  },
  Reservas: {
    screen: createStackNavigator({
      ReservasList: {
        screen: ReservasScreen,
        navigationOptions: ({navigation}) => ({
          title: 'Reservas', headerTintColor: '#fff',
          headerLeft: <MenuButton navigation={navigation} />,
          headerRight: <MenuRight navigation={navigation} />,
          headerStyle: { backgroundColor: '#00ABD5', },
        }),
      },
      Instalaciones: {
        screen: InstalacionesScreen,
        navigationOptions: ({navigation}) => ({
          title: 'Instalaciones', headerTintColor: '#fff',
          headerLeft: <MenuButton navigation={navigation} />,
          headerRight: <MenuRight navigation={navigation} />,
          headerStyle: { backgroundColor: '#00ABD5', },
        }),
      },
      ReservaCreate: {
        screen: ReservaScreen,
        navigationOptions: ({navigation}) => ({
          title: 'Crear nueva reserva', headerTintColor: '#fff',
          headerLeft: <MenuButton navigation={navigation} />,
          headerRight: <MenuRight navigation={navigation} />,
          headerStyle: { backgroundColor: '#00ABD5', },
        }),
      },
      Pago: {
        screen: PagoScreen,
        navigationOptions: ({navigation}) => ({
          title: 'Pago', headerTintColor: '#fff',
          headerLeft: <MenuButton navigation={navigation} />,
          headerStyle: { backgroundColor: '#00ABD5', },
        }),
      },
    }),
    navigationOptions: {
      drawerLabel: 'Reservas',
      drawerIcon: ({ tintColor }) => 
        <Image source={require('../assets/ic_reservas.png')} style={[styles.icon, {tintColor}]} />,
    },
  },
  Anuncios: {
    screen: createStackNavigator({
      Main: {
        screen: AnunciosScreen,
        navigationOptions: ({navigation}) => ({
          title: 'Anuncios', headerTintColor: '#fff',
          headerLeft: <MenuButton navigation={navigation} />,
          headerRight: <MenuRight navigation={navigation} />,
          headerStyle: { backgroundColor: '#00ABD5', },
        }),
      },
      SingleAnuncio: {
        screen: AnuncioScreen,
        navigationOptions: ({navigation}) => ({
          title: 'Anuncio', headerTintColor: '#fff',
          headerLeft: <MenuButton navigation={navigation} />,
          headerRight: <MenuRight navigation={navigation} />,
          headerStyle: { backgroundColor: '#00ABD5', },
        }),
      },
    }),
    navigationOptions: {
      drawerLabel: 'Anuncios',
      drawerIcon: ({ tintColor }) => 
        <Image source={require('../assets/ic_anuncios.png')} style={[styles.icon, {tintColor}]} />,
    },
  },
  /*Historial: {
    screen: createStackNavigator({
      Main: {
        screen: HistorialScreen,
        navigationOptions: ({navigation}) => ({
          title: 'Historial', headerTintColor: '#fff',
          headerLeft: <MenuButton navigation={navigation} />,
          headerStyle: { backgroundColor: '#00ABD5', },
        }),
      }
    }),
    navigationOptions: {
      drawerLabel: 'Historial',
      drawerIcon: ({ tintColor }) => 
        <Image source={require('../assets/ic_historial.png')} style={[styles.icon, {tintColor}]} />,
    },
  },*/
}, {
  contentComponent:CustomDrawerContentComponent,
});

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
export default createAppContainer(MainDrawerNavigator);