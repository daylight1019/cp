import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import SystemMenu from '../menus/SystemMenu';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'About',
    };
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
        <TouchableOpacity activeOpacity={.5} onPress={() => this.toggle()}>
          <Icon name="bars" size={18} color="white" style={{ marginLeft: 16 }} solid />
        </TouchableOpacity>
      )
    });

    // const resetAction = NavigationActions.reset({
    //   index: 0,
    //   actions: [NavigationActions.navigate({ routeName: 'Home' })],
    //   key: null
    // })
    // this.props.navigation.dispatch(resetAction)
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
          <View style={styles.partContainer}>
            <TouchableOpacity style={styles.buttonView1} onPress={() => this.props.navigation.navigate('ActiveLeads', { active: true })}>
              <MaterialIcon name="recent-actors" size={50} color="#fff" solid />
              <Text style={styles.activeText}>Lead</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonView2} onPress={() => this.props.navigation.navigate('Estimate', { status: 'estimate', active: true })}>
              <MaterialIcon name="business" size={50} color="#fff" solid />
              <Text style={styles.activeText}>Estimate</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.partContainer}>
            <TouchableOpacity style={styles.buttonView3} onPress={() => this.props.navigation.navigate('Estimate', { status: 'current', active: true })}>
              <Icon name="briefcase" size={50} color="#fff" solid />
              <Text style={styles.activeText}>Current</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonView4} onPress={() => this.props.navigation.navigate('Estimate', { status: 'complete', active: true })}>
              <MaterialIcon name="check" size={50} color="#fff" solid />
              <Text style={styles.activeText}>Complete</Text>
            </TouchableOpacity>
          </View>
          <View style={{ ...styles.partInactiveContainer, marginTop: 20 }}>
            <TouchableOpacity style={styles.buttonInactiveView1} onPress={() => this.props.navigation.navigate('ActiveLeads', { active: false })}>
              <MaterialIcon name="recent-actors" size={40} color="#aaa" solid />
              <Text style={{ fontSize: 12, color: "#aaa" }}>Lead</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonInactiveView2} onPress={() => this.props.navigation.navigate('Estimate', { status: 'estimate', active: false })}>
              <MaterialIcon name="business" size={40} color="#aaa" solid />
              <Text style={{ fontSize: 12, color: "#aaa" }}>Estimate</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.partInactiveContainer}>
            <TouchableOpacity style={styles.buttonInactiveView3} onPress={() => this.props.navigation.navigate('Estimate', { status: 'current', active: false })}>
              <Icon name="briefcase" size={40} color="#aaa" solid />
              <Text style={{ fontSize: 12, color: "#aaa" }}>Current</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonInactiveView4} onPress={() => this.props.navigation.navigate('Estimate', { status: 'complete', active: false })}>
              <MaterialIcon name="check" size={40} color="#aaa" solid />
              <Text style={{ fontSize: 12, color: "#aaa" }}>Complete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SideMenu>
    )
  };
}

const styles = StyleSheet.create({
  partContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    height: Dimensions.get('window').width / 4 * 1.2
  },
  activeText: {
    fontSize: 14,
    marginTop: 5,
    color: "#fff",
  },
  partInactiveContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    height: Dimensions.get('window').width / 4
  },
  container: {
    flex: 1,
    alignContent: 'center', justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonView1: {
    width: Dimensions.get('window').width / 4 * 1.2,
    height: Dimensions.get('window').width / 4 * 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#337ab7",
    borderWidth: 1,
    borderColor: 'white',
    borderTopLeftRadius: 50
  },
  buttonView2: {
    width: Dimensions.get('window').width / 4 * 1.2,
    height: Dimensions.get('window').width / 4 * 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#f0ad4e",
    borderWidth: 1,
    borderColor: 'white',
    borderTopRightRadius: 50
  },
  buttonView3: {
    width: Dimensions.get('window').width / 4 * 1.2,
    height: Dimensions.get('window').width / 4 * 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: "#5cb85c",
    borderBottomLeftRadius: 50
  },
  buttonView4: {
    width: Dimensions.get('window').width / 4 * 1.2,
    height: Dimensions.get('window').width / 4 * 1.2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    backgroundColor: "#d9534f",
    borderBottomRightRadius: 50
  },
  buttonInactiveView1: {
    width: Dimensions.get('window').width / 4 * 1.0,
    height: Dimensions.get('window').width / 4 * 1.0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#333",
    borderColor: 'white',
    borderWidth: 1,
    borderTopLeftRadius: 50
  },
  buttonInactiveView2: {
    width: Dimensions.get('window').width / 4 * 1.0,
    height: Dimensions.get('window').width / 4 * 1.0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#333",
    borderColor: 'white',
    borderWidth: 1,
    borderTopRightRadius: 50
  },
  buttonInactiveView3: {
    width: Dimensions.get('window').width / 4 * 1.0,
    height: Dimensions.get('window').width / 4 * 1.0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#333",
    borderColor: 'white',
    borderWidth: 1,
    borderBottomLeftRadius: 50
  },
  buttonInactiveView4: {
    width: Dimensions.get('window').width / 4 * 1.0,
    height: Dimensions.get('window').width / 4 * 1.0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#333",
    borderColor: 'white',
    borderWidth: 1,
    borderBottomRightRadius: 50
  },
  hamburger: {
    width: 24,
    height: 24,
    marginLeft: 10
  }
});
