import React, { Component, useLayoutEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Button,
  Animated,
  Platform,
  ActionSheetIOS  
} from 'react-native';

import SideMenu from 'react-native-side-menu';
import SystemMenu from '../../menus/SystemMenu';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getProjectSelector } from '../../reducers/projectReducer';
import { getSystemSelector } from '../../reducers/systemReducer'
import { getSystems, getSystem } from '../../actions/settings';
import { getProjects, getOneProjectDetail, updateLeadDetail, updatePerson, updateProject, uploadImage, getNoteList, addNote, updateNote } from '../../actions/lead';
import { connect } from 'react-redux';
import TextInput from 'react-native-textinput-with-icons'
import { Picker } from '@react-native-community/picker';
import ImagePicker from 'react-native-image-picker';

class EditEstimateScreen extends Component {
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
      noteOpen: false,
      imageOpen: false,
      addressOpen: false,
      addProjectDetailResult: false,
      projectId: '',
      firstName: '',
      lastName: '',
      designDate: '',
      installDate: '',
      completedDate: '',
      company: '',
      phoneNumber: '',
      phoneType: '',
      email: '',
      helpText: '',
      address: '',
      city: '',
      stateVal: 'france',
      systemValue: '',
      systemLabel: '',
      systemList: [],
      sqftEdit: false,
      addressList: [],
      leadDetailList: [],
      phoneList: [],
      statusList: [],
      oneSystem: {},
      projectStatus: 'estimate',
      projectDetails: [],
      address: {},
      note: '',
      noteId: '',
      isActive: true,
      project: {}
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
    this.personInfo = {
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      company: this.state.company,
      id: this.state.project.person.id
    }

    await this.props.fetchUpdatePerson(this.personInfo);

    this.updateProject = {}
    this.updateProject.id = this.state.project.id
    this.updateProject.projectstatus = this.state.projectStatus
    this.updateProject.designconsult = this.state.designDate
    this.updateProject.active = this.state.isActive
    if (this.status == "Current") {
      this.updateProject.install = this.state.installDate
    }
    if (this.status == "Complete") {
      this.updateProject.complete = this.state.completedDate
    }

    await this.props.fetchUpdateProject(this.updateProject);

