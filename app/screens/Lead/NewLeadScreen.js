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
  Animated
} from 'react-native';

import { HeaderBackButton } from '@react-navigation/stack';
import SideMenu from 'react-native-side-menu';
import SystemMenu from '../../menus/SystemMenu';
import TabNavigator from 'react-native-tab-navigator';

import { ScrollView } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/FontAwesome5';
import DropDownPicker from 'react-native-dropdown-picker';

import { getIngredientSelector } from '../../reducers/ingredientReducer'
import { getSystemSelector } from '../../reducers/systemReducer'
import { getLeadSelector } from '../../reducers/leadReducer'
import { getIngredientList, getSystems, getSystem } from '../../actions/settings';
import { getLeadsList, getLead, addAddress, addLeadDetail, addPerson, addPhone, addLead, addProject, addProjectDetail } from '../../actions/lead';
import { connect } from 'react-redux';

class NewLeadScreen extends Component {
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
      systemOpen: false,
      detailOpen: false,
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
      callTime: '',
      aboutUs: '',
      helpText: '',
      address: '',
      city: '',
      stateVal: '',
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
      oneSystem: {}
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

    this.newleadInfo = {
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      company: this.state.company,
      personid: this.personId
    }
    await this.props.fetchAddLead(this.newleadInfo);

    console.log("Leads Info=====", JSON.stringify(this.props.leadsInfo));

    this.personId = this.props.leadsInfo[this.props.leadsInfo.length - 1].person.id;

    this.leadId = this.props.leadsInfo[this.props.leadsInfo.length - 1].person.leadid;

    console.log("Add Result Person===", JSON.stringify(this.props.leadsInfo[this.props.leadsInfo.length - 1]));

    this.phoneInfo = {
      personid: this.personId,
      number: this.state.phoneNumber,
      type: this.state.phoneType,
      primary: 1
    }
    await this.props.fetchAddPhone(this.phoneInfo);
    this.detailInfo = {
      leadid: this.leadId,
      email: this.state.email,
      besttimetocall: this.state.callTime,
      hearaboutus: this.state.aboutUs,
      howcanwehelp: this.state.helpText
    }
    await this.props.fetchAddDetail(this.detailInfo);

    this.addressInfo = {
      personid: this.personId,
      address1: this.state.address,
      address2: '',
      city: this.state.city,
      state: this.state.stateVal,
      zip: this.state.zip,
      primary: 1
    }
    await this.props.fetchAddAddress(this.addressInfo);
    await this.props.fetchAddProject(this.detailInfo);

    this.projectId = this.props.projectId;

    this.projectDetailInfo = {
      projectid: this.projectId,
      projectdetails: []
    }

    this.state.systemList.map(system => {
      let thisSystem = {
        systemid: system.systemValue,
        areaprice: this.state.salePrice,
        area: parseInt(system.lengthFt) * parseInt(system.widthFt),
        name: system.areaName,
        areawidth: system.widthFt,
        arealength: system.lengthFt,
        salesprice: this.state.salePrice,
        systemprice: parseInt(system.lengthFt) * parseInt(system.widthFt) * parseFloat(this.state.salePrice),
        projectdetailstyles:[]
      }
      this.projectDetailInfo.projectdetails.push(thisSystem);
    })
    
    await this.props.fetchAddProjectDetail(this.projectDetailInfo);

