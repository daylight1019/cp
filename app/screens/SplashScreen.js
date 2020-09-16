import React, {Component} from 'react';
import { Image, View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import Styles from '../styles/custom-style';

export default class SplashScreens extends Component {
  componentDidMount() {
    setTimeout(this.navigateToLogin, 3000);
  }

  navigateToLogin = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <View style={Styles.container}>
        <Image 
          source = {require('../assets/splash.png')} 
          style = {styles.container}
          resizeMode = {'stretch'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1, 
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }, 
});
