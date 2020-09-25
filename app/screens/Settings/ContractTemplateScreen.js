import React, { Component, useLayoutEffect } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Dimensions,
  StyleSheet,
  Image,
  CheckBox,
  SafeAreaView,
  TouchableOpacity,
  Animated
} from 'react-native';

import { HeaderBackButton } from '@react-navigation/stack';
import SideMenu from 'react-native-side-menu';
import SystemMenu from '../../menus/SystemMenu';
import { RawButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class ContractTemplateScreen extends Component{
  constructor(props){
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
        <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate("Home")}>
          <Icon name="home" size={18} color="white" style={{marginLeft: 16}} solid />
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
        onscroll = {Animated.event(
          [], { useNativeDriver: false } 
        )}
      >
        <View style={styles.container}>
          <TextInput style = {styles.searchLead} placeholder = "Input Search"></TextInput>
        </View>
      </SideMenu>
    )
  }; 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
	},
	plusButton: {
		width: 24,
		height: 24,
		marginRight: 10
	},
  searchLead: {
		width:Dimensions.get('window').width - 50,
		height: 25,
		padding: 0,
		paddingLeft: 5,
		margin: 25,
		borderWidth: 1,
  }
});
