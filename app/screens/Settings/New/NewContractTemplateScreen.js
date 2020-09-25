import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
	CheckBox
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class NewContractTemplateScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
			firstName: '',
			lastName: '',
      email: '',
			pwd: '',
			confirmPwd: '',
      agreeTerm: false,
      photo: null
    }
  }

  componentDidMount() {
    this.props.navigation.setOptions({
			headerRight: (props)=> (
				<TouchableOpacity activeOpacity = { .5 } onPress={ ()=>alert('Add New Contract Template') } style = {styles.saveButton}>
					<Text>Save</Text>
				</TouchableOpacity>
			)
		});
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response });
      }
    });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View>
            <TouchableOpacity style = {styles.imageView} onPress = {()=>this.handleChoosePhoto()}>

            </TouchableOpacity>
          </View>
          <View>
            <Text>Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Name"
              onChangeText={text => this.setState({firstName:text})}
              defaultValue={this.state.firstName}
            />
          </View>
          <View>
            <Text>Node to customer</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Node to customer"
              onChangeText={text => this.setState({lastName:text})}
              defaultValue={this.state.lastName}
            />
          </View>
          <View>
            <Text>Scope of work</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Scope of work"
              onChangeText={text => this.setState({email:text})}
              defaultValue={this.state.email}
            />
          </View>
          <View>
            <Text>Common conditions to be aware of</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Common conditions to be aware of"
              onChangeText={text => this.setState({pwd:text})}
              defaultValue={this.state.pwd}
            />
          </View>
          <View>
            <Text>Down payment terms</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Down payment terms"
              onChangeText={text => this.setState({confirmPwd:text})}
              defaultValue={this.state.confirmPwd}
            />
          </View>
          <View>
            <Text>Note</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Note"
              onChangeText={text => this.setState({confirmPwd:text})}
              defaultValue={this.state.confirmPwd}
            />
          </View>
          <View>
            <Text>Down payment terms</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Down payment terms"
              onChangeText={text => this.setState({confirmPwd:text})}
              defaultValue={this.state.confirmPwd}
            />
          </View>
          <View>
            <Text>Conclusion to customer</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Conclusion to customer"
              onChangeText={text => this.setState({confirmPwd:text})}
              defaultValue={this.state.confirmPwd}
            />
          </View>
        </View>
      </ScrollView>
    )
  };
}

const styles = StyleSheet.create({
  container:{
    flex:1, 
    justifyContent:"center", 
    alignItems:"center"
  }, 
  imageView:{
    backgroundColor: 'gray',
    borderColor: 'black',
    borderRadius: 50,
    width:100,
    height:100,
    marginTop:30
  },
  logoImage : {
    marginTop: 50,
    marginBottom: 50,
    width: '50%',
    height: '30%'
  },
  textInput : {
    width: Dimensions.get('window').width / 3 * 2,
    height: 30,
    padding: 5,
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 2
  },
  registerbuttonView: { 
    width: Dimensions.get('window').width / 2,
    marginTop: 20
  },
  linkText:{
    color: "#00A2E8"
  },
  signupView: {
    alignItems:"center"
	},
	checkboxContainer: {
    flexDirection: "row"
  },
  checkbox: {
		alignSelf: "center",
		marginTop : -5
  },
});
