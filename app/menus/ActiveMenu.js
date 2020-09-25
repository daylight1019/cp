import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 20,
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
    fontSize: 24,
    width: 150,
    textAlign: 'center'
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
  buttonView: {
    alignItems: 'center',
    backgroundColor: "green",
    width: 150,
    height: 30,
    marginLeft: 10,
    marginBottom: 30,
  }
});

export default function ActiveMenu({ onItemSelected }) {
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.avatarContainer}>
        <Text style={styles.name}>Inactive</Text>
      </View>

      <TouchableOpacity onPress={() => alert('a')} style={styles.buttonView}>
        <Text
          onPress={() => onItemSelected('About')}
          style={styles.item}
        >
          Leads
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => alert('a')} style={styles.buttonView}>
        <Text
          onPress={() => onItemSelected('Contacts')}
          style={styles.item}
        >
          Estimate
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => alert('a')} style={styles.buttonView}>
        <Text
          onPress={() => onItemSelected('Contacts')}
          style={styles.item}
        >
          Current Projects
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => alert('a')} style={styles.buttonView}>
        <Text
          onPress={() => onItemSelected('Contacts')}
          style={styles.item}
        >
          Complete Projects
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

ActiveMenu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
