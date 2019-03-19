import React from 'react';
import { StyleSheet, View, WebView, ActivityIndicator  } from 'react-native';
import { updateLoader } from '../redux/actions';
import { connect } from 'react-redux';

class HomeScreen extends React.Component {
    state = {
      url: "",
    }
    ActivityIndicatorLoadingView = () => {
      //making a view to show to while loading the webpage
      return (
        <ActivityIndicator
          color="#009688"
          size="large"
          style={styles.ActivityIndicatorStyle}
        />
      );
    }
    componentDidMount(){
      if (typeof this.props.navigation.state.params.id_deuda != "undefined") {
        this.setState({url: 'https://arxsmart.com/api/include/xchange/payment.php?id_deuda=' + this.props.navigation.state.params.id_deuda + "&token=" + this.props.navigation.state.params.token});
      } else {
        this.setState({url: 'https://arxsmart.com/api/include/xchange/payment.php?id_instalacion_pedido=' + this.props.navigation.state.params.id_instalacion_pedido + "&tipo=P&token=" + this.props.navigation.state.params.token});
      }
    }
    render() {
      return (
        <View style={{flex:1}}>
          <WebView
            style={styles.WebViewStyle}
            source={{uri: this.state.url}}
            renderLoading={this.ActivityIndicatorLoadingView}
            startInLoadingState={true}
          />
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
    },
    ActivityIndicatorStyle: {
      flex: 1,
      justifyContent: 'center',
    },
    WebViewStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
  });
  const mapStateToProps = state => ({
    usuario: state.usuario,
    casa: state.casa,
  });
export default connect(mapStateToProps, {updateLoader: updateLoader})(HomeScreen);