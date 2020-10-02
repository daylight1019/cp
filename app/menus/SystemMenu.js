import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  Button,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { readBuilderProgram } from 'typescript';
import { clearToken } from '../utils/storage'

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width / 3 * 2,
    height: window.height,
    backgroundColor: 'rgb(0, 100, 150)',
    padding: 16,
    borderRightWidth: 4,
    borderRightColor: 'rgba(0, 50, 50, 0.2)'
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    fontSize: 12,
    textAlign: 'center',
    color: 'white'
  },
  item: {
    fontSize: 12,
    fontWeight: '300',
    paddingTop: 5,
  },
  buttonView: {
    alignItems: 'center',
    width: 150,
    height: 60,
    marginLeft: 10,
    marginBottom: 10,
  },
  buttonBlue: {
    backgroundColor: '#0050FF',
    borderRadius: 6,
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 150,
    height: 30,
    color: 'white'
  },
  buttonRed: {
    backgroundColor: 'red',
    borderRadius: 6,
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 150,
    height: 30,
    color: 'white'
  },
  buttonGreen: {
    backgroundColor: 'green',
    borderRadius: 6,
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 150,
    height: 30,
    color: 'white'
  },
  icon: {
    marginRight: 12,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  border: {
    width: 500,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginTop: -10,
    marginBottom: 10
  },
  touchableOpacity: {
    flexDirection: 'row',
    marginBottom: 20
  }
});

export default class SystemMenu extends Component {
  constructor(props) {
    super(props);
  }

  onLogout() {
    clearToken('');
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={styles.buttonView}>
          <Text style={{ ...styles.name, fontSize: 18, marginTop: 10, marginLeft: 30 }}>Settings</Text>
          {/* <Icon name="cog" style={styles.icon} size={30} color="#ffffff" solid/> */}
        </View>
        <TouchableOpacity activeOpacity={.5} onPress={() => { this.props.navigation.navigate('System'); this.props.onItemSelected(); }} style={styles.touchableOpacity} >
          <View style={styles.icon}>
            <Icon name="cog" size={16} color="#ffffff" solid />
          </View>
          <Text style={styles.name}>System</Text>
        </TouchableOpacity>
        <View style={styles.border}></View>
        <TouchableOpacity activeOpacity={.5} onPress={() => { this.props.navigation.navigate('Calendar'); this.props.onItemSelected(); }} style={styles.touchableOpacity} >
          <View style={styles.icon}>
            <Icon name="calendar" size={16} color="#ffffff" solid />
          </View>
          <Text style={styles.name}>Calendar</Text>
        </TouchableOpacity>
        <View style={styles.border}></View>
        <TouchableOpacity activeOpacity={.5} onPress={() => { this.props.navigation.navigate('ContractTemplate'); this.props.onItemSelected(); }} style={styles.touchableOpacity} >
          <View style={styles.icon}>
            <Icon name="file-contract" size={16} color="#ffffff" solid />
          </View>
          <Text style={styles.name}>Contract Template</Text>
        </TouchableOpacity>
        <View style={styles.border}></View>
        <TouchableOpacity activeOpacity={.5} onPress={() => { this.props.navigation.navigate('Color'); this.props.onItemSelected(); }} style={styles.touchableOpacity} >
          <View style={styles.icon}>
            <Icon name="palette" size={16} color="#ffffff" solid />
          </View>
          <Text style={styles.name}>Colors</Text>
        </TouchableOpacity>
        <View style={styles.border}></View>
        <TouchableOpacity activeOpacity={.5} onPress={() => { this.props.navigation.navigate('Pattern'); this.props.onItemSelected(); }} style={styles.touchableOpacity} >
          <View style={styles.icon}>
            <Icon name="accusoft" size={16} color="#ffffff" solid />
          </View>
          <Text style={styles.name}>Patterns</Text>
        </TouchableOpacity>
        <View style={styles.border}></View>
        <TouchableOpacity activeOpacity={.5} onPress={() => { this.props.navigation.navigate('Ingredient'); this.props.onItemSelected(); }} style={styles.touchableOpacity} >
          <View style={styles.icon}>
            <Icon name="firefox" size={16} color="#ffffff" solid />
          </View>
          <Text style={styles.name}>Ingredients</Text>
        </TouchableOpacity>
        <View style={styles.border}></View>
        <TouchableOpacity activeOpacity={.5} onPress={() => { this.props.navigation.navigate('Purchase'); this.props.onItemSelected(); }} style={styles.touchableOpacity} >
          <View style={styles.icon}>
            <Icon name="cc-amazon-pay" size={16} color="#ffffff" solid />
          </View>
          <Text style={styles.name}>Purchase</Text>
        </TouchableOpacity>
        <View style={styles.border}></View>
        <TouchableOpacity activeOpacity={.5} onPress={() => { this.props.navigation.navigate('PrivacyPolicy'); this.props.onItemSelected(); }} style={styles.touchableOpacity} >
          <View style={styles.icon}>
            <Icon name="book" size={16} color="#ffffff" solid />
          </View>
          <Text style={styles.name}>Privacy Policy</Text>
        </TouchableOpacity>
        <View style={styles.border}></View>
        <TouchableOpacity activeOpacity={.5} onPress={() => { this.props.navigation.navigate('Term', { navMode: 1 }); this.props.onItemSelected(); }} style={styles.touchableOpacity} >
          <View style={styles.icon}>
            <Icon name="book-open" size={16} color="#ffffff" solid />
          </View>
          <Text style={styles.name}>Terms & Conditions</Text>
        </TouchableOpacity>
        <View style={styles.border}></View>
        <TouchableOpacity activeOpacity={.5} onPress={() => { this.props.navigation.navigate('Feedback'); this.props.onItemSelected(); }} style={styles.touchableOpacity} >
          <View style={styles.icon}>
            <Icon name="pencil-ruler" size={16} color="#ffffff" solid />
          </View>
          <Text style={styles.name}>Give Feedback</Text>
        </TouchableOpacity>
        <View style={styles.border}></View>
        <TouchableOpacity activeOpacity={.5} onPress={() => { this.props.navigation.navigate('ChangePassword'); this.props.onItemSelected(); }} style={styles.touchableOpacity} >
          <View style={styles.icon}>
            <Icon name="exchange-alt" size={16} color="#ffffff" solid />
          </View>
          <Text style={styles.name}>Change Password</Text>
        </TouchableOpacity>
        <View style={styles.border}></View>
        <TouchableOpacity activeOpacity={.5} onPress={() => { this.onLogout(); this.props.onItemSelected(); }} style={{ flexDirection: 'row' }} >
          <View style={styles.icon}>
            <Icon name="sign-out-alt" size={16} color="#ffffff" solid />
          </View>
          <Text style={styles.name}>Log out</Text>
        </TouchableOpacity>
        <View style={{height:30}}></View>
      </ScrollView>
    );
  }
}
