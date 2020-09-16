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
import { getSystemSelector } from '../../reducers/systemReducer'
import { getSystems, getSystem } from '../../actions/settings';
import { connect } from 'react-redux';
import TextInput from 'react-native-textinput-with-icons'
import Icon from 'react-native-vector-icons/FontAwesome5';

class SystemScreen extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'About',
      systemsInfo: [],
      isLoading: false,
      error: false,
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
    this.props.navigation.setOptions({
      headerRight: (props) => (
        <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('NewSystem')} >
          <Icon name="user-plus" style={{ marginRight: 12 }} size={18} color="#ffffff" solid />
        </TouchableOpacity>
      ),
      headerLeft: (props) => (
        <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate("Home")}>
          <Icon name="home" size={18} color="white" style={{ marginLeft: 16 }} solid />
        </TouchableOpacity>
      )
    });
    this.props.fetchGetSystem();
  }

  onDetail = async (system) => {
    await this.props.fetchGetOneSystem(system.id);
    var selSystem = this.props.systemsInfo.filter(x => x.id == system.id);
    this.props.navigation.navigate('EditSystem', { system: selSystem[0] });
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
          <TextInput style={styles.searchSystem} onChangeText={text => this.setState({ searchText: text })} label="Input Search Systems"></TextInput>
          <ScrollView>
            {(this.props.systemsInfo.length > 0) && (
              this.props.systemsInfo.map((system, index) => (
                (system.name.indexOf(this.state.searchText) != -1) && (
                  <View style={{ ...styles.cellView, backgroundColor: index % 2 == 0 ? 'rgba(55,55,55,0.1)' : 'rgba(50,162,235,0.4)' }} key={index}>
                    <View style={{ flexDirection: "row", width: Dimensions.get('window').width - 10 }}>
                      <TouchableOpacity style={{ marginLeft: 15, marginTop: 10, flexDirection: "row" }} onPress={() => this.onDetail(system)}>
                        <View style={{ width: Dimensions.get('window').width - 65 }}>
                          <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 3 }}>{system.name}</Text>
                          <Text style={{ fontSize: 10, marginTop: 5 }}>Price: ${system.saleprice}</Text>
                        </View>
                        <View style={{ alignSelf: 'flex-end' }}>
                          <Icon style={{ marginTop: -28 }} name="angle-right" size={18} color="rgba(10,10,10,0.5)" solid />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>)
              ))
            )}
            <View style={{ height: 5 }}></View>
          </ScrollView>
        </View>
      </SideMenu>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  plusButton: {
    width: 24,
    height: 24,
    marginRight: 10
  },
  searchSystem: {
    width: Dimensions.get('window').width - 50,
    height: 25,
    padding: 0,
    paddingLeft: 5,
    margin: 25,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(50,162,235,0.8)',
  },
  cellView: {
    width: Dimensions.get('window').width - 20,
    height: 65,
    marginVertical: 3,
    backgroundColor: 'rgba(15,15,15,0.3)',
    borderColor: 'black',
    marginHorizontal: 10,
    borderRadius: 10
  },
});

const mapStateToProps = (state) => {
  return getSystemSelector(state)
}

const mapDispatchToProps = (dispatch) => ({
  fetchGetSystem: () => dispatch(getSystems()),
  fetchGetOneSystem: (id) => dispatch(getSystem(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SystemScreen); 
