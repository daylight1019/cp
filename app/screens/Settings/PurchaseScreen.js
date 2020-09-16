import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  WebView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SideMenu from 'react-native-side-menu';
import SystemMenu from '../../menus/SystemMenu';

export default class PurchaseScreen extends Component {
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

  render() {
    const menu = <SystemMenu navigation={this.props.navigation} onItemSelected={this.onMenuItemSelected} />;
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
        onscroll={
          Animated.event(
            [], { useNativeDriver: false }
          )
        }
      >

        <View style={styles.container}>
          <Text style={styles.titleText}>Coatings Estimator Pro</Text>
          <Text style={styles.text}>- Each monthly subscription last for one month</Text>
          <Text style={styles.text}>- Price of subscription is $9.99 a month</Text>
          <Text style={styles.text}>- Payment will be charged to iTunes Account at confirmation of purchase</Text>
          <Text style={styles.text}>- Subscription automatically renews unless auto-renew is turned off at least 24-hours before the end of the current period</Text>
          <Text style={styles.text}>- Account will be charged for renewal within 24-hours prior to the end of the current period, at a cost of $9.99</Text>
          <Text style={styles.text}>- Subscriptions may be managed by the user and auto-renewal may be turned off by going to the user's Account Settings after purchase</Text>
          <Text style={styles.text}>- No cancellation of the current subscription is allowed during active subscription period</Text>
          <Text style={styles.text}>- Links to our Privacy Policy and Terms of Use</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={{ ...styles.buttonView, backgroundColor: "rgb(51,122,183)" }}>
              <Text style={styles.buttonText}>Purchase Monthly</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.buttonView, marginTop: 12, backgroundColor: "rgb(51,192,83)" }}>
              <Text style={styles.buttonText}>Purchase Yearly</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SideMenu>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  titleText: {
    marginTop: 20,
    textAlign: "center",
    width: Dimensions.get('window').width,
    fontSize: 18,
    marginBottom: 20
  },
  text: {
    justifyContent: "center",
    width: Dimensions.get('window').width,
    fontSize: 12,
    paddingLeft: 10,
    paddingRight: 10,
  },
  textInput: {
    width: Dimensions.get('window').width / 3 * 2,
    height: 100,
    padding: 5,
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 2
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
