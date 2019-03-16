import React from 'react';
import { Dimensions, Image, Button, StyleSheet, View } from 'react-native';

const win = Dimensions.get('window');
export default class HistorialScreen extends React.Component {
  
    state = {
      base64: "",
    }
    componentWillMount() {
      const qrcode = require('yaqrcode');
      const base64 = qrcode('hello world mommy from Bolivia');
      this.setState({base64});
    }
    render() {
      return (
        <View>
          <Button
            onPress={() => this.props.navigation.navigate('Home')}
            title="Go to Home from historial"
          />
          <View style={styles.container}>
            <Image style={styles.img} source={{uri: this.state.base64}} />
          </View>
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
    },
    img: {
      flex: 1,
      margin: 20,
      height: win.width - 40,
    },
  });