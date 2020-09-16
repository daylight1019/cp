import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Dimensions,
  ScrollView,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SideMenu from 'react-native-side-menu';
import SystemMenu from '../../menus/SystemMenu';

export default class PrivacyPolicyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pwd: '',
      confirmPwd: '',
      newPwd: '',
      isOpen: false,
      selectedItem: 'About',
    }
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: (props) => (
        <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate("Home")}>
          <Icon name="home" size={18} color="white" style={{ marginLeft: 16 }} solid />
        </TouchableOpacity>
      )
    });
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

  render() {
    const menu = <SystemMenu navigation={this.props.navigation} onItemSelected={this.onMenuItemSelected} />;
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
        onscroll={
          Animated.event(
            [], { useNativeDriver: false }
          )
        }
      >
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.text}>
              Last updated: May 16, 2016{'\n'}
              {'\n'}
            Incredible Products LLC (“us”, “we”, or “our”) operates the Coatings Estimator
            Pro mobile application (the “Service”).{'\n'}{'\n'}

            This page informs you of our policies regarding the collection, use and disclosure of Personal Information when you
            use our Service.{'\n'}{'\n'}

            We will not use or share your information with anyone except as described in this Privacy Policy.{'\n'}{'\n'}

            We use your Personal Information for providing and improving the Service. By using the Service, you agree to the
            collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy,
            terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.{'\n'}{'\n'}

            Information Collection And Use{'\n'}{'\n'}

            While using our Service, we may ask you to provide us with certain personally identifiable information that can be
            used to contact or identify you. Personally identifiable information may include, but is not limited to, your email
            address, name, phone number, postal address, other information (“Personal Information”).
            We collect this information for the purpose of providing the Service, identifying and communicating with you,
            responding to your requests/inquiries, servicing your purchase orders, and improving our services.{'\n'}{'\n'}

            Log Data{'\n'}{'\n'}

            When you access the Service by or through a mobile device, we may collect certain information automatically,
            including, but not limited to, the type of mobile device you use, your mobile device unique ID, the IP address of
            your mobile device, your mobile operating system, the type of mobile Internet browser you use and other statistics
            (“Log Data”).{'\n'}{'\n'}

            In addition, we may use third party services such as Google Analytics that collect, monitor and analyze this type of
            information in order to increase our Service’s functionality. These third party service providers have their own
            privacy policies addressing how they use such information.{'\n'}{'\n'}

            Cookies{'\n'}{'\n'}

            Cookies are files with a small amount of data, which may include an anonymous unique identifier. Cookies are sent to
            your browser from a web site and transferred to your device. We use cookies to collect information in order to
            improve our services for you.{'\n'}{'\n'}

            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. The Help feature on
            most browsers provide information on how to accept cookies, disable cookies or to notify you when receiving a new
            cookie.{'\n'}{'\n'}

            If you do not accept cookies, you may not be able to use some features of our Service and we recommend that you
            leave them turned on.{'\n'}{'\n'}

            Do Not Track Disclosure{'\n'}{'\n'}

            We support Do Not Track (“DNT”). Do Not Track is a preference you can set in your web browser to inform websites
            that you do not want to be tracked.{'\n'}{'\n'}

            You can enable or disable Do Not Track by visiting the Preferences or Settings page of your web browser.{'\n'}{'\n'}

            Service Providers{'\n'}{'\n'}

            We may employ third party companies and individuals to facilitate our Service, to provide the Service on our behalf,
            to perform Service-related services and/or to assist us in analyzing how our Service is used.{'\n'}{'\n'}

            These third parties have access to your Personal Information only to perform specific tasks on our behalf and are
            obligated not to disclose or use your information for any other purpose.{'\n'}{'\n'}

            Communications{'\n'}{'\n'}

            We may use your Personal Information to contact you with newsletters, marketing or promotional materials and other
            information that may be of interest to you. You may opt out of receiving any, or all, of these communications from
            us by following the unsubscribe link or instructions provided in any email we send.{'\n'}{'\n'}

            Compliance With Laws{'\n'}{'\n'}

            We will disclose your Personal Information where required to do so by law or subpoena or if we believe that such
            action is necessary to comply with the law and the reasonable requests of law enforcement or to protect the security
            or integrity of our Service.{'\n'}{'\n'}

            Security{'\n'}{'\n'}

            The security of your Personal Information is important to us, and we strive to implement and maintain reasonable,
            commercially acceptable security procedures and practices appropriate to the nature of the information we store, in
            order to protect it from unauthorized access, destruction, use, modification, or disclosure.{'\n'}{'\n'}

            However, please be aware that no method of transmission over the internet, or method of electronic storage is 100%
            secure and we are unable to guarantee the absolute security of the Personal Information we have collected from you.{'\n'}{'\n'}

            Links To Other Sites{'\n'}{'\n'}

            Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you
            will be directed to that third party’s site. We strongly advise you to review the Privacy Policy of every site you
            visit.{'\n'}{'\n'}

            We have no control over, and assume no responsibility for the content, privacy policies or practices of any third
            party sites or services.{'\n'}{'\n'}

            Children’s Privacy{'\n'}{'\n'}

            Only persons age 18 or older have permission to access our Service. Our Service does not address anyone under the
            age of 13 (“Children”).{'\n'}{'\n'}

            We do not knowingly collect personally identifiable information from children under 13. If you are a parent or
            guardian and you learn that your Children have provided us with Personal Information, please contact us. If we
            become aware that we have collected Personal Information from a children under age 13 without verification of
            parental consent, we take steps to remove that information from our servers.{'\n'}{'\n'}

            Changes To This Privacy Policy{'\n'}{'\n'}

            This Privacy Policy is effective as of May 16, 2016 and will remain in effect except with respect to any changes in
            its provisions in the future, which will be in effect immediately after being posted on this page.{'\n'}{'\n'}

            We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy
            periodically. Your continued use of the Service after we post any modifications to the Privacy Policy on this page
            will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified
            Privacy Policy.{'\n'}{'\n'}

            If we make any material changes to this Privacy Policy, we will notify you either through the email address you have
            provided us, or by placing a prominent notice on our website.{'\n'}{'\n'}

            Contact Us{'\n'}{'\n'}

            If you have any questions about this Privacy Policy, please contact us.{'\n'}
            </Text>
          </ScrollView>
        </View>
      </SideMenu>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#F5FCFF',
  },
  textview: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10
  },
  text: {
    padding: 10,
    fontSize: 14
  }
});
