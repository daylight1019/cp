import React, { Component, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  Button,
  Switch,
  TouchableOpacity,
  Animated,
  Platform,
  ActionSheetIOS
} from 'react-native';

import SideMenu from 'react-native-side-menu';
import SystemMenu from '../../menus/SystemMenu';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getIngredientSelector } from '../../reducers/ingredientReducer'
import { getSystemSelector } from '../../reducers/systemReducer'
import { getLeadSelector } from '../../reducers/leadReducer'
import { getIngredientList, getSystems, getSystem } from '../../actions/settings';
import { getLeadsList, getLead, addAddress, addPhone, updateAddress, updateLeadDetail, updateLead, updatePerson, updatePhone, getState } from '../../actions/lead';
import { connect } from 'react-redux';
import { Picker } from '@react-native-community/picker';
import { EndOfLineState } from 'typescript';

class EditLeadScreen extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'About',
      isLoading: false,
      error: false,
      leadsInfo: [],
      oneLeadInfo: {},
      ingredientsInfo: [],
      systemsInfo: [],
      statesList: [],
      systemOpen: false,
      phoneOpen: false,
      addressOpen: false,
      addProjectDetailResult: false,
      projectId: '',
      firstName: '',
      lastName: '',
      designDate: '',
      company: '',
      phoneNumber: '',
      phoneType: '',
      email: '',
      callTime: 'morning',
      aboutUs: '',
      helpText: '',
      address: '',
      city: '',
      stateVal: 'france',
      zip: '',
      addressType: '',
      areaName: '',
      lengthFt: '',
      widthFt: '',
      salePrice: '',
      systemValue: '',
      systemLabel: '',
      systemList: [],
      sqftEdit: false,
      addressList: [],
      leadDetailList: [],
      phoneList: [],
      isActive: '',
      oneSystem: {},
      phoneTypeArray: [],
      callTimeArray: [],
      addressTypeArray: []
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
    await this.props.fetchGetLeadsList();

    this.leadInfo = {
      id: this.lead.id,
      active: this.state.isActive
    }

    await this.props.fetchUpdateLead(this.leadInfo)

    this.personInfo = {
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      company: this.state.company,
      id: this.personId
    }

    await this.props.fetchUpdatePerson(this.personInfo);

    this.detailInfo = {
      id: this.leadDetailId,
      email: this.state.email,
      besttimetocall: this.state.callTime,
      hearaboutus: this.state.aboutUs,
      howcanwehelp: this.state.helpText
    }
    await this.props.fetchUpdateDetail(this.detailInfo);

    this.state.phoneList.map(phone => {
      let tempPhone = { ...phone };
      delete tempPhone['new'];
      if (phone.new != undefined) {
        if (phone.new == true) {
          this.props.fetchAddPhone(tempPhone);
        } else {
          this.props.fetchUpdatePhone(tempPhone);
        }
      }
    })

    this.state.addressList.map(addr => {
      let tempAddress = { ...addr };
      delete tempAddress['new'];
      if (addr.new != undefined) {
        if (addr.new == true) {
          this.props.fetchAddAddress(tempAddress);
        } else {
          this.props.fetchUpdateAddress(tempAddress);
        }
      }
    })

    this.props.navigation.navigate("ActiveLeads", { active: this.props.route.params.active });
  }

  async componentDidMount() {
    this.setState({ isLoading: true })
    this.setState({ isActive: this.props.route.params.active })
    this.setState({
      phoneTypeArray: new Array('cell', 'home', 'office'),
      callTimeArray: new Array('morning', 'afternoon', 'evening'),
      addressTypeArray: new Array('home', 'office', 'billing', 'main'),
    })
    this.props.navigation.setOptions({
      headerRight: (props) => (
        <TouchableOpacity activeOpacity={.5} onPress={this.onSave}>
          <Icon name="save" style={{ marginRight: 12 }} size={18} color="#ffffff" solid />
        </TouchableOpacity>
      )
    });
    await this.props.fetchGetSystems();
    this.systemPickerData = [];
    this.props.systemsInfo.map(x => {
      this.systemPickerData.push({ label: x.name, value: x.id });
    })
    this.initComponent();
  }

  async initComponent() {
    await this.props.fetchGetState();
    await this.props.fetchGetSystems();
    this.systemPickerData = [];
    this.props.systemsInfo.map(x => {
      this.systemPickerData.push({ label: x.name, value: x.name });
    })

    this.lead = this.props.route.params.lead;

    console.log("This.lead", JSON.stringify(this.lead))

    await this.props.fetchGetLead(this.lead.id);
    this.leadDetailId = this.props.oneLeadInfo.leaddetail.id;
    this.personId = this.props.oneLeadInfo.person.id;
    this.detail = this.props.oneLeadInfo.leaddetail.id;
    this.setState({ firstName: this.props.oneLeadInfo.person.firstname });
    this.setState({ lastName: this.props.oneLeadInfo.person.lastname });
    this.setState({ company: this.props.oneLeadInfo.person.company });

    this.setState({ email: this.props.oneLeadInfo.leaddetail.email });
    this.setState({ callTime: this.props.oneLeadInfo.leaddetail.besttimetocall });
    this.setState({ aboutUs: this.props.oneLeadInfo.leaddetail.hearaboutus });
    this.setState({ helpText: this.props.oneLeadInfo.leaddetail.howcanwehelp });

    if (this.props.oneLeadInfo.phone.length > 0) {
      this.setState({ phoneList: this.props.oneLeadInfo.phone })
    }
    if (this.props.oneLeadInfo.address.length > 0) {
      this.setState({ addressList: this.props.oneLeadInfo.address })
    }
    if (this.props.statesInfo != undefined) {
      this.setState({
        statesList: this.props.statesInfo.map(oneState =>
          ({ label: oneState.countryid + " " + oneState.state, value: oneState.id }))
      })
    }
    this.setState({ isLoading: false })
  }

  toggleSystem = () => {
    this.setState({
      systemOpen: !this.state.systemOpen,
    });
  }

  toggleDetail = () => {
    this.setState({
      phoneOpen: !this.state.phoneOpen,
    });
  }

  toggleAddress = () => {
    this.setState({
      addressOpen: !this.state.addressOpen,
    });
  }

  onDetailAddress = (addr) => {
    this.setState({ address: addr.address1 });
    this.setState({ city: addr.city });
    this.setState({ zip: addr.zip });
    this.setState({ stateVal: addr.state });
    this.setState({ addressType: addr.type });
    this.addressId = addr.id;
  }

  onDetailPhone = (phone) => {
    this.setState({ phoneNumber: phone.number });
    this.setState({ phoneType: phone.type });
    this.phoneId = phone.id;
  }

  onNewPhone = async () => {
    this.phoneInfo = {
      personid: this.personId,
      number: this.state.phoneNumber,
      type: this.state.phoneType,
      primary: 1,
      new: true
    }
    this.setState({ phoneList: this.state.phoneList.concat(this.phoneInfo) });
    this.setState({
      phoneNumber: '',
      phoneType: null
    });
  }

  onUpdatePhone = async () => {
    this.phoneInfo = {
      id: this.phoneId,
      personid: this.personId,
      number: this.state.phoneNumber,
      type: this.state.phoneType,
      primary: 1,
      new: false
    }
    this.setState({ phoneList: this.state.phoneList.map(phone => phone.id == this.phoneId ? this.phoneInfo : phone) });
    this.setState({
      phoneNumber: '',
      phoneType: null
    });
    this.phoneId = "";
  }

  onNewAddress = async () => {
    this.addressInfo = {
      personid: this.personId,
      address1: this.state.address,
      address2: '',
      city: this.state.city,
      state: this.state.stateVal,
      zip: this.state.zip,
      primary: 1,
      new: true
    }
    this.setState({ addressList: this.state.addressList.concat(this.addressInfo) });
    this.setState({
      address: '',
      city: '',
      stateVal: null,
      zip: ''
    })
  }

  onUpdateAddress = async () => {
    this.addressInfo = {
      personid: this.personId,
      address1: this.state.address,
      address2: '',
      city: this.state.city,
      state: this.state.stateVal,
      zip: this.state.zip,
      primary: 1,
      new: false,
      id: this.addressId
    }
    this.setState({ addressList: this.state.addressList.map(addr => addr.id == this.addressId ? this.addressInfo : addr) });
    this.setState({
      address: '',
      city: '',
      stateVal: null,
      zip: ''
    })
    this.addressId = "";
  }

  _renderPhone = () => {
    if (this.state.phoneOpen) {
      return (
        <View style={styles.container}>
          <View style={{ marginTop: 10 }}>
            <TextInput
              style={styles.textInput}
              placeholder="Phone Number"
              onChangeText={text => this.setState({ phoneNumber: text })}
              defaultValue={this.state.phoneNumber}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
            <Text>Phone Type</Text>
            {Platform.OS === 'ios' ?
              <Button title={this.state.phoneType == '' ? 'Not Selected' : this.state.phoneType} onPress={() =>
                ActionSheetIOS.showActionSheetWithOptions(
                  {
                    options: this.state.phoneTypeArray
                  },
                  buttonIndex => {
                    this.setState({ phoneType: this.state.phoneTypeArray[buttonIndex] })
                  }
                )
              }>
              </Button> :
              <Picker
                selectedValue={this.state.phoneType}
                style={{ height: 40, backgroundColor: 'rgba(30,30,30,0.3)', marginLeft: 10, width: Dimensions.get('window').width / 3 * 1.7 }}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onValueChange={item => this.setState({
                  phoneType: item
                })}
              >
                {this.state.phoneTypeArray.map((oneState, index) =>
                  <Picker.Item key={index} label={oneState} value={oneState} />
                )}
              </Picker>}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => this.onNewPhone()} style={{ ...styles.buttonView, borderRadius: 10, backgroundColor: "rgba(51,222,30,0.8)", width: 120 }}>
              <Text style={{ ...styles.buttonText, width: 120 }}>New</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onUpdatePhone()} style={{ ...styles.buttonView, borderRadius: 10, backgroundColor: "rgba(51,222,30,0.8)", width: 120 }}>
              <Text style={{ ...styles.buttonText, width: 120 }}>Save</Text>
            </TouchableOpacity>
          </View>
          {this.state.phoneList.map((phone, index) =>
            (<View style={{ ...styles.cellView, backgroundColor: index % 2 == 1 ? 'rgba(55,55,55,0.1)' : 'rgba(50,162,235,0.4)' }} key={index}>
              <View style={{ flexDirection: "row", width: Dimensions.get('window').width - 10 }}>
                <TouchableOpacity style={{ marginLeft: 15, marginTop: 5, flexDirection: "row" }} onPress={() => this.onDetailPhone(phone)}>
                  <View style={{ width: Dimensions.get('window').width - 55 }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 3 }}>{phone.number}</Text>
                    <Text style={{ fontSize: 12, marginTop: 3 }}>{phone.type}</Text>
                  </View>
                  <View style={{ alignSelf: 'flex-end' }}>
                    <Icon style={{ marginTop: -27 }} name="angle-right" size={18} color="rgba(10,10,10,0.5)" solid />
                  </View>
                </TouchableOpacity>
              </View>
            </View>)
          )}
          <View style={{ height: 20 }}></View>
        </View>
      );
    }
  }

  _renderAddress = () => {
    if (this.state.addressOpen) {
      return (
        <View style={styles.container}>
          <View style={{ marginTop: 10 }}>
            <TextInput
              style={styles.textInput}
              placeholder="Address"
              onChangeText={text => this.setState({ address: text })}
              defaultValue={this.state.address}
            />
          </View>
          <View>
            <TextInput
              style={styles.textInput}
              placeholder="City"
              onChangeText={text => this.setState({ city: text })}
              defaultValue={this.state.city}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
            <Text>State</Text>
            {Platform.OS === 'ios' ?
              <Button title={this.state.stateVal == '' ? 'Not Selected' : this.state.stateVal} onPress={() =>
                ActionSheetIOS.showActionSheetWithOptions(
                  {
                    options: this.state.statesList.map(x => x.label)
                  },
                  buttonIndex => {
                    this.setState({ stateVal: this.state.statesList[buttonIndex].value })
                  }
                )
              }>
              </Button> :
              <Picker
                selectedValue={this.state.stateVal}
                style={{ height: 40, backgroundColor: 'rgba(30,30,30,0.3)', marginLeft: 10, width: Dimensions.get('window').width / 3 * 1.7 }}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onValueChange={item => this.setState({
                  stateVal: item
                })}
              >
                {this.state.statesList.map((oneState, index) =>
                  <Picker.Item key={index} label={oneState.label} value={oneState.value} />
                )}
              </Picker>
            }
          </View>
          <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
            <Text>Type</Text>
            {Platform.OS === 'ios' ?
              <Button title={this.state.addressType == '' ? 'Not Selected' : this.state.addressType} onPress={() =>
                ActionSheetIOS.showActionSheetWithOptions(
                  {
                    options: this.state.addressTypeArray
                  },
                  buttonIndex => {
                    this.setState({ addressType: this.state.addressTypeArray[buttonIndex] })
                  }
                )
              }>
              </Button> :
              <Picker
                selectedValue={this.state.addressType}
                style={{ height: 40, backgroundColor: 'rgba(30,30,30,0.3)', marginLeft: 10, width: Dimensions.get('window').width / 3 * 1.7 }}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onValueChange={item => this.setState({
                  addressType: item
                })}
              >
                {this.state.addressTypeArray.map((oneState, index) =>
                  <Picker.Item key={index} label={oneState} value={oneState} />
                )}
              </Picker>}
          </View>
          <View>
            <TextInput
              style={styles.textInput}
              placeholder="Zip"
              onChangeText={text => this.setState({ zip: text })}
              defaultValue={this.state.zip}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => this.onNewAddress()} style={{ ...styles.buttonView, borderRadius: 10, backgroundColor: "rgba(51,222,30,0.8)", width: 120 }}>
              <Text style={{ ...styles.buttonText, width: 120 }}>New</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onUpdateAddress()} style={{ ...styles.buttonView, borderRadius: 10, backgroundColor: "rgba(51,222,30,0.8)", width: 120 }}>
              <Text style={{ ...styles.buttonText, width: 120 }}>Save</Text>
            </TouchableOpacity>
          </View>
          {this.state.addressList.map((addr, index) =>
            (<View style={{ ...styles.cellView, backgroundColor: index % 2 == 1 ? 'rgba(55,55,55,0.1)' : 'rgba(50,162,235,0.4)' }} key={index}>
              <View style={{ flexDirection: "row", width: Dimensions.get('window').width - 10 }}>
                <TouchableOpacity style={{ marginLeft: 15, marginTop: 5, flexDirection: "row" }} onPress={() => this.onDetailAddress(addr)}>
                  <View style={{ width: Dimensions.get('window').width - 55 }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 3 }}>{addr.address1}</Text>
                    <Text style={{ fontSize: 12, marginTop: 3 }}>{addr.city + "   " + addr.zip}</Text>
                  </View>
                  <View style={{ alignSelf: 'flex-end' }}>
                    <Icon style={{ marginTop: -27 }} name="angle-right" size={18} color="rgba(10,10,10,0.5)" solid />
                  </View>
                </TouchableOpacity>
              </View>
            </View>)
          )}
          <View style={{ height: 5 }}></View>
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
          <View style={styles.container}>
            <ScrollView>

              <View style={styles.container}>
                <View style={{ marginTop: 30 }}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="First Name"
                    onChangeText={text => this.setState({ firstName: text })}
                    defaultValue={this.state.firstName}
                  />
                </View>
                <View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Last Name"
                    onChangeText={text => this.setState({ lastName: text })}
                    defaultValue={this.state.lastName}
                  />
                </View>
                {/* <View>
                <TextInput
                  style={styles.textInput}
                  placeholder="Design Date"
                  onChangeText={text => this.setState({ designDate: text })}
                  defaultValue={this.state.email}
                />
              </View> */}
                <View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Company"
                    onChangeText={text => this.setState({ company: text })}
                    defaultValue={this.state.company}
                  />
                </View>
                <View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={text => this.setState({ email: text })}
                    defaultValue={this.state.email}
                  />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
                  <Text>Best time to call</Text>
                  {Platform.OS === 'ios' ?
                    <Button title={this.state.callTime == '' ? 'Not Selected' : this.state.callTime} onPress={() =>
                      ActionSheetIOS.showActionSheetWithOptions(
                        {
                          options: this.state.callTimeArray
                        },
                        buttonIndex => {
                          this.setState({ callTime: this.state.callTimeArray[buttonIndex] })
                        }
                      )
                    }>
                    </Button> :
                    <Picker
                      selectedValue={this.state.callTime}
                      style={{ height: 40, backgroundColor: "rgba(30,30,30,0.3)", marginLeft: 10, width: Dimensions.get('window').width / 3 * 1.5 }}
                      itemStyle={{
                        justifyContent: 'flex-start'
                      }}
                      dropDownStyle={{ backgroundColor: '#fafafa' }}
                      onValueChange={item => this.setState({
                        callTime: item
                      })}
                    >
                      {this.state.callTimeArray.map((oneState, index) =>
                        <Picker.Item key={index} label={oneState} value={oneState} />
                      )}
                    </Picker>
                  }
                </View>
                <View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="How did you hear about us?"
                    onChangeText={text => this.setState({ aboutUs: text })}
                    defaultValue={this.state.aboutUs}
                  />
                </View>
                <View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="How can we help?"
                    onChangeText={text => this.setState({ helpText: text })}
                    defaultValue={this.state.helpText}
                  />
                </View>
                <View style={{ marginTop: 5, flexDirection: 'row', marginBottom: 5 }}>
                  <Text style={{}}>Active</Text>
                  <Switch style={{ marginLeft: 20, marginTop: -3 }} value={this.state.isActive} onValueChange={() => this.setState({ isActive: !this.state.isActive })}></Switch>
                </View>
              </View>
              <TouchableOpacity onPress={() => this.toggleDetail()} style={{ ...styles.buttonView, backgroundColor: this.state.phoneOpen ? "rgb(236,151,31)" : "rgb(51,122,183)" }}>
                {this.state.phoneOpen ? <Icon name="minus-circle" style={{ margin: 8 }} size={16} color="#ffffff" solid /> : <Icon name="plus-circle" style={{ margin: 8 }} size={16} color="#ffffff" solid />}
                <Text style={styles.buttonText}>Phone</Text>
              </TouchableOpacity>
              {this._renderPhone()}
              <TouchableOpacity onPress={() => this.toggleAddress()} style={{ ...styles.buttonView, backgroundColor: this.state.addressOpen ? "rgb(236,151,31)" : "rgb(51,122,183)" }}>
                {this.state.addressOpen ? <Icon name="minus-circle" style={{ margin: 8 }} size={16} color="#ffffff" solid /> : <Icon name="plus-circle" style={{ margin: 8 }} size={16} color="#ffffff" solid />}
                <Text style={styles.buttonText}>Address</Text>
              </TouchableOpacity>
              {this._renderAddress()}
            </ScrollView>
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
    justifyContent: "center",
    alignItems: "center"
  },
  searchLead: {
    width: Dimensions.get('window').width - 50,
    height: 25,
    padding: 0,
    paddingLeft: 5,
    margin: 25,
    borderBottomWidth: 1,
  },
  saveButton: {
    width: 30,
    height: 30,
    marginRight: 5
  },
  buttonView: {
    alignItems: 'center',
    margin: 10,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 3
  },
  buttonText: {
    fontSize: 14,
    width: Dimensions.get('window').width - 60,
    color: 'white',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  textInput: {
    width: Dimensions.get('window').width / 3 * 2.5,
    height: 30,
    padding: 5,
    borderBottomWidth: 1,
    marginBottom: 10
  },
  cellView: {
    width: Dimensions.get('window').width - 20,
    height: 52,
    marginVertical: 3,
    backgroundColor: 'rgba(15,15,15,0.3)',
    borderColor: 'black',
    marginHorizontal: 10,
    borderRadius: 10,
  },

});

const mapStateToProps = (state) => {
  return { ...getIngredientSelector(state), ...getSystemSelector(state), ...getLeadSelector(state) }
}

const mapDispatchToProps = (dispatch) => ({
  fetchGetSystems: () => dispatch(getSystems()),
  fetchGetIngredients: () => dispatch(getIngredientList()),
  fetchGetLeadsList: () => dispatch(getLeadsList()),
  fetchGetOneSystem: (id) => dispatch(getSystem(id)),
  fetchGetLead: (id) => dispatch(getLead(id)),
  fetchGetState: () => dispatch(getState()),
  fetchUpdateLead: (lead) => dispatch(updateLead(lead)),
  fetchUpdatePerson: (person) => dispatch(updatePerson(person)),
  fetchUpdatePhone: (phone) => dispatch(updatePhone(phone)),
  fetchUpdateAddress: (address) => dispatch(updateAddress(address)),
  fetchAddPhone: (phone) => dispatch(addPhone(phone)),
  fetchAddAddress: (address) => dispatch(addAddress(address)),
  fetchUpdateDetail: (detail) => dispatch(updateLeadDetail(detail)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditLeadScreen); 