    console.log("Lead", JSON.stringify(this.newleadInfo));
    console.log("Phone", JSON.stringify(this.phoneInfo));
    console.log("Detail", JSON.stringify(this.detailInfo));
    console.log("Address", JSON.stringify(this.addressInfo));
    console.log("Project Id", JSON.stringify(this.projectId));
    console.log("Project Detail", JSON.stringify(this.projectDetailInfo));
    alert("Saved Successfully");
    this.props.navigation.navigate("ActiveLeads");
  }

  async componentDidMount() {
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
  }

  toggleSystem = () => {
    this.setState({
      systemOpen: !this.state.systemOpen,
    });
  }

  toggleDetail = () => {
    this.setState({
      detailOpen: !this.state.detailOpen,
    });
  }

  toggleAddress = () => {
    this.setState({
      addressOpen: !this.state.addressOpen,
    });
  }

  addSystem = () => {
    if (this.state.areaName == "" || this.state.lengthFt == "" || this.state.widthFt == "" || this.state.systemValue == "") {
      alert("Insert Correct Values");
      return;
    }
    var tempSystemList = this.state.systemList.concat();
    var newSystem = {};
    newSystem.areaName = this.state.areaName;
    newSystem.lengthFt = this.state.lengthFt;
    newSystem.widthFt = this.state.widthFt;
    newSystem.systemValue = this.state.systemValue;
    tempSystemList.push(newSystem);
    this.setState({ systemList: tempSystemList });
    this.setState({
      areaName: '',
      lengthFt: '',
      widthFt: ''
    })
  }

  onChangeSystem = async (item) => {
    this.setState({
      systemValue: item.value,
      systemLabel: item.label
    });
    await this.props.fetchGetOneSystem(this.state.systemValue);
    let selectedSystem = this.props.systemsInfo.filter(x => x.id == this.state.systemValue);
    this.setState({
      oneSystem: selectedSystem[0],
      salePrice: selectedSystem[0].saleprice
    });
  }

  _renderSystem = () => {
    if (this.state.systemOpen) {
      return (
        <ScrollView>
          <View style={styles.container}>
            <View>
              <TextInput
                style={styles.textInput}
                placeholder="Note"
                onChangeText={text => this.setState({ note: text })}
                defaultValue={this.state.note}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <TextInput
                style={styles.textInput}
                placeholder="Area Name"
                onChangeText={text => this.setState({ areaName: text })}
                value={this.state.areaName}
              />
            </View>
            <View>
              <TextInput
                style={styles.textInput}
                placeholder="Length ft."
                keyboardType={'numeric'}
                onChangeText={text => this.setState({ lengthFt: text })}
                value={this.state.lengthFt}
              />
            </View>
            <View>
              <TextInput
                style={styles.textInput}
                placeholder="Width ft."
                keyboardType={'numeric'}
                onChangeText={text => this.setState({ widthFt: text })}
                value={this.state.widthFt}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
              <Text>System</Text>
              <DropDownPicker
                items={this.systemPickerData}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: '#fafafa', marginLeft: 10, width: Dimensions.get('window').width / 3 * 1.8, zIndex: 10 }}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={item => this.onChangeSystem(item)}
              />
            </View>
            {this.state.oneSystem.saleprice != undefined &&
              (<View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", paddingVertical: 5, borderColor: 'rgba(50,162,235,0.8)', marginTop: 10, width: Dimensions.get('window').width - 30, borderStyle: 'dotted', borderWidth: 1 }}>
                <Text style={{ fontSize: 12 }}>Coverage: {this.state.widthFt == '' || this.state.lengthFt == '' ? 0 : parseInt(this.state.widthFt) * parseInt(this.state.lengthFt)}.     </Text>
                {this.state.sqftEdit == false ?
                  (
                    <TouchableOpacity onPress={() => this.setState({ sqftEdit: true })}>
                      <Text style={{ fontSize: 12, borderBottomColor: 'rgba(50,162,235,1)', borderBottomWidth: 1, marginRight: 10 }} >${this.state.oneSystem.saleprice == undefined ? 0 : this.state.oneSystem.saleprice} / sqft</Text>
                    </TouchableOpacity>
                  )
                  :
                  (
                    <View style={{ flexDirection: 'row' }}>
                      <TextInput style={{ width: 50, padding: 0, paddingLeft: 5, borderBottomWidth: 1 }} value={this.state.salePrice} onChangeText={text => this.setState({ salePrice: text })}></TextInput>
                      <TouchableOpacity style={{ width: 35, height: 20, marginTop: 5, borderRadius: 3, marginLeft: 5, marginRight: 10, backgroundColor: "rgba(51,222,30,0.8)" }} onPress={() => this.setState({ sqftEdit: false })} ><Text style={{ marginLeft: 8 }}>OK</Text></TouchableOpacity>
                    </View>
                  )
                }
                <Text style={{ fontSize: 12 }}>System Price: ${this.state.widthFt == '' || this.state.lengthFt == '' ? 0 : parseFloat(this.state.oneSystem.saleprice * parseInt(this.state.widthFt) * parseInt(this.state.lengthFt)).toFixed(2)}</Text>
              </View>)}
            <View style={{ ...styles.buttonContainer }}>
              <TouchableOpacity style={{ ...styles.buttonView, width: 200, borderRadius: 10, backgroundColor: "rgba(51,222,30,0.8)" }} onPress={() => this.addSystem()}>
                <Text style={{ ...styles.buttonText, width: 200, }}>Add System</Text>
              </TouchableOpacity>
            </View>
            {this.state.systemList.map((system, index) =>
              (<View style={{ ...styles.cellView, backgroundColor: index % 2 == 0 ? 'rgba(55,55,55,0.1)' : 'rgba(50,162,235,0.4)' }} key={index}>
                <View style={{ flexDirection: "row", width: Dimensions.get('window').width - 10 }}>
                  <TouchableOpacity style={{ marginLeft: 10, marginTop: 5, flexDirection: "row" }}>
                    <View style={{ width: Dimensions.get('window').width - 50 }}>
                      <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 3 }}>{system.areaName}</Text>
                    </View>
                    <View style={{ alignSelf: 'flex-end' }}>
                      <Icon style={{ marginTop: 3 }} name="angle-right" size={18} color="rgba(10,10,10,0.5)" solid />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>)
            )}
          </View>
        </ScrollView>
      );
    }
  }

  _renderDetail = () => {
    if (this.state.detailOpen) {
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
            <DropDownPicker
              items={[
                { label: 'cell', value: 'cell' },
                { label: 'home', value: 'home' },
                { label: 'office', value: 'office' }
              ]}
              defaultValue={'cell'}
              containerStyle={{ height: 40 }}
              style={{ backgroundColor: '#fafafa', marginLeft: 10, width: Dimensions.get('window').width / 3 * 1.7 }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={item => this.setState({
                phoneType: item.value
              })}
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
            <DropDownPicker
              items={[
                { label: 'Morning', value: 'morning' },
                { label: 'Afternoon', value: 'afternoon' },
                { label: 'Evening', value: 'evening' }
              ]}
              defaultValue={'morning'}
              containerStyle={{ height: 40 }}
              style={{ backgroundColor: '#fafafa', marginLeft: 10, width: Dimensions.get('window').width / 3 * 1.5 }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={item => this.setState({
                callTime: item.value
              })}
            />
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
            <DropDownPicker
              items={[
                { label: 'UK', value: 'uk' },
                { label: 'France', value: 'france' }
              ]}
              defaultValue={'uk'}
              containerStyle={{ height: 40 }}
              style={{ backgroundColor: '#fafafa', marginLeft: 10, width: Dimensions.get('window').width / 3 * 1.7 }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={item => this.setState({
                stateVal: item.value
              })}
            />
          </View>
          <View>
            <TextInput
              style={styles.textInput}
              placeholder="Zip"
              onChangeText={text => this.setState({ zip: text })}
              defaultValue={this.state.zip}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
            <Text>Type</Text>
            <DropDownPicker
              items={[
                { label: 'Home', value: 'home' },
                { label: 'Office', value: 'office' },
                { label: 'Billing', value: 'billing' },
                { label: 'Main', value: 'main' }
              ]}
              defaultValue={'home'}
              containerStyle={{ height: 40 }}
              style={{ backgroundColor: '#fafafa', marginLeft: 10, width: Dimensions.get('window').width / 3 * 1.7 }}
              itemStyle={{
                justifyContent: 'flex-start'
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onChangeItem={item => this.setState({
                phoneType: item.value
              })}
            />
          </View>
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
              <View>
                <TextInput
                  style={styles.textInput}
                  placeholder="Design Date"
                  onChangeText={text => this.setState({ designDate: text })}
                  defaultValue={this.state.email}
                />
              </View>
              <View>
                <TextInput
                  style={styles.textInput}
                  placeholder="Company"
                  onChangeText={text => this.setState({ company: text })}
                  defaultValue={this.state.email}
                />
              </View>
            </View>
            <TouchableOpacity onPress={() => this.toggleSystem()} style={{ ...styles.buttonView, backgroundColor: this.state.systemOpen ? "rgb(236,151,31)" : "rgb(51,122,183)" }}>
              {this.state.systemOpen ? <Icon name="minus-circle" style={{ margin: 8, height: 35 }} size={16} color="#ffffff" solid /> : <Icon name="plus-circle" style={{ margin: 8, height: 35 }} size={16} color="#ffffff" solid />}
              <Text style={styles.buttonText}>Systems</Text>
            </TouchableOpacity>
            {this._renderSystem()}
            <TouchableOpacity onPress={() => this.toggleDetail()} style={{ ...styles.buttonView, backgroundColor: this.state.detailOpen ? "rgb(236,151,31)" : "rgb(51,122,183)" }}>
              {this.state.detailOpen ? <Icon name="minus-circle" style={{ margin: 8, height: 35 }} size={16} color="#ffffff" solid /> : <Icon name="plus-circle" style={{ margin: 8, height: 35 }} size={16} color="#ffffff" solid />}
              <Text style={styles.buttonText}>Detail</Text>
            </TouchableOpacity>
            {this._renderDetail()}
            <TouchableOpacity onPress={() => this.toggleAddress()} style={{ ...styles.buttonView, backgroundColor: this.state.addressOpen ? "rgb(236,151,31)" : "rgb(51,122,183)" }}>
              {this.state.addressOpen ? <Icon name="minus-circle" style={{ margin: 8, height: 35 }} size={16} color="#ffffff" solid /> : <Icon name="plus-circle" style={{ margin: 8, height: 35 }} size={16} color="#ffffff" solid />}
              <Text style={styles.buttonText}>Address</Text>
            </TouchableOpacity>
            {this._renderAddress()}
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
    margin: 10,
    height: 35,
    flexDirection: 'row',
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
    height: 36,
    marginVertical: 3,
    backgroundColor: 'rgba(15,15,15,0.3)',
    borderColor: 'black',
    marginHorizontal: 10,
    borderRadius: 10
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
  fetchAddLead: (lead) => dispatch(addLead(lead)),
  fetchAddProject: (lead) => dispatch(addProject(lead)),
  fetchAddProjectDetail: (project) => dispatch(addProjectDetail(project)),
  fetchAddPerson: (person) => dispatch(addPerson(person)),
  fetchAddPhone: (phone) => dispatch(addPhone(phone)),
  fetchAddAddress: (address) => dispatch(addAddress(address)),
  fetchAddDetail: (detail) => dispatch(addLeadDetail(detail)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewLeadScreen); 