    this.props.navigation.navigate("Estimate");
  }

  async componentDidMount() {
    this.setState({ isLoading: true })
    this.setState({ statusList: new Array('estimate', 'current', 'complete') })
    this.status = this.props.route.params.status;
    this.props.navigation.setOptions({
      title: "Edit " + this.status,
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

  async onSaveNote(isNew) {
    this.noteParam = {};
    this.noteParam.note = this.state.note;
    this.noteParam.projectid = this.state.project.id;
    if (isNew) {
      await this.props.fetchAddNote(this.noteParam);
    } else {
      this.noteParam.id = this.state.noteId;
      await this.props.fetchUpdateNote(this.noteParam);
    }
    this.setState({ project: this.props.projectsInfo.filter(x => x.id == this.state.project.id)[0] })
    this.setState({ note: '', noteId: '' })
  }

  initComponent = async () => {
    console.log("InitComponent")
    await this.props.fetchGetSystems();

    this.systemPickerData = [];
    this.props.systemsInfo.map(x => {
      this.systemPickerData.push({ label: x.name, value: x.name });
    })
    this.setState({ project: this.props.route.params.project });

    await this.props.fetchProjectDetail(this.state.project.id);
    await this.props.fetchGetNotes(this.state.project.id);
    this.setState({ project: this.props.projectsInfo.filter(x => x.id == this.state.project.id)[0] });

    this.setState({
      projectDetails: this.state.project.projectdetails,
      projectStatus: this.state.project.projectstatus,
      designDate: this.state.project.designconsult,
      firstName: this.state.project.person.firstname,
      lastName: this.state.project.person.lastname,
      company: this.state.project.person.company,
      installDate: this.state.project.install,
      completeDate: this.state.project.completed,
      isActive: this.state.project.active == '0' ? false : true,
      address: this.state.project.address
    });

    this.setState({ isLoading: false });
  }

  toggleSystem = () => {
    this.setState({
      systemOpen: !this.state.systemOpen,
    });
  }

  toggleNote = () => {
    this.setState({
      noteOpen: !this.state.noteOpen,
    });
  }

  toggleImage = () => {
    this.setState({
      imageOpen: !this.state.imageOpen,
    });

    let options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
        this.uploadImageData = {}
        this.uploadImageData.projectid = this.state.project.id
        this.uploadImageData.image = response.data;
        this.props.fetchUploadImage(this.uploadImageData)
        if (this.props.uploadImageSuccess) alert("Image uploaded successfully.")
        else alert("Image upload failed.")
      }
    });
  }

  _renderSystem = () => {
    if (this.state.systemOpen) {
      return (
        <View style={styles.container}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("EstimateSystem")} style={{ ...styles.buttonView, borderRadius: 10, backgroundColor: "rgba(51,222,30,0.8)", width: 120 }}>
              <Text style={{ ...styles.buttonText, width: 120 }}>New</Text>
            </TouchableOpacity>
          </View>
          {this.state.projectDetails != undefined && this.state.projectDetails.map((detail, index) =>
            (<View style={{ ...styles.cellView, backgroundColor: index % 2 == 1 ? 'rgba(55,55,55,0.1)' : 'rgba(50,162,235,0.4)' }} key={index}>
              <View style={{ flexDirection: "row", width: Dimensions.get('window').width - 10 }}>
                <TouchableOpacity style={{ marginLeft: 15, marginTop: 5, flexDirection: "row" }} onPress={() => this.props.navigation.navigate("EstimateSystem", { detail: detail, callBack: this.initComponent })}>
                  <View style={{ width: Dimensions.get('window').width - 55 }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 3 }}>{detail.name}</Text>
                    <Text style={{ fontSize: 12, marginTop: 3 }}>${detail.systemprice}</Text>
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

  _renderNote = () => {
    if (this.state.noteOpen) {
      return (
        <View style={styles.container}>
          <View>
            <TextInput
              style={styles.textInput}
              label="Note"
              onChangeText={text => this.setState({ note: text })}
              value={this.state.note}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => this.onSaveNote(true)} style={{ ...styles.buttonView, borderRadius: 10, backgroundColor: "rgba(51,222,30,0.8)", width: 120 }}>
              <Text style={{ ...styles.buttonText, width: 120 }}>New</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onSaveNote(false)} style={{ ...styles.buttonView, borderRadius: 10, backgroundColor: "rgba(51,222,30,0.8)", width: 120 }}>
              <Text style={{ ...styles.buttonText, width: 120 }}>Save</Text>
            </TouchableOpacity>
          </View>
          {this.state.project.notes != undefined && this.state.project.notes.map((note, index) =>
            (<View style={{ ...styles.cellView, height: 35, backgroundColor: index % 2 == 1 ? 'rgba(55,55,55,0.1)' : 'rgba(50,162,235,0.4)' }} key={index}>
              <View style={{ flexDirection: "row", width: Dimensions.get('window').width - 10 }}>
                <TouchableOpacity style={{ marginLeft: 15, marginTop: 5, flexDirection: "row" }} onPress={() => this.setState({ note: note.note, noteId: note.id })}>
                  <View style={{ width: Dimensions.get('window').width - 55 }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 3 }}>{note.note}</Text>
                  </View>
                  <View style={{ alignSelf: 'flex-end' }}>
                    <Icon style={{ marginTop: 3 }} name="angle-right" size={18} color="rgba(10,10,10,0.5)" solid />
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
        {
          this.state.isLoading ?
            <View style={styles.container}>

            </View>
            :
            <View style={styles.container}>
              <ScrollView>
                <View style={styles.container}>
                  <View style={{ marginTop: 30 }}>
                    <TextInput
                      style={styles.textInput}
                      label="First Name"
                      onChangeText={text => this.setState({ firstName: text })}
                      value={this.state.firstName}
                    />
                  </View>
                  <View>
                    <TextInput
                      style={styles.textInput}
                      label="Last Name"
                      onChangeText={text => this.setState({ lastName: text })}
                      value={this.state.lastName}
                    />
                  </View>
                  <View>
                    <TextInput
                      style={styles.textInput}
                      label="Design Date"
                      onChangeText={text => this.setState({ designDate: text })}
                      value={this.state.designDate}
                    />
                  </View>
                  {(this.status == "Current") &&
                    <View>7
                      <TextInput
                        style={styles.textInput}
                        label="Install Date"
                        onChangeText={text => this.setState({ installDate: text })}
                        value={this.state.installDate}
                      />
                    </View>
                  }
                  {(this.status == "Complete") &&
                    <View>
                      <TextInput
                        style={styles.textInput}
                        label="Completed Date"
                        onChangeText={text => this.setState({ completedDate: text })}
                        value={this.state.completedDate}
                      />
                    </View>
                  }
                  <View>
                    <TextInput
                      style={styles.textInput}
                      label="Company"
                      onChangeText={text => this.setState({ company: text })}
                      value={this.state.company}
                    />
                  </View>
                  <View style={{ marginTop: 5, flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={{}}>Active</Text>
                    <Switch style={{ marginLeft: 20, marginTop: -3 }} value={this.state.isActive} onValueChange={() => this.setState({ isActive: !this.state.isActive })}></Switch>
                  </View>
                  <View style={{ marginTop: 5, flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={{ marginTop: 10, marginRight: 15 }}>Status</Text>
                    {Platform.OS === 'ios' ?
                      <Button title={this.state.projectStatus == '' ? 'Not Selected' : this.state.projectStatus} onPress={() =>
                        ActionSheetIOS.showActionSheetWithOptions(
                          {
                            options: this.state.statusList
                          },
                          buttonIndex => this.setState({ projectStatus: this.state.statusList[buttonIndex] })
                        )
                      }>
                      </Button> :
                      <Picker
                        style={{
                          backgroundColor: 'rgba(30,30,30,0.3)',
                          height: 40,
                          padding: 0,
                          fontSize: 5,
                          marginLeft: 5,
                          width: Dimensions.get('window').width / 3 * 1.2,
                          borderRadius: 10
                        }}
                        textStyle={{ fontSize: 5 }}
                        selectedValue={this.state.projectStatus}
                        onValueChange={item => this.setState({ projectStatus: item })}
                      >
                        {this.state.statusList.map((oneState, index) =>
                          <Picker.Item key={index} label={oneState} value={oneState} />
                        )}
                      </Picker>}
                  </View>
                </View>
                <TouchableOpacity onPress={() => this.toggleNote()} style={{ ...styles.buttonView, backgroundColor: this.state.noteOpen ? "rgb(236,151,31)" : "rgb(51,122,183)" }}>
                  {this.state.noteOpen ? <Icon name="minus-circle" style={{ margin: 8 }} size={16} color="#ffffff" solid /> : <Icon name="plus-circle" style={{ margin: 8 }} size={16} color="#ffffff" solid />}
                  <Text style={{ ...styles.buttonText, marginLeft: -10 }}>Notes</Text>
                </TouchableOpacity>
                {this._renderNote()}
                <TouchableOpacity onPress={() => this.toggleSystem()} style={{ ...styles.buttonView, backgroundColor: this.state.systemOpen ? "rgb(236,151,31)" : "rgb(51,122,183)" }}>
                  {this.state.systemOpen ? <Icon name="minus-circle" style={{ margin: 8 }} size={16} color="#ffffff" solid /> : <Icon name="plus-circle" style={{ margin: 8 }} size={16} color="#ffffff" solid />}
                  <Text style={{ ...styles.buttonText, marginLeft: -10 }}>Systems</Text>
                </TouchableOpacity>
                {this._renderSystem()}
                <TouchableOpacity onPress={() => this.toggleImage()} style={{ ...styles.buttonView, backgroundColor: "rgb(51,122,183)", borderRadius: 10 }}>
                  <Text style={{ ...styles.buttonText, marginLeft: 20 }}>Image</Text>
                </TouchableOpacity>
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
  return { ...getProjectSelector(state), ...getSystemSelector(state) };
}

const mapDispatchToProps = (dispatch) => ({
  fetchGetSystems: () => dispatch(getSystems()),
  fetchGetOneSystem: (id) => dispatch(getSystem(id)),
  fetchProject: () => dispatch(getProjects()),
  fetchProjectDetail: (id) => dispatch(getOneProjectDetail(id)),
  fetchUpdateProject: (project) => dispatch(updateProject(project)),
  fetchUpdatePerson: (person) => dispatch(updatePerson(person)),
  fetchUploadImage: (param) => dispatch(uploadImage(param)),
  fetchGetNotes: (id) => dispatch(getNoteList(id)),
  fetchAddNote: (param) => dispatch(addNote(param)),
  fetchUpdateNote: (param) => dispatch(updateNote(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditEstimateScreen); 
