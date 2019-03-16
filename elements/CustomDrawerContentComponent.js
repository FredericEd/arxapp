import React from 'react';
import { Image, ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView, DrawerItems } from 'react-navigation';

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <Image style={styles.logo} source={require('../assets/arxlogo.png')} />
        </View>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
);
const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: "#0073B2",
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
    padding: 20,
  },
  logo: {
    flex: 1,
    resizeMode: 'contain',
    aspectRatio:2,
  }
});
export default CustomDrawerContentComponent;