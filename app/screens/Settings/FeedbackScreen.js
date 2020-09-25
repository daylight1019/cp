import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Dimensions,
  StyleSheet,
  Animated,
  CheckBox,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SideMenu from 'react-native-side-menu';
import SystemMenu from '../../menus/SystemMenu';

export default class FeedbackScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pwd: '',
      confirmPwd: '',
      newPwd: '',
      isOpen: false,
      selectedItem: 'About',
    }
  }

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

  onRegister = () => {

  };

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
          <View>
            <Text style={styles.text}>Let us know what you think about the Coatings Estimator app, and how we can improve.</Text>
            <TextInput
              multiline
              maxLength={500}
              style={styles.textInput}
              placeholder="Feedback"
              onChangeText={text => this.setState({ pwd: text })}
              defaultValue={this.state.pwd}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={{ ...styles.buttonView, backgroundColor: "rgb(51,122,183)" }}>
              <Text style={styles.buttonText}>Submit Feedback</Text>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white'
  },
  text: {
    marginTop: 0,
    width: Dimensions.get('window').width - 50,
    marginBottom: 20,
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
  textInput: {
    width: Dimensions.get('window').width - 50,
    height: 80,
    padding: 5,
    borderBottomWidth: 1,
    marginBottom: 10,
    marginTop: 2
  },
});
