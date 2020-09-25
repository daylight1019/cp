import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image
} from 'react-native';

import { Button } from 'react-native-material-ui'

import { login } from '../actions/login';
import { connect } from 'react-redux';

import TextInput from 'react-native-textinput-with-icons'
import Icon from 'react-native-vector-icons/FontAwesome5';

class LoginScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: 'test@gmail.com',
      pwd: '123456'
    }
  }

  onLoginSuccess = () => {   
    this.setState({ isLoading: true })
    this.props.navigation.navigate('Home');
  };

  onLogin = () => {
    // this.props.navigation.navigate('Home');
    this.props.fetchLogin(this.state.email, this.state.pwd, this.onLoginSuccess);
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Image style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width, position: 'absolute', top:0, left:0 }} source={require('../assets/background_img.jpg')} /> */}
        <Image style={{ height: Dimensions.get('window').width / 3, width: Dimensions.get('window').width / 5 * 4, marginTop:0 }} resizeMode='contain' source = {require('../assets/logo.png')}/>
        <View style={{marginTop:50}}>
          <TextInput
            style={styles.textInput} 
            leftIcon = "md-mail"
            label="Email"
            underlineColor = 'rgba(50,162,235,0.8)'
            value={this.state.email}
            activeColor = "#00A2E8"
            onChangeText={text => this.setState({email:text})}
          />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            leftIcon = "lock-closed"
            label="Password"
            underlineColor = 'rgba(50,162,235,0.8)'
            value={this.state.pwd}
            activeColor = "#00A2E8"
            onChangeText={text => this.setState({pwd:text})}
            secureTextEntry={true}
          />
          <Text style = {{...styles.linkText, fontSize:12}} onPress = {() => this.props.navigation.navigate('Register')}>Forgot password?</Text>
        </View>
        <View style = {styles.loginButtonView}>
          <Button text="Login" primary raised onPress={this.onLogin}/>
        </View>
        <View style = {styles.signupView}>
          <Text>Don't you have account? <Text style = {styles.linkText} onPress = {() => this.props.navigation.navigate('Register')}>Sign up</Text></Text>
        </View> 
      </View>
    )
  };
}

const styles = StyleSheet.create({
  container:{
    flex:1, 
    justifyContent:"center", 
    alignItems:"center"
  }, 
  logoImage : {
    marginTop: 50,
    marginBottom: 50,
    width: '50%',
    height: '30%'
  },
  textInput : {
    width: Dimensions.get('window').width / 2 ,
    height: 30,
    padding: 5,
    borderBottomWidth: 1,
    marginBottom: 20,
    marginTop: 5
  },
  loginButtonView: { 
    width: Dimensions.get('window').width / 2,
    marginTop: 48,
    marginBottom: 24
  },
  linkText:{
    color: "#00A2E8"
  },
  signupView: {
    alignItems:"center",
    marginTop: 50
  },
  backgroundView:{
    flex:1, 
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }, 
});

const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchLogin: (email, pwd, onLoginSuccess) => dispatch(login(email, pwd, onLoginSuccess)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen); 
