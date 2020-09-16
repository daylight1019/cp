import React, { Component, useLayoutEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated
} from 'react-native';


import SideMenu from 'react-native-side-menu';
import SystemMenu from '../../menus/SystemMenu';
import { connect } from 'react-redux';
import { getLeadSelector } from '../../reducers/leadReducer';
import { getLeads, getLeadsList } from '../../actions/lead';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TextInput from 'react-native-textinput-with-icons'

class ActiveLeadsScreen extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'About',
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
    this.props.navigation.setOptions({
      headerRight: (props) => (
        <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('NewLead')} >
          <Icon name="user-plus" style={{ marginRight: 12 }} size={18} color="#ffffff" solid />
        </TouchableOpacity>

      ),
      headerLeft: (props) => (
        <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate("Home")}>
          <Icon name="home" size={18} color="white" style={{ marginLeft: 16 }} solid />
        </TouchableOpacity>
      )
    });

    this.loadData();
  }

  async loadData() {
    await this.props.fetchLead();
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
          <TextInput style={styles.searchLead} onChangeText={text => this.setState({ searchText: text })} label="Input Search Leads"></TextInput>
          <ScrollView>
            {(this.props.leadsInfo != undefined) && (
              this.props.leadsInfo.map((lead, index) => (
                (lead.person.firstname.indexOf(this.state.searchText) != -1) && (
                  <View style={{ ...styles.cellView, backgroundColor: index % 2 == 0 ? 'rgba(55,55,55,0.1)' : 'rgba(50,162,235,0.4)' }} key={index}>
                    <View style={{ flexDirection: "row", width: Dimensions.get('window').width - 10 }}>
                      <TouchableOpacity style={{ marginLeft: 15, marginTop: 10, flexDirection: "row" }} onPress={() => this.props.navigation.navigate("EditLead", { lead })}>
                        <View style={{ width: Dimensions.get('window').width - 65, marginLeft: 5 }}>
                          <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 0 }}>{lead.person.firstname + " " + lead.person.lastname}</Text>
                          <Text style={{ fontSize: 10, marginTop: 5 }}>{lead.person.company}</Text>
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
  cellView: {
    width: Dimensions.get('window').width - 20,
    height: 60,
    marginVertical: 3,
    backgroundColor: 'rgba(15,15,15,0.3)',
    borderColor: 'black',
    marginHorizontal: 10,
    borderRadius: 10
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  searchLead: {
    width: Dimensions.get('window').width - 50,
    height: 35,
    padding: 0,
    paddingLeft: 5,
    margin: 25,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(50,162,235,0.8)'
  },
  plusButton: {
    width: 24,
    height: 24,
    marginRight: 10
  },
});


const mapStateToProps = (state) => {
  return getLeadSelector(state);
}

const mapDispatchToProps = (dispatch) => ({
  fetchLead: () => dispatch(getLeadsList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveLeadsScreen); 
