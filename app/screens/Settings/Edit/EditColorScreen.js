import React, { Component, useLayoutEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated
} from 'react-native';

import SideMenu from 'react-native-side-menu';
import SystemMenu from '../../../menus/SystemMenu';
import { updateColor } from '../../../actions/settings'
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TextInput from 'react-native-textinput-with-icons'

class EditColorScreen extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'About',
      curColor: '',
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
    this.color.name = this.state.curColor;
    this.props.fetchUpdateColor(this.color);
    this.props.navigation.navigate("Color");
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: (props) => (
        <TouchableOpacity activeOpacity={.5} onPress={this.onSave}>
          <Icon name="save" style={{ marginRight: 12 }} size={18} color="#ffffff" solid />
        </TouchableOpacity>
      )
    });
    this.color = this.props.route.params.color;
    this.setState({ curColor: this.color.name })
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
          <View style={{ height: 50 }}></View>
          <TextInput style={styles.text} label="Input Color Name" value={this.state.curColor} onChangeText={text => this.setState({ curColor: text })}></TextInput>
        </View>
      </SideMenu>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center'

  },
  text: {
    width: Dimensions.get('window').width - 50,
    height: 25,
    padding: 0,
    paddingLeft: 5,
    // margin: 25,
    marginTop: 50,
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
  fetchUpdateColor: (color) => dispatch(updateColor(color)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditColorScreen); 
