import React, { Component, useLayoutEffect } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  CheckBox,
  SafeAreaView,
  TouchableOpacity,
  Animated
} from 'react-native';

import SideMenu from 'react-native-side-menu';
import SystemMenu from '../../menus/SystemMenu';
import { getIngredientSelector } from '../../reducers/ingredientReducer'
import { getIngredientList } from '../../actions/settings';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

class IngredientScreen extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'About',
      ingredientsInfo: [],
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
    this.setState({ isLoading: true })
    this.props.navigation.setOptions({
      headerRight: (props) => (
        <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('NewIngredient')} >
          <Icon name="user-plus" style={{ marginRight: 12 }} size={18} color="#ffffff" solid />
        </TouchableOpacity>
      ),
      headerLeft: (props) => (
        <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate("Home")}>
          <Icon name="home" size={18} color="white" style={{ marginLeft: 16 }} solid />
        </TouchableOpacity>
      )
    });
    this.props.fetchGetIngredient();
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
          <ScrollView style={styles.container}>
            <TextInput style={styles.searchIngredient} onChangeText={text => this.setState({ searchText: text })} placeholder="Input Search ingredients"></TextInput>
            {(this.props.ingredientsInfo.length > 0) && (
              this.props.ingredientsInfo.map((ingredient, index) => (
                (ingredient.name.indexOf(this.state.searchText) != -1) && (
                  <View style={{ ...styles.cellView, height: ingredient.name.length > 50 ? 72 : 65, backgroundColor: index % 2 == 0 ? 'rgba(55,55,55,0.1)' : 'rgba(50,162,235,0.4)' }} key={index}>
                    <View style={{ flexDirection: "row", width: Dimensions.get('window').width - 10 }}>
                      <TouchableOpacity style={{ marginLeft: 15, marginTop: 5, flexDirection: "row" }} onPress={() => this.props.navigation.navigate('EditIngredient', { ingredient })}>
                        <View style={{ width: Dimensions.get('window').width - 60 }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={{ flexShrink: 1, fontSize: 12, fontWeight: 'bold', marginTop: 3 }}>{ingredient.name}</Text>
                          </View>
                          <Text style={{ fontSize: 10, marginTop: 4 }}>Price: ${ingredient.purchaseprice}</Text>
                          <Text style={{ fontSize: 10, marginTop: 1 }}>Coverage: {ingredient.coverage}</Text>
                        </View>
                        <View style={{ alignSelf: 'flex-end' }}>
                          <Icon style={{ marginTop: ingredient.name.length > 50  ? -40 : -33 }} name="angle-right" size={18} color="rgba(10,10,10,0.5)" solid />
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
  plusButton: {
    width: 24,
    height: 24,
    marginRight: 10
  },
  searchIngredient: {
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
  return getIngredientSelector(state)
}

const mapDispatchToProps = (dispatch) => ({
  fetchGetIngredient: () => dispatch(getIngredientList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IngredientScreen); 
