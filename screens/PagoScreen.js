import React from 'react';
import { StyleSheet, View, WebView } from 'react-native';
import { updateLoader } from '../redux/actions';
import { connect } from 'react-redux';

class HomeScreen extends React.Component {
    state = {
      url: "",
    }
    componentDidMount(){
      if (typeof this.props.navigation.state.params.id_deuda != "undefined") {
        this.setState({url: 'https://arxsmart.com/api/include/xchange/payment.php?id_deuda=' + this.props.navigation.state.params.id_deuda + "&token=" + this.props.navigation.state.params.token});
      } else {
        this.setState({url: 'https://arxsmart.com/api/include/xchange/payment.php?id_instalacion_pedido=' + this.props.navigation.state.params.id_instalacion_pedido + "&tipo=P&token=" + this.props.navigation.state.params.token});
      }
    }
    render() {
      console.log(this.state.url);
      return (
        <View style={{flex:1,paddingTop: 10}}>
          <WebView
            source={{uri: this.state.url}}
          />
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
    },
  });
  const mapStateToProps = state => ({
    usuario: state.usuario,
    casa: state.casa,
  });
export default connect(mapStateToProps, {updateLoader: updateLoader})(HomeScreen);