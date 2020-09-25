import React, { Component, useLayoutEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
  CheckBox
} from 'react-native';

import SideMenu from 'react-native-side-menu';
import SystemMenu from '../../../menus/SystemMenu';
import TextInput from 'react-native-textinput-with-icons'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { getPatterns, getColors, updateIngredients } from '../../../actions/settings';
import { getColorSelector } from '../../../reducers/colorReducer';
import { getPatternSelector } from '../../../reducers/patternReducer';

class EditIngredientScreen extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'About',
      name: '',
      coverage: '',
      price: '',
      colorOpen: false,
      patternOpen: false,
      colorsInfo: [],
      patternsInfo: [],
      colorsState: [],
      patternsState: [],
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
        <TouchableOpacity activeOpacity={.5} onPress={this.onSave}>
          <Icon name="save" style={{ marginRight: 12 }} size={18} color="#ffffff" solid />
        </TouchableOpacity>
      )
    });

    await this.props.fetchGetPattern()
    await this.props.fetchGetColor()

    this.ingredient = this.props.route.params.ingredient;
    this.setState({ name: this.ingredient.name, coverage: '' + this.ingredient.coverage, price: '' + this.ingredient.purchaseprice })

    var tempColorState = new Array(this.props.colorsInfo.length).fill(false)
    this.ingredient.color.map(x => {
      this.props.colorsInfo.map((y, i) => {
        if (x.colorid == y.id) {
          tempColorState[i] = true;
        }
      })
    })
    this.setState({ colorsState: tempColorState })

    var tempPatternState = new Array(this.props.patternsInfo.length).fill(false)
    this.ingredient.pattern.map(x => {
      this.props.patternsInfo.map((y, i) => {
        if (x.patternid == y.id) {
          tempPatternState[i] = true;
        }
      })
    })
    this.setState({ patternsState: tempPatternState })
    this.setState({ isLoading: false })
  }

  onSave = () => {
    var sendParam = {
      id: this.ingredient.id,
      name: this.state.name,
      coverage: this.state.coverage,
      purchaseprice: this.state.price,
      color: this.props.colorsInfo.filter((x, i) => this.state.colorsState[i] == true).reduce((t, p) => { t.push(p.id); return t; }, []),
      pattern: this.props.patternsInfo.filter((x, i) => this.state.patternsState[i] == true).reduce((t, p) => { t.push(p.id); return t; }, []),
    }
    this.props.fetchUpdateIngredient(sendParam);
    this.props.navigation.navigate('Ingredient');
  }

  toggleColor = () => {
    this.setState({
      colorOpen: !this.state.colorOpen,
    });
  }

  togglePattern = () => {
    this.setState({
      patternOpen: !this.state.patternOpen,
    });
  }

  _renderColor = () => {
    if (this.state.colorOpen) {
      return (
        <View>
          {(this.props.colorsInfo.length > 0) && (
            this.props.colorsInfo.map((color, index) => {
              return (
                <View style={styles.checkboxContainer} key={index}>
                  <CheckBox
                    value={this.state.colorsState[index]}
                    onValueChange={checkState => { this.setState({ colorsState: this.state.colorsState.map((x, i) => (i == index ? checkState : x)) }) }}
                    style={styles.checkbox}
                  />
                  <Text> {color.name} </Text>
                </View>
              )
            })
          )}
        </View>
      );
    }
  }

  _renderPattern = () => {
    if (this.state.patternOpen) {
      return (
        <View>
          {(this.props.patternsInfo.length > 0) && (
            this.props.patternsInfo.map((pattern, index) => (
              <View style={styles.checkboxContainer} key={index}>
                <CheckBox
                  value={this.state.patternsState[index]}
                  onValueChange={checkState => { this.setState({ patternsState: this.state.patternsState.map((x, i) => (i == index ? checkState : x)) }) }}
                  style={styles.checkbox}
                />
                <Text> {pattern.name} </Text>
              </View>
            ))
          )}
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
        {this.state.isLoading ?
          <View style={styles.container}>

          </View>
          :
          <ScrollView style={{ flex: 1, backgroundColor: '#F5FCFF', }}>
            <View style={styles.container}>
              <View style={{ marginTop: 10 }}>
                <TextInput label='Name' onChangeText={text => this.setState({ name: text })} value={this.state.name} style={styles.textInput}></TextInput>
              </View>
              <View>
                <TextInput label='Coverage Area sq/ft' onChangeText={text => this.setState({ coverage: text })} value={this.state.coverage} style={styles.textInput}></TextInput>
              </View>
              <View>
                <TextInput label='Purchase Price' onChangeText={text => this.setState({ price: text })} value={this.state.price} style={styles.textInput}></TextInput>
              </View>
              <TouchableOpacity onPress={() => this.toggleColor()} style={{ ...styles.buttonView, backgroundColor: this.state.colorOpen ? "rgb(236,151,31)" : "rgb(51,122,183)" }}>
                {this.state.colorOpen ? <Icon name="minus-circle" style={{ margin: 8 }} size={16} color="#ffffff" solid /> : <Icon name="plus-circle" style={{ margin: 8 }} size={16} color="#ffffff" solid />}
                <Text style={styles.buttonText}>Color ({this.ingredient != undefined ? this.ingredient.color.length : 0})</Text>
              </TouchableOpacity>
              {this._renderColor()}
              <TouchableOpacity onPress={() => this.togglePattern()} style={{ ...styles.buttonView, backgroundColor: this.state.patternOpen ? "rgb(236,151,31)" : "rgb(51,122,183)" }}>
                {this.state.patternOpen ? <Icon name="minus-circle" style={{ margin: 8 }} size={16} color="#ffffff" solid /> : <Icon name="plus-circle" style={{ margin: 8 }} size={16} color="#ffffff" solid />}
                <Text style={styles.buttonText}>Pattern ({this.ingredient != undefined ? this.ingredient.pattern.length : 0})</Text>
              </TouchableOpacity>
              {this._renderPattern()}
            </View>
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
    justifyContent: 'center',
    alignItems: 'center'
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
    width: Dimensions.get('window').width / 3 * 2.5,
    height: 30,
    padding: 5,
    borderBottomWidth: 1,
    marginBottom: 10,
    marginTop: 2
  },
  buttonView: {
    alignItems: 'center',
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
  checkboxContainer: {
    flexDirection: "row"
  },
  checkbox: {
    alignSelf: "center",
    marginTop: -5
  },
});

const mapStateToProps = (state) => {
  return { ...getColorSelector(state), ...getPatternSelector(state) }
}

const mapDispatchToProps = (dispatch) => ({
  fetchGetColor: () => dispatch(getColors()),
  fetchGetPattern: () => dispatch(getPatterns()),
  fetchUpdateIngredient: (param) => dispatch(updateIngredients(param))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditIngredientScreen); 
