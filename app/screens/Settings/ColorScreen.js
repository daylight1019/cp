import React, { Component, useLayoutEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated
} from 'react-native';

import SideMenu from 'react-native-side-menu';
import SystemMenu from '../../menus/SystemMenu';
import { getColorSelector } from '../../reducers/colorReducer';
import { getColors } from '../../actions/settings'
import { connect } from 'react-redux';
import TextInput from 'react-native-textinput-with-icons'
import Icon from 'react-native-vector-icons/FontAwesome5';

class ColorScreen extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'About',
      colorsInfo: [],
      isLoading: false,
      error: false,
      searchText: '',
      selectedColor: {}
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


  async componentDidMount() {
    this.setState({ isLoading: true })
    this.props.navigation.setOptions({
      headerRight: (props) => (
        <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('NewColor')} >
          <Icon name="plus" style={{ marginRight: 18 }} size={18} color="#ffffff" solid />
        </TouchableOpacity>
      )
    });
    this.props.navigation.setOptions({
      headerLeft: (props) => (
        <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate("Home")}>
          <Icon name="home" size={18} color="white" style={{ marginLeft: 16 }} solid />
        </TouchableOpacity>
      )
    });
    await this.props.fetchGetColor();
    this.setState({ isLoading: false })
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
        {this.state.isLoading ?
          <View style={styles.container}>

          </View>
          :
          <View style={styles.container}>
            <TextInput style={styles.searchText} onChangeText={text => this.setState({ searchText: text })} label="Input Search Colors"></TextInput>
            <ScrollView>
              {(this.props.colorsInfo.length > 0) && (
                this.props.colorsInfo.map((color, index) => (
                  (color.name.indexOf(this.state.searchText) != -1) && (
                    <View style={{ ...styles.cellView, backgroundColor: index % 2 == 0 ? 'rgba(55,55,55,0.1)' : 'rgba(50,162,235,0.4)' }} key={index}>
                      <View style={{ flexDirection: "row", width: Dimensions.get('window').width - 10 }}>
                        <TouchableOpacity style={{ marginLeft: 15, marginTop: 10, flexDirection: "row" }} onPress={() => this.props.navigation.navigate('EditColor', { color })}>
                          <View style={{ width: Dimensions.get('window').width - 65 }}>
                            <Text style={{ fontSize: 14 }}>{color.name}</Text>
                          </View>
                          <View style={{ alignSelf: 'flex-end' }}>
                            <Icon style={{ marginTop: 3 }} name="angle-right" size={18} color="rgba(10,10,10,0.5)" solid />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>)
                ))
              )}
              <View style={{ height: 5 }}></View>
            </ScrollView>
          </View>
        }
      </SideMenu>
    )
  };
}

const styles = StyleSheet.create({
  cellView: {
    width: Dimensions.get('window').width - 20,
    height: 45,
    marginVertical: 3,
    backgroundColor: 'rgba(15,15,15,0.3)',
    borderColor: 'black',
    marginHorizontal: 10,
    borderRadius: 10
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  searchText: {
    width: Dimensions.get('window').width - 50,
    height: 35,
    padding: 0,
    paddingLeft: 5,
    margin: 25,
  },
  plusButton: {
    width: 24,
    height: 24,
    marginRight: 10
  },
});


const mapStateToProps = (state) => {
  return getColorSelector(state)
}

const mapDispatchToProps = (dispatch) => ({
  fetchGetColor: () => dispatch(getColors()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ColorScreen); 
