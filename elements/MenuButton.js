import React from 'react';
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import { DrawerActions } from 'react-navigation';

const MenuButton = (props) => {
    return (
      <View>
        <TouchableOpacity onPress={() => {props.navigation.dispatch(DrawerActions.openDrawer())}}>
          <Image style={styles.img} source={require('../assets/ic_menu.png')} />
        </TouchableOpacity>
      </View>
    )
}
const styles = StyleSheet.create({
  img: {
    margin: 10,
    tintColor: "#fff",
  }
});
export default MenuButton;