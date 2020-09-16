import React, { Component, useLayoutEffect } from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  Image,
  CheckBox,
  SafeAreaView,
  TouchableOpacity,
  Animated
} from 'react-native';

import SideMenu from 'react-native-side-menu';
import SystemMenu from '../../../menus/SystemMenu';

import { addColor } from '../../../actions/settings'
import { connect } from 'react-redux';
import TextInput from 'react-native-textinput-with-icons'

import Icon from 'react-native-vector-icons/FontAwesome5';

class NewColorScreen extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'About',
      newColor: '',
      isLoading: false,
      error: false
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

  onSave = async () => {
    this.props.fetchAddColor(this.state.newColor);
    this.props.navigation.navigate("Color");
  }

  componentDidMount() {
    this.props.navigation.setOptions({
			headerRight: (props)=> (
				<TouchableOpacity activeOpacity = { .5 } onPress={ this.onSave }>
          <Icon name="save" style={{marginRight:12}} size={18} color="#ffffff" solid/>
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
          <TextInput style={styles.text} label="Color Name" underlineColor = 'rgba(50,162,235,0.8)' onChangeText={text => this.setState({ newColor: text })}></TextInput>
        </View>
      </SideMenu>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    width: Dimensions.get('window').width - 50,
    height: 25,
    padding: 0,
    paddingLeft: 5,
    margin: 25,
    marginTop: -300,
    borderBottomColor: 'rgba(50,162,235,0.8)',
    borderBottomWidth: 1,
  },
  saveButton: {
    width: 60,
    height: 30,
    borderRadius: 3,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15
  }
});

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchAddColor: (newColor) => dispatch(addColor(newColor)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewColorScreen); 
