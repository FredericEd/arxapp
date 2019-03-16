import React from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import {connect} from 'react-redux';
import {updateLoader} from '../redux/actions';
const win = Dimensions.get('window');

class Loader extends React.Component {

  render() {
      return this.props.loader &&     
            <View style={styles.modalBackground}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
    }
}
const styles = StyleSheet.create({
    modalBackground:{
      width: win.width,
      height: win.height,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)', 
    },
});
const mapStateToProps = state => ({
    loader: state.loader,
})
export default connect(mapStateToProps, {updateLoader: updateLoader})(Loader)