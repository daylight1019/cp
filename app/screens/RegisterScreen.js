import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  CheckBox,
  TouchableOpacity
} from 'react-native';

import TextInput from 'react-native-textinput-with-icons'
import Icon from 'react-native-vector-icons/FontAwesome5';

import { register } from '../actions/login';
import { connect } from 'react-redux';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      pwd: '',
      confirmPwd: '',
      agreeTerm: false
    }
  }

  onLoginSuccess = () => {
    this.setState({ isLoading: true })
    this.props.navigation.navigate('Home');
  };

  onRegister = () => {
    if (this.state.pwd == this.state.confirmPwd) {
      this.props.fetchRegister(this.state.firstName, this.state.lastName, this.state.email, this.state.pwd, this.state.confirmPwd, this.onLoginSuccess);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.textInput}
            label="First Name"
            underlineColor = 'rgba(50,162,235,0.8)'
            onChangeText={text => this.setState({ firstName: text })}
            value={this.state.firstName}
          />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            label="Last Name"
            underlineColor = 'rgba(50,162,235,0.8)'
            onChangeText={text => this.setState({ lastName: text })}
            value={this.state.lastName}
          />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            label="Email"
            underlineColor = 'rgba(50,162,235,0.8)'
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
          />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            label="Password"
            underlineColor = 'rgba(50,162,235,0.8)'
            onChangeText={text => this.setState({ pwd: text })}
            value={this.state.pwd}
            secureTextEntry={true}
          />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            label="Confirm Password"
            underlineColor = 'rgba(50,162,235,0.8)'
            onChangeText={text => this.setState({ confirmPwd: text })}
            value={this.state.confirmPwd}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={this.state.agreeTerm}
            onValueChange={checkState => this.setState({ agreeTerm: checkState })}
            style={styles.checkbox}
          />
          <Text>I agree to <Text style={styles.linkText} onPress = {() => this.props.navigation.navigate("Term", {navMode:0})}>Terms & Policies</Text> </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.onRegister} style={{ ...styles.buttonView, backgroundColor: this.state.agreeTerm ? "rgba(51,122,183,1.0)" : "rgba(20,20,20,0.3)" }}>
            <Text style={styles.buttonText}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logoImage: {
    marginTop: 50,
    marginBottom: 50,
    width: '50%',
    height: '30%'
  },
  textInput: {
    width: Dimensions.get('window').width / 3 * 2,
    height: 30,
    padding: 5,
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 2
  },
  registerButtonView: {
    width: Dimensions.get('window').width / 2,
    marginTop: 20
  },
  linkText: {
    color: "#00A2E8"
  },
  signupView: {
    alignItems: "center"
  },
  checkboxContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  checkbox: {
    alignSelf: "center",
    marginTop: -5
  },
  buttonView: {
    margin: 10,
    height: 35,
    flexDirection: 'row',
    width: Dimensions.get('window').width / 2,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonContainer: {
    width: Dimensions.get('window').width,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 14,
    width: Dimensions.get('window').width - 60,
    color: 'white',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchRegister: (firstName, lastName, email, pwd, confirmPwd, onLoginSuccess) => dispatch(register(firstName, lastName, email, pwd, confirmPwd, onLoginSuccess)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterScreen); 
