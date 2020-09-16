import React, { Component, useLayoutEffect } from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  CheckBox,
  TouchableOpacity,
  Switch,
  TextInput as ClassicInput,
  Animated
} from 'react-native';

import SideMenu from 'react-native-side-menu';
import SystemMenu from '../../../menus/SystemMenu';

import { ScrollView } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/FontAwesome5';
import TextInput from 'react-native-textinput-with-icons'

import { getIngredientSelector } from '../../../reducers/ingredientReducer'
import { getIngredientList, addSystems } from '../../../actions/settings';
import { connect } from 'react-redux';

class NewSystemScreen extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'About',
      ingredientOpen: false,
      ingredientsInfo: [],
      itemsState: [],
      checkState: [],
      isActive:false,
      isShare:false,
      systemName:'',
      systemPrice:'',
      unitList: [],
      extraList: []
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  toggleItem = (index) => {
    var tempStateInfo = this.state.itemsState.concat();
    tempStateInfo[index] = !tempStateInfo[index];
    this.setState({ itemsState: tempStateInfo });
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
        <TouchableOpacity activeOpacity={.5} onPress={this.onSave}>
          <Icon name="save" style={{ marginRight: 12 }} size={18} color="#ffffff" solid />
        </TouchableOpacity>
      )
    });
    this.props.fetchGetIngredient();
    this.state.itemsState = new Array(this.props.ingredientsInfo.length).fill(false);
    this.state.checkState = new Array(this.props.ingredientsInfo.length).fill(false);
    this.state.unitList = new Array(this.props.ingredientsInfo.length).fill(0);
    this.state.extraList = new Array(this.props.ingredientsInfo.length).fill('');
  }

  toggleIngredient = () => {
    this.setState({
      ingredientOpen: !this.state.ingredientOpen,
    });
  }

  onSave = () => {
    var sendParam = {
      name:this.state.systemName,
      saleprice:this.state.systemPrice,
      ingredients: []
    }
    this.state.checkState.map((x,i)=>{
      if(x){
        let ingredient = {
          ingredientid:this.props.ingredientsInfo[i].id,
          extra:this.state.extraList[i],
          factor:this.state.unitList[i]
        }
        sendParam.ingredients.push(ingredient);
      }
    })
    console.log('sendParam', JSON.stringify(sendParam));
    this.props.fetchAddSystems(sendParam);
  }

  _renderIngredient = () => {
    if (this.state.ingredientOpen) {
      return (
        <View style={{marginBottom:10}}>
          <ScrollView>
            {(this.props.ingredientsInfo.length > 0) && (
              this.props.ingredientsInfo.map((ingredient, index) => (
                <View style={{ ...styles.cellView, height: this.state.itemsState[index] ? 120 : 60, backgroundColor: index % 2 == 0 ? 'rgba(55,55,55,0.1)' : 'rgba(50,162,235,0.4)' }} key={index}>
                  <View style={{ flexDirection: "row", width: Dimensions.get('window').width - 10 }}>
                    <TouchableOpacity onPress={() => this.toggleItem(index)}>
                      <View style={{ marginLeft: 15, marginTop: 10, flexDirection: "row" }}>
                        <CheckBox size={10} style={{ marginLeft: -10, marginTop: 5 }} value={this.state.checkState[index]} onValueChange={() => this.setState({ checkState: this.state.checkState.map((x, i) => i == index ? !x : x) })}></CheckBox>
                        <View style={{ width: Dimensions.get('window').width - 90 }}>
                          <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 3 }}>{ingredient.name}</Text>
                          <Text style={{ fontSize: 10, marginTop: 5 }}>{ingredient.purchageprice}</Text>
                        </View>
                        <View style={{ alignSelf: 'flex-end' }}>
                          <Icon style={{ marginTop: -27 }} name={this.state.itemsState[index] ? "angle-down" : "angle-right"} size={18} color="rgba(10,10,10,0.5)" solid />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {(this.state.itemsState[index]) &&
                    (<View>
                      <View style={{ flexDirection: 'row', marginLeft: 50, marginTop: 20, height: 25, width: 30 }}>
                        <Text style={{ fontSize: 11 }}>Units</Text>
                        <View style={styles.smallTextInput}>
                          <TextInput containerMaxWidth={200} paddingBottom={0} paddingTop={0} fontSize={11} containerMaxHeight={50} onChangeText={text => this.setState({ unitList: this.state.unitList.map((x,i)=>i==index?text:x) })} value={this.state.unitList[index]}></TextInput>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', marginLeft: 50, height: 20 }}>
                        <Text style={{ fontSize: 11 }}>Extra</Text>
                        <View style={styles.smallTextInput}>
                          <TextInput containerMaxWidth={200} containerWidth={200} paddingBottom={0} paddingTop={0} fontSize={11} containerMaxHeight={50} onChangeText={text => this.setState({ extraList: this.state.extraList.map((x,i)=>i==index?text:x) })} value={this.state.extraList[index]}></TextInput>
                        </View>
                      </View>
                    </View>)}
                </View>
              ))
            )}
          </ScrollView>
        </View>
      );
    }
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
        <ScrollView style={{ flex: 1, backgroundColor: '#F5FCFF', }}>
          <View style={styles.container}>
            <View style={{ marginTop: 20 }}>
              <TextInput label="Name" underlineColor='rgba(50,162,235,0.8)' paddingBottom={2} fontSize={12} style={styles.textInput} onChangeText={text => this.setState({ systemName: text })} value={this.state.systemName}></TextInput>
            </View>
            <View style={styles.switchView}>
              <Text style={{ fontSize: 12 }}>Active</Text>
              <Switch style={styles.switch} value={this.state.isActive} onValueChange={() => this.setState({isActive:!this.state.isActive})}></Switch>
              <Text style={{ fontSize: 12, marginLeft: 80 }}>Share</Text>
              <Switch style={styles.switch} value={this.state.isShare} onValueChange={() => this.setState({isShare:!this.state.isShare})}></Switch>
            </View>
            <View>
              <TextInput label="System price/sq ft" underlineColor='rgba(50,162,235,0.8)' paddingBottom={2} fontSize={12} style={styles.textInput} onChangeText={text => this.setState({ systemPrice: text })} value={this.state.systemPrice}></TextInput>
            </View>
            <TouchableOpacity onPress={() => this.toggleIngredient()} style={{ ...styles.buttonView, backgroundColor: this.state.ingredientOpen ? "rgb(236,151,31)" : "rgb(51,122,183)" }}>
              {this.state.ingredientOpen ? <Icon name="minus-circle" style={{ margin: 8, height: 35 }} size={16} color="#ffffff" solid /> : <Icon name="plus-circle" style={{ margin: 8, height: 35 }} size={16} color="#ffffff" solid />}
              <Text style={styles.buttonText}>Ingredient</Text>
            </TouchableOpacity>
            {this._renderIngredient()}
          </View>
        </ScrollView>
      </SideMenu>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
  },
  searchLead: {
    width: Dimensions.get('window').width - 50,
    height: 25,
    padding: 0,
    paddingLeft: 5,
    margin: 25,
    borderWidth: 1,
  },
  switchView: {
    flexDirection: 'row',
    marginTop: 16
  },
  switch: {
    marginLeft: 20,
    marginTop: -3
  },
  saveButton: {
    width: 60,
    height: 30,
    borderRadius: 3,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15
  },
  textInput: {
    width: Dimensions.get('window').width / 3 * 2,
    height: 30,
    padding: 5,
    marginBottom: 20,
    marginTop: 5,
    borderBottomColor: 'rgba(50,162,235,0.8)',
    borderBottomWidth: 1,
  },
  buttonView: {
    width: Dimensions.get('window').width - 24,
    margin: 10,
    height: 35,
    flexDirection: 'row'
  },
  buttonText: {
    fontSize: 16,
    width: Dimensions.get('window').width - 80,
    color: 'white',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  cellView: {
    width: Dimensions.get('window').width - 20,
    height: 60,
    marginVertical: 3,
    backgroundColor: 'rgba(15,15,15,0.3)',
    borderColor: 'black',
    marginHorizontal: 10,
    borderRadius: 10
  },
  smallTextInput: {
    marginLeft: 10,
    marginTop: 0,
    fontSize: 10,
    width: Dimensions.get('window').width - 100,
    height: 12,
    width: 30
  }
});

const mapStateToProps = (state) => {
  return getIngredientSelector(state)
}

const mapDispatchToProps = (dispatch) => ({
  fetchGetIngredient: () => dispatch(getIngredientList()),
  fetchAddSystems: (system) => dispatch(addSystems(system)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewSystemScreen); 
