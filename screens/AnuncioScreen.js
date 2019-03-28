import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default class AnunciosScreen extends React.Component {
  
    state = {
        anuncio: {},
    }
    componentWillMount() {
      this.setState({anuncio: this.props.navigation.getParam("anuncio")});
    }
    render() {
        return (
          <ScrollView>
            <Image source={{uri: `https://arxsmart.com/api/uploads/images/${this.state.anuncio.imagen}`}} style={{flex:1, aspectRatio:1}} />
            <View style={{padding:10}}>            
              <View style={{flexDirection: "row"}}>
                <View style={{flex:3}}>
                  <View style={{flexDirection: "row"}}>
                    <Image source={require('../assets/hora.png')}  style={{height: 18, width: 18, marginRight: 5}}/>
                    <Text>{this.state.anuncio.fecha}</Text>
                  </View>
                  <Text style={styles.title}>{this.state.anuncio.titulo}</Text>
                </View>
                <Image style={styles.logo} source={require('../assets/img_noticias.jpg')} />
              </View>
              <View style={styles.separator} />
              <Text style={styles.text}>{this.state.anuncio.texto}</Text>
            </View>
          </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 5,
    fontSize: 20,
  },
  text: {
    textAlign: 'justify',
  },
  separator: {
      height: 2,
      backgroundColor: "lightgray",
      marginTop: 5,
      marginBottom: 5,
  },
  logo: {
    flex:1,
    resizeMode: 'contain',
    aspectRatio:2,
  },
});