import React from 'react';
import { Dimensions, Image, StyleSheet, View, WebView } from 'react-native';
import { updateLoader } from '../redux/actions';
import { connect } from 'react-redux';

const sha1 = require('sha1');
const win = Dimensions.get('window');
class HomeScreen extends React.Component {
  
    state = {
      base64: "",
      code: "",
    }
    componentWillMount() {
      setInterval(() => this.drawCode(), 5000);
      this.drawCode();
    }
    drawCode = () => {
      this.props.updateLoader(false);
      let coeff = 1000 * 60 * 3; //cada 3 minutos
      let date = new Date();
      let rounded = new Date(Math.ceil(date.getTime() / coeff) * coeff);
      rounded = rounded.getTime().toString().replace(/0+$/,'');
      let code = sha1(rounded + this.props.usuario.api_key);
      console.log(this.props.usuario.id_usuario + "." + this.props.casa.id_casa + "." + code);

      if (code != this.state.code) {
        const qrcode = require('yaqrcode');
        const base64 = qrcode(this.props.usuario.id_usuario + "." + this.props.casa.id_casa + "." + code);
        this.setState({base64, code});
      }
    } 
    render() {
      return (
        <View>
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
  const mapStateToProps = state => ({
    usuario: state.usuario,
    casa: state.casa,
  });
export default connect(mapStateToProps, {updateLoader: updateLoader})(HomeScreen);