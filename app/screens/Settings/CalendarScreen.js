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
import { getCalendar, addCalendar, updateCalendar, deleteCalendar } from '../../actions/lead';
import { getSystemSelector } from '../../reducers/systemReducer';
import CalendarPicker from 'react-native-calendar-picker';
import TextInput from 'react-native-textinput-with-icons'

class CalendarScreen extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      currentDate: '',
      jobText: '',
      thisId: '',
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
    await this.props.fetchGetCalendar();
    this.props.calendarInfo.map(x => {
      var newDatesStyles = {
        id: x.id,
        date: x.activedate,
        style: { backgroundColor: 'red' },
        textStyle: { color: 'white' },
        content: x.content
      }
      this.setState({ customDatesStyles: this.state.customDatesStyles.concat([newDatesStyles]) })
    })
    this.setState({ isLoading: false })
  }

  onSave = async () => {
    if (this.state.currentDate == '') return;
    var newContent = {
      activedate: this.state.currentDate.toString(),
      content: this.state.jobText
    }
    var thisContent = this.state.customDatesStyles.filter(x => x.date == this.state.currentDate.toString());
    if (thisContent.length > 0) {
      newContent.id = thisContent[0].id
      await this.props.fetchUpdateCalendar(newContent);
    }
    else {
      await this.props.fetchAddCalendar(newContent);
    }
    this.setState({ customDatesStyles: [] })
    this.props.calendarInfo.map(x => {
      var newDatesStyles = {
        id: x.id,
        date: x.activedate,
        style: { backgroundColor: 'red' },
        textStyle: { color: 'white' },
        content: x.content
      }
      this.setState({ customDatesStyles: this.state.customDatesStyles.concat([newDatesStyles]) })
    })
  }

  onRemove = async () => {
    if (this.state.currentDate == '') return;
    var sendParam = { id: this.state.thisId };
    await this.props.fetchDeleteCalendar(sendParam);
    this.setState({ customDatesStyles: this.state.customDatesStyles.filter(x => x.date != this.state.currentDate.toString()) })
  }

  onClickDay = (date) => {
    var newDate = new Date(date);
    var stringDate = newDate.getFullYear() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getDate();
    this.setState({ currentDate: stringDate })
    var content = ""
    var id = ""
    var thisDateContent = this.state.customDatesStyles.filter(x => x.date == stringDate)
    console.log(JSON.stringify(thisDateContent))
    if (thisDateContent.length > 0) {
      content = thisDateContent[0].content
      id = thisDateContent[0].id
    }
    this.setState({ jobText: content })
    this.setState({ thisId: id })
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
            <TextInput style={{ ...styles.textInput, marginTop: 36 }} label="Job" value={this.state.jobText} onChangeText={text => this.setState({ jobText: text })}></TextInput>
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
  return { ...getSystemSelector(state) }
}

const mapDispatchToProps = (dispatch) => ({
  fetchGetCalendar: () => dispatch(getCalendar()),
  fetchAddCalendar: (param) => dispatch(addCalendar(param)),
  fetchDeleteCalendar: (param) => dispatch(deleteCalendar(param)),
  fetchUpdateCalendar: (param) => dispatch(updateCalendar(param))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalendarScreen); 
