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
  ScrollView,
  Animated
} from 'react-native';

import { HeaderBackButton } from '@react-navigation/stack';
import SideMenu from 'react-native-side-menu';
import SystemMenu from '../../menus/SystemMenu';
import { RawButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { getPatterns } from '../../actions/settings';
import { getPatternSelector } from '../../reducers/patternReducer';

class PatternScreen extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'About',
      patternsInfo: [],
      error: false,
      isLoading: false,
      searchText: ''
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
    this.setState({ isLoading: true })
    this.props.navigation.setOptions({
      headerRight: (props) => (
        <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('NewPattern')} >
          <Icon name="user-plus" style={{ marginRight: 12 }} size={18} color="#ffffff" solid />
        </TouchableOpacity>
      ),
      headerLeft: (props) => (
        <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate("Home")}>
          <Icon name="home" size={18} color="white" style={{ marginLeft: 16 }} solid />
        </TouchableOpacity>
      )
    });

    this.props.fetchGetPattern();
    this.setState({ isLoading: false })
  }

  render() {
    const menu = <SystemMenu navigation={this.props.navigation} onItemSelected={this.onMenuItemSelected} />;
    console.log("Patterns Info--------------", JSON.stringify(this.props.patternsInfo));
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
          <ScrollView style={styles.container}>
            <TextInput style={styles.textInput} onChangeText={text => this.setState({ searchText: text })} placeholder="Input Pattern Leads"></TextInput>
            {(this.props.patternsInfo.length > 0) && (
              this.props.patternsInfo.map((pattern, index) => (
                (pattern.name.indexOf(this.state.searchText) != -1) && (
                  <View style={{ ...styles.cellView, backgroundColor: index % 2 == 0 ? 'rgba(55,55,55,0.1)' : 'rgba(50,162,235,0.4)' }} key={index}>
                    <View style={{ flexDirection: "row", width: Dimensions.get('window').width - 10 }}>
                      <TouchableOpacity style={{ marginLeft: 15, marginTop: 10, flexDirection: "row" }} onPress={() => this.props.navigation.navigate('EditPattern', { pattern })}>
                        <View style={{ width: Dimensions.get('window').width - 65 }}>
                          <Text style={{ fontSize: 16 }}>{pattern.name}</Text>
                        </View>
                        <View style={{ alignSelf: 'flex-end' }}>
                          <Icon style={{ marginTop: 0 }} name="angle-right" size={25} color="rgba(10,10,10,0.5)" solid />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>)
              ))
            )}
          </ScrollView>
        }
      </SideMenu>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  cellView: {
    width: Dimensions.get('window').width - 20,
    height: 45,
    marginVertical: 3,
    backgroundColor: 'rgba(15,15,15,0.3)',
    borderColor: 'black',
    marginHorizontal: 10,
    borderRadius: 10
  },
  plusButton: {
    width: 24,
    height: 24,
    marginRight: 10
  },
  textInput: {
    width: Dimensions.get('window').width - 50,
    height: 25,
    padding: 0,
    paddingLeft: 5,
    margin: 25,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(50,162,235,0.8)',
  }
});

const mapStateToProps = (state) => {
  return getPatternSelector(state)
}

const mapDispatchToProps = (dispatch) => ({
  fetchGetPattern: () => dispatch(getPatterns())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PatternScreen); 
