import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  CheckBox,
  Animated,
  TouchableOpacity
} from 'react-native';

import { changePassword } from '../../actions/settings'
import SideMenu from 'react-native-side-menu';
import SystemMenu from '../../menus/SystemMenu';
import { connect } from 'react-redux';
import TextInput from 'react-native-textinput-with-icons'
import Icon from 'react-native-vector-icons/FontAwesome5';

class ChangePasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedItem: 'About',
      pwd: '',
      confirmPwd: '',
      newPwd: ''
    }
  }

  onChangePassword = () => {
    this.props.fetchChangePassword(this.state.pwd, this.state.newPwd);
    this.props.navigation.navigate('Home');
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    });

  componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: (props) => (
        <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate("Home")}>
          <Icon name="home" size={18} color="white" style={{ marginLeft: 16 }} solid />
        </TouchableOpacity>
      )
    });
  }

  render() {
    const menu = <SystemMenu navigation={this.props.navigation} onItemSelected={this.onMenuItemSelected} />;
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
        onscroll={Animated.event(
          [], { useNativeDriver: false }
        )}
      >
        <View style={styles.container}>
          <View style={{ marginTop: 32 }}>
            <TextInput
              style={styles.textInput}
              leftIcon="lock-closed"
              label="Password"
              value={this.state.pwd}
              underlineColor='rgba(50,162,235,0.8)'
              activeColor="#00A2E8"
              onChangeText={text => this.setState({ pwd: text })}
              secureTextEntry={true}
            />
          </View>
          <View>
            <TextInput
              style={styles.textInput}
              leftIcon="lock-closed"
              label="New Password"
              value={this.state.newPwd}
              activeColor="#00A2E8"
              underlineColor='rgba(50,162,235,0.8)'
              onChangeText={text => this.setState({ newPwd: text })}
              secureTextEntry={true}
            />
          </View>
          <View>
            <TextInput
              style={styles.textInput}
              leftIcon="lock-closed"
              label="Confirm Password"
              value={this.state.confirmPwd}
              activeColor="#00A2E8"
              underlineColor='rgba(50,162,235,0.8)'
              onChangeText={text => this.setState({ confirmPwd: text })}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={{ ...styles.buttonView, backgroundColor: "rgb(51,122,183)" }}>
              <Text style={styles.buttonText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SideMenu>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:"center", 
    alignItems: "center",
    backgroundColor: '#FFFFFF',
  },
  textInput: {
    width: Dimensions.get('window').width - 50,
    height: 30,
    padding: 5,
    borderBottomWidth: 1,
    fontSize: 12,
    marginBottom: 10,
    marginTop: 16
  },
  registerbuttonView: {
    width: Dimensions.get('window').width / 2,
    marginTop: 32
  },
  linkText: {
    color: "#00A2E8"
  },
  signupView: {
    alignItems: "center"
  },
  checkboxContainer: {
    flexDirection: "row"
  },
  checkbox: {
    alignSelf: "center",
    marginTop: -5
  },
  buttonView: {
    alignItems: 'center',
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
  fetchChangePassword: (pwd, newPwd) => dispatch(changePassword(pwd, newPwd)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePasswordScreen); 
