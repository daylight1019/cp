import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  Animated,
  Platform,
  ActionSheetIOS,
  TextInput as ClassicTextInput
} from 'react-native';

import SideMenu from 'react-native-side-menu';
import SystemMenu from '../../menus/SystemMenu';

import { connect } from 'react-redux';
import { getIngredientSelector } from '../../reducers/ingredientReducer'
import { getIngredientList, getColors, getPatterns } from '../../actions/settings';
import { getProjectSelector } from '../../reducers/projectReducer';
import { getSystemSelector } from '../../reducers/systemReducer';
import { getColorSelector } from '../../reducers/colorReducer';
import { getPatternSelector } from '../../reducers/patternReducer';
import { getSystems, getSystem } from '../../actions/settings';
import { addProjectDetail, updateProjectDetail } from '../../actions/lead';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Picker } from '@react-native-community/picker';
import TextInput from 'react-native-textinput-with-icons'

class EstimateSystemScreen extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'About',
      error: false,
      isLoading: false,
      ingredientOpen: true,
      searchText: '',
      itemsState: [],
      checkState: [],
      unitList: [],
      extraList: [],
      colorsList: [[]],
      patternsList: [[]],
      systemPickerData: [],
      oneSystem: {},
      systemValue: '',
      salePrice: '',
      selectedColors: [],
      selectedPatterns: [],
      selectedSystem: '',
      sqftEdit: false,
      isEditMode: true
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
    if (this.props.route.params.detail == undefined) {
      this.setState({ isEditMode: false })
      this.detail = {}
      this.detail.projectid = this.props.route.params.projectid
      this.detail.name = ''
      this.detail.areawidth = ''
      this.detail.arealength = ''
      this.detail.projectdetailstyles = []
      this.props.navigation.setOptions({
        title: "New Estimate System",
        headerRight: (props) => (
          <TouchableOpacity activeOpacity={.5} onPress={() => this.onSave()} >
            <Icon name="save" style={{ marginRight: 12 }} size={18} color="#ffffff" solid />
          </TouchableOpacity>
        )
      });
    } else {
      this.detail = this.props.route.params.detail;
      this.props.navigation.setOptions({
        title: "Edit Estimate System",
        headerRight: (props) => (
          <TouchableOpacity activeOpacity={.5} onPress={() => this.onSave()} >
            <Icon name="save" style={{ marginRight: 12 }} size={18} color="#ffffff" solid />
          </TouchableOpacity>
        )
      });
    }
    console.log("Detail", JSON.stringify(this.detail))
    this.loadData();
  }

  async loadData() {
    console.log(this.detail.systemid)
    this.props.fetchGetColors();
    this.props.fetchGetPatterns();
    this.props.fetchGetSystem();
    if (this.detail.systemid == undefined) this.detail.systemid = this.props.systemsInfo[0].id
    this.props.fetchGetOneSystem(this.detail.systemid);
    
    await this.props.fetchGetIngredient();

    this.systemList = this.props.systemsInfo;
    this.systemList.map(x => {
      this.setState({ systemPickerData: this.state.systemPickerData.concat({ label: x.name, value: x.id }) })
    })
    await this.loadIngredientBySystem(this.detail.systemid)

    this.setState({
      areaName: this.detail.name,
      systemPrice: this.detail.saleprice,
      salePrice: this.detail.saleprice,
      widthFt: this.detail.areawidth.toString(),
      lengthFt: this.detail.arealength.toString()
    })
  }

  loadIngredientBySystem = async (systemId) => {
    await this.props.fetchGetOneSystem(systemId);
    var selSystem = this.props.systemsInfo.filter(x => x.id == systemId);
    this.system = selSystem[0];
    this.setState({
      systemName: this.system.name,
      salePrice: this.system.saleprice.toString(),
      oneSystem: this.system
    });

    const tempItemState = new Array(this.props.ingredientsInfo.length).fill([]);
    const tempCheckState = new Array(this.props.ingredientsInfo.length).fill([]);
    const tempUnitList = new Array(this.props.ingredientsInfo.length).fill([]);
    const tempExtraList = new Array(this.props.ingredientsInfo.length).fill([]);
    const tempColorsList = new Array(this.props.ingredientsInfo.length).fill([]);
    const tempPatternsList = new Array(this.props.ingredientsInfo.length).fill([]);
    const tempSelectedColorList = new Array(this.props.ingredientsInfo.length).fill('');
    const tempSelectedPatternList = new Array(this.props.ingredientsInfo.length).fill('');
    
    if (this.system.ingredients != undefined) {
      this.system.ingredients.map((x, i) => {
        this.props.ingredientsInfo.map((y, j) => {
          if (x.ingredientid == y.id) {
            tempItemState[j] = true;
            tempCheckState[j] = true;
            tempUnitList[j] = x.factor == undefined ? '' : x.factor.toString();
            tempExtraList[j] = x.extra;
            tempColorsList[j] = this.props.colorsInfo.filter(t => (y.color.filter(r => t.id == r.colorid).length > 0));
            tempPatternsList[j] = this.props.patternsInfo.filter(t => (y.pattern.filter(r => t.id == r.patternid).length > 0));
            tempSelectedColorList[j] = this.detail.projectdetailstyles.filter(t => t.ingredientid == x.ingredientid);
            if (tempSelectedColorList[j].length == 0) tempSelectedColorList[j] = '';
            else tempSelectedColorList[j] = tempSelectedColorList[j][0].colorid;
            tempSelectedPatternList[j] = this.detail.projectdetailstyles.filter(t => t.ingredientid == x.ingredientid);
            if (tempSelectedPatternList[j].length == 0) tempSelectedPatternList[j] = '';
            else tempSelectedPatternList[j] = tempSelectedPatternList[j][0].patternid
          }
        })
      })
    }
    
    this.setState({
      itemsState: tempItemState,
      checkState: tempCheckState,
      unitList: tempUnitList,
      extraList: tempExtraList,
      selectedColors: tempSelectedColorList,
      selectedPatterns: tempSelectedPatternList,
      systemValue: this.system.id
    });

    const tempColorsList1 = [];
    tempColorsList.map((oneColors, i1) => {
      var newColors = [];
      oneColors.map((x, i2) => {
        newColors.push({ label: x.name, value: x.id })
      })
      tempColorsList1.push(newColors);
    })

    const tempPatternsList1 = [];
    tempPatternsList.map((onePatterns, i1) => {
      var newPatterns = [];
      onePatterns.map((x, i2) => {
        newPatterns.push({ label: x.name, value: x.id })
      })
      tempPatternsList1.push(newPatterns);
    })

    this.setState({
      colorsList: tempColorsList1,
      patternsList: tempPatternsList1
    });

    this.ingredientCount = 0;
    this.setState({ isLoading: false })
  }

  onChangeSystem = async (item) => {
    this.setState({
      systemValue: item
    });
    await this.props.fetchGetOneSystem(this.state.systemValue);
    let selectedSystem = this.props.systemsInfo.filter(x => x.id == this.state.systemValue);
    this.setState({
      oneSystem: selectedSystem[0],
      salePrice: selectedSystem[0].saleprice
    });
    this.loadIngredientBySystem(this.state.systemValue)
  }

  onSave = async () => {
    this.projectDetail = {};
    if (this.state.isEditMode) this.projectDetail.id = this.detail.id;
    this.projectDetail.projectid = this.detail.projectid;
    this.projectDetail.systemid = this.state.systemValue;
    this.projectDetail.areaprice = this.state.salePrice;
    this.projectDetail.area = parseInt(this.state.widthFt) * parseInt(this.state.lengthFt);
    this.projectDetail.areawidth = parseInt(this.state.widthFt);
    this.projectDetail.arealength = parseInt(this.state.lengthFt);
    this.projectDetail.name = this.state.areaName;
    this.projectDetail.systemprice = parseInt(this.state.widthFt) * parseInt(this.state.lengthFt) * parseInt(this.state.salePrice);
    this.projectDetail.saleprice = this.state.salePrice;
    this.projectDetail.projectdetailstyles = [];
    for (var i = 0; i < this.props.ingredientsInfo.length; i++) {
      if (this.state.selectedColors[i] != '' || this.state.selectedPatterns[i] != '') {
        var oneIngrdient = this.props.ingredientsInfo[i]
        var oneDetailStyle = {}
        oneDetailStyle.ingredientid = oneIngrdient.id;
        if (this.state.selectedColors[i] != '') oneDetailStyle.colorid = this.state.selectedColors[i]
        if (this.state.selectedPatterns[i] != '') oneDetailStyle.patternid = this.state.selectedPatterns[i]
        oneDetailStyle.purchaseprice = oneIngrdient.purchaseprice
        oneDetailStyle.chargeprice = oneIngrdient.purchaseprice
        this.projectDetail.projectdetailstyles.push(oneDetailStyle)
      }
    }
    console.log("Project Detail", JSON.stringify(this.projectDetail));

    if (this.state.isEditMode)
      await this.props.fetchUpdateProjectDetail(this.projectDetail);
    else
      await this.props.fetchAddProjectDetail(this.projectDetail);

    console.log(JSON.stringify(this.props.route.params))
    this.callBackFn = this.props.route.params.callBack;
    this.callBackFn();
    this.props.navigation.navigate('EditEstimate');
  }

  _renderIngredient = () => {
    if (this.state.ingredientOpen) {
      return (
        <View style={{ marginBottom: 10 }}>
          {(this.props.ingredientsInfo.length > 0) && (
            this.props.ingredientsInfo.map((ingredient, index) => (
              (this.state.itemsState[index] == true) &&
              <View style={{ ...styles.cellView, height: this.state.extraList[index].length > 50 ? 133 : 120, backgroundColor: 'rgba(50,162,235,0.4)' }} key={index}>
                <View style={{ flexDirection: "row", width: Dimensions.get('window').width - 10 }}>
                  <View>
                    <View style={{ marginLeft: 15, marginTop: 7, width: Dimensions.get('window').width - 90 }}>
                      <Text style={{ fontSize: 12, fontWeight: 'bold', width: Dimensions.get('window').width, marginTop: 3 }}>{ingredient.name}</Text>
                      <View style={{ flexDirection: 'row', height: this.state.extraList[index].length > 50 ? 28 : 15 }}>
                        <Text style={{ fontSize: 11 }}>Extra:</Text>
                        <View style={styles.smallTextInput}>
                          <Text style={{ fontSize: 11 }}>{this.state.extraList[index]}</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', marginTop: 0, height: 15 }}>
                        <Text style={{ fontSize: 11, marginTop: 0 }}>Price: ${ingredient.purchaseprice}</Text>
                        <Text style={{ fontSize: 11, marginLeft: 20 }}>Units: </Text>
                        <View style={styles.smallTextInput}>
                          <Text style={{ fontSize: 11 }}>{this.state.unitList[index]}</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', marginTop: 5, height: 25, zIndex: 2000 }}>
                        <Text style={{ fontSize: 11, marginTop: 2 }}>Color: </Text>

                        {Platform.OS === 'ios' ?
                          <TouchableOpacity onPress={() =>
                            ActionSheetIOS.showActionSheetWithOptions(
                              {
                                options: this.state.colorsList[index].map((x, i) => x.label)
                              },
                              buttonIndex => this.setState({ selectedColors: this.state.selectedColors.map((x, i) => i == index ? this.state.colorsList[index][buttonIndex].value : x) })
                            )
                          } >
                            {this.state.selectedColors[index] == '' || this.state.selectedColors[index] == null ?
                              <Text style={{ fontSize: 12, color: 'rgb(57,154,253)' }}>Not Selected</Text>
                              : <Text style={{ fontSize: 12, color: 'rgb(57,154,253)' }}>{this.state.colorsList[index].filter(x => x.value == this.state.selectedColors[index])[0].label}</Text>}
                          </TouchableOpacity> :
                          <Picker
                            style={{
                              backgroundColor: '#fafafa',
                              height: 20,
                              padding: 0,
                              fontSize: 5,
                              marginLeft: 5,
                              width: Dimensions.get('window').width / 3 * 1.2,
                              borderRadius: 10
                            }}
                            textStyle={{ fontSize: 5 }}
                            selectedValue={this.state.selectedColors[index]}
                            onValueChange={item => this.setState({ selectedColors: this.state.selectedColors.map((x, i) => i == index ? item : x) })}
                          >
                            {this.state.colorsList[index] != undefined &&
                              this.state.colorsList[index].map((x, i) =>
                                <Picker.Item key={i} label={x.label} value={x.value} />
                              )}
                          </Picker>}
                      </View>
                      <View style={{ flexDirection: 'row', marginTop: 0, height: 25 }}>
                        <Text style={{ fontSize: 11, marginTop: 2 }}>Pattern: </Text>
                        {Platform.OS === 'ios' ?
                          <TouchableOpacity onPress={() =>
                            ActionSheetIOS.showActionSheetWithOptions(
                              {
                                options: this.state.patternsList[index].map((x, i) => x.label)
                              },
                              buttonIndex => this.setState({ selectedPatterns: this.state.selectedPatterns.map((x, i) => i == index ? this.state.patternsList[index][buttonIndex].value : x) })
                            )
                          } >
                            {this.state.selectedPatterns[index] == '' || this.state.selectedPatterns[index] == null ?
                              <Text style={{ fontSize: 12, color: 'rgb(57,154,253)' }}>Not Selected</Text>
                              : <Text style={{ fontSize: 12, color: 'rgb(57,154,253)' }}>{this.state.patternsList[index].filter(x => x.value == this.state.selectedPatterns[index])[0].label}</Text>}
                          </TouchableOpacity> :
                          <Picker
                            style={{
                              backgroundColor: '#fafafa',
                              height: 20,
                              padding: 0,
                              fontSize: 11,
                              marginLeft: 5,
                              width: Dimensions.get('window').width / 3 * 1.2,
                              zIndex: 10,
                              borderRadius: 10
                            }}
                            labelStyle={{
                              fontSize: 11
                            }}
                            selectedValue={this.state.selectedPatterns[index]}
                            onValueChange={item => this.setState({ selectedPatterns: this.state.selectedPatterns.map((x, i) => i == index ? item : x) })}
                          >
                            {this.state.patternsList[index] != undefined &&
                              this.state.patternsList[index].map((x, i) =>
                                <Picker.Item key={i} label={x.label} value={x.value} />
                              )}
                          </Picker>}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))
          )
          }
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

            <View style={{ marginTop: 10 }}>
              <TextInput
                style={styles.textInput}
                label="Area Name"
                onChangeText={text => this.setState({ areaName: text })}
                value={this.state.areaName}
              />
            </View>
            <View>
              <TextInput
                style={styles.textInput}
                label="Length ft."
                keyboardType={'numeric'}
                onChangeText={text => this.setState({ lengthFt: text })}
                value={this.state.lengthFt}
              />
            </View>
            <View>
              <TextInput
                style={styles.textInput}
                label="Width ft."
                keyboardType={'numeric'}
                onChangeText={text => this.setState({ widthFt: text })}
                value={this.state.widthFt}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
              <Text>System: </Text>
              {Platform.OS === 'ios' ?
                <Button title={this.state.systemValue == '' || this.state.systemValue == undefined ? 'Not Selected' : this.state.systemPickerData.filter(x => x.value == this.state.systemValue)[0].label.substr(0, 30)} onPress={() =>
                  ActionSheetIOS.showActionSheetWithOptions(
                    {
                      options: this.state.systemPickerData.map(x => x.label)
                    },
                    buttonIndex => this.onChangeSystem(this.state.systemPickerData[buttonIndex].value)
                  )
                }>
                </Button> :
                <Picker
                  containerStyle={{ height: 40 }}
                  style={{
                    backgroundColor: 'rgba(30,30,30,0.3)',
                    height: 40,
                    padding: 0,
                    fontSize: 11,
                    marginLeft: 5,
                    width: Dimensions.get('window').width / 3 * 1.8,
                    borderRadius: 10
                  }}
                  selectedValue={this.state.systemValue}
                  onValueChange={item => this.onChangeSystem(item)}
                >
                  {this.state.systemPickerData != undefined &&
                    this.state.systemPickerData.map((x, i) =>
                      <Picker.Item key={i} label={x.label} value={x.value} />
                    )}
                </Picker>}
            </View>

            {this.state.salePrice != undefined &&
              (<View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", paddingVertical: 5, borderColor: 'rgba(50,162,235,0.8)', marginTop: 10, width: Dimensions.get('window').width - 30, borderStyle: 'dotted', borderWidth: 1 }}>
                <Text style={{ fontSize: 12 }}>Coverage: {this.state.widthFt == '' || this.state.lengthFt == '' ? 0 : parseInt(this.state.widthFt) * parseInt(this.state.lengthFt)}.     </Text>
                {this.state.sqftEdit == false ?
                  (
                    <TouchableOpacity onPress={() => this.setState({ sqftEdit: true })}>
                      <Text style={{ fontSize: 12, borderBottomColor: 'rgba(50,162,235,1)', borderBottomWidth: 1, marginRight: 10 }} >${this.state.oneSystem.saleprice == undefined ? 0 : this.state.salePrice} / sqft</Text>
                    </TouchableOpacity>
                  )
                  :
                  (
                    <View style={{ flexDirection: 'row' }}>
                      <ClassicTextInput
                        style={{ width: 50, padding: 0, paddingLeft: 5, borderBottomWidth: 1 }}
                        value={this.state.salePrice}
                        onChangeText={text => this.setState({ salePrice: text })}
                      />
                      <TouchableOpacity style={{ width: 35, height: 20, marginTop: 5, borderRadius: 3, marginLeft: 5, marginRight: 10, backgroundColor: "rgba(51,222,30,0.8)" }} onPress={() => this.setState({ sqftEdit: false })} ><Text style={{ marginLeft: 8 }}>OK</Text></TouchableOpacity>
                    </View>
                  )
                }
                <Text style={{ fontSize: 12 }}>System Price: ${this.state.widthFt == '' || this.state.lengthFt == '' ? 0 : parseFloat(parseInt(this.state.salePrice) * parseInt(this.state.widthFt) * parseInt(this.state.lengthFt)).toFixed(2)}</Text>
              </View>)}
            <View style={{ height: 5 }}></View>
            <ScrollView>
              {this._renderIngredient()}
              <View style={{ height: 5 }}></View>
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
  return { ...getSystemSelector(state), ...getColorSelector(state), ...getPatternSelector(state), ...getProjectSelector(state), ...getIngredientSelector(state) };
}

const mapDispatchToProps = (dispatch) => ({
  fetchGetIngredient: () => dispatch(getIngredientList()),
  fetchGetSystem: () => dispatch(getSystems()),
  fetchGetColors: () => dispatch(getColors()),
  fetchGetPatterns: () => dispatch(getPatterns()),
  fetchGetOneSystem: (id) => dispatch(getSystem(id)),
  fetchAddProjectDetail: (param) => dispatch(addProjectDetail(param)),
  fetchUpdateProjectDetail: (param) => dispatch(updateProjectDetail(param))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EstimateSystemScreen); 
