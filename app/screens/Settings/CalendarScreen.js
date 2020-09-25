import React, { Component, useLayoutEffect } from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';

import SideMenu from 'react-native-side-menu';
import SystemMenu from '../../menus/SystemMenu';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { getPatterns, getColors, addIngredients } from '../../actions/settings';
import { getColorSelector } from '../../reducers/colorReducer';
import { getPatternSelector } from '../../reducers/patternReducer';
import CalendarPicker from 'react-native-calendar-picker';
import TextInput from 'react-native-textinput-with-icons'

class CalendarScreen extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      currentDate: '',
      customDatesStyles: []
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

    this.setState({ isLoading: false })
  }

  onSave = () => {
    if (this.state.currentDate == '') return;
    var newDatesStyles = {
      date: this.state.currentDate.toString(),
      style: { backgroundColor: 'red' },
      textStyle: { color: 'white' }
    }
    this.setState({ customDatesStyles: this.state.customDatesStyles.concat([newDatesStyles]) })
  }

  onRemove = () => {
    if (this.state.currentDate == '') return;
    this.setState({ customDatesStyles: this.state.customDatesStyles.filter(x => x.date != this.state.currentDate.toString()) })
  }

  onClickDay = (date) => {
    this.setState({ currentDate: date })
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
            <CalendarPicker
              customDatesStyles={this.state.customDatesStyles}
              onDateChange={date => this.onClickDay(date)}
            />
            <TextInput style={{ ...styles.textInput, marginTop: 36 }} label="Job"></TextInput>
            <View style={{ flexDirection: 'row', marginTop: 24 }}>
              <TouchableOpacity onPress={this.onSave} style={{ ...styles.buttonView, backgroundColor: "rgba(51,122,183,1.0)" }}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onRemove} style={{ ...styles.buttonView, backgroundColor: "rgba(255,0,0,1.0)" }}>
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    width: Dimensions.get('window').width / 2 - 70,
    margin: 10,
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10
  },
  buttonText: {
    fontSize: 16,
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
  fetchAddIngredient: (param) => dispatch(addIngredients(param))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalendarScreen); 
