import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  CheckBox
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SideMenu from 'react-native-side-menu';
import SystemMenu from '../../menus/SystemMenu';

export default class TermScreen extends Component {
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
    this.props.route.params.navMode == 1 ?
      this.props.navigation.setOptions({
        headerLeft: (props) => (
          <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate("Home")}>
            <Icon name="home" size={18} color="white" style={{ marginLeft: 16 }} solid />
          </TouchableOpacity>
        )
      }) : true;
  }

  onRegister = () => {

  };

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
              Last updated: May 16, 2016{'\n'}{'\n'}

              Please read these Terms and Conditions (“Terms”, “Terms and Conditions”) carefully before using the Coatings Estimator Pro mobile application (the “Service”) operated by Incredible Products LLC (“us”, “we”, or “our”).{'\n'}{'\n'}

              Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who wish to access or use the Service.{'\n'}{'\n'}

              By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you do not have permission to access the Service.{'\n'}{'\n'}

              Communications{'\n'}{'\n'}

              By creating an Account on our service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send.{'\n'}{'\n'}

              Subscriptions{'\n'}{'\n'}

              Some parts of the Service are billed on a subscription basis (“Subscription(s)”). You will be billed in advance on a recurring and periodic basis (“Billing Cycle”). Billing cycles are set either on a monthly or annual basis, depending on the type of subscription plan you select when purchasing a Subscription.{'\n'}{'\n'}

              At the end of each Billing Cycle, your Subscription will automatically renew under the exact same conditions unless you cancel it or Incredible Products LLC cancels it. You may cancel your Subscription renewal either through your online account management page or by contacting Incredible Products LLC customer support team.{'\n'}{'\n'}

              A valid payment method, including credit card, is required to process the payment for your Subscription. You shall provide Incredible Products LLC with accurate and complete billing information including full name, address, state, zip code, telephone number, and a valid payment method information. By submitting such payment information, you automatically authorize Incredible Products LLC to charge all Subscription fees incurred through your account to any such payment instruments.{'\n'}{'\n'}

              Should automatic billing fail to occur for any reason, Incredible Products LLC will issue an electronic invoice indicating that you must proceed manually, within a certain deadline date, with the full payment corresponding to the billing period as indicated on the invoice.{'\n'}{'\n'}

              Fee Changes{'\n'}{'\n'}

              Incredible Products LLC, in its sole discretion and at any time, may modify the Subscription fees for the Subscriptions. Any Subscription fee change will become effective at the end of the then-current Billing Cycle.{'\n'}{'\n'}

              Incredible Products LLC will provide you with a reasonable prior notice of any change in Subscription fees to give you an opportunity to terminate your Subscription before such change becomes effective.{'\n'}{'\n'}

              Your continued use of the Service after the Subscription fee change comes into effect constitutes your agreement to pay the modified Subscription fee amount.{'\n'}{'\n'}

              Refunds{'\n'}{'\n'}

              Except when required by law, paid Subscription fees are non-refundable.{'\n'}{'\n'}

              Content{'\n'}{'\n'}

              Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material (“Content”). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.{'\n'}{'\n'}

              By posting Content on or through the Service, You represent and warrant that: (i) the Content is yours (you own it) and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms, and (ii) that the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity. We reserve the right to terminate the account of anyone found to be infringing on a copyright.{'\n'}{'\n'}

              You retain any and all of your rights to any Content you submit, post or display on or through the Service and you are responsible for protecting those rights. We take no responsibility and assume no liability for Content you or any third party posts on or through the Service. However, by posting Content using the Service you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service.{'\n'}{'\n'}

              Incredible Products LLC has the right but not the obligation to monitor and edit all Content provided by users.{'\n'}{'\n'}

              In addition, Content found on or through this Service are the property of Incredible Products LLC or used with permission. You may not distribute, modify, transmit, reuse, download, repost, copy, or use said Content, whether in whole or in part, for commercial purposes or for personal gain, without express advance written permission from us.{'\n'}{'\n'}

              Accounts{'\n'}{'\n'}

              When you create an account with us, you guarantee that you are above the age of 18, and that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on the Service.{'\n'}{'\n'}

              You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password, whether your password is with our Service or a third-party service. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.{'\n'}{'\n'}

              You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you, without appropriate authorization. You may not use as a username any name that is offensive, vulgar or obscene.{'\n'}{'\n'}

              Intellectual Property{'\n'}
              The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Incredible Products LLC and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Incredible Products LLC.{'\n'}{'\n'}

              Links To Other Web Sites{'\n'}{'\n'}

              Our Service may contain links to third party web sites or services that are not owned or controlled by Incredible Products LLC.{'\n'}{'\n'}

              Incredible Products LLC has no control over, and assumes no responsibility for the content, privacy policies, or practices of any third party web sites or services. We do not warrant the offerings of any of these entities/individuals or their websites.{'\n'}{'\n'}

              You acknowledge and agree that Incredible Products LLC shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such third party web sites or services.{'\n'}{'\n'}

              We strongly advise you to read the terms and conditions and privacy policies of any third party web sites or services that you visit.{'\n'}{'\n'}

              Termination{'\n'}{'\n'}

              We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.{'\n'}{'\n'}

              If you wish to terminate your account, you may simply discontinue using the Service.{'\n'}{'\n'}

              All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.{'\n'}{'\n'}

              Indemnification{'\n'}{'\n'}

              You agree to defend, indemnify and hold harmless Incredible Products LLC and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney’s fees), resulting from or arising out of a) your use and access of the Service, by you or any person using your account and password; b) a breach of these Terms, or c) Content posted on the Service.{'\n'}{'\n'}

              Limitation Of Liability{'\n'}{'\n'}

              In no event shall Incredible Products LLC, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.{'\n'}{'\n'}

              Disclaimer{'\n'}{'\n'}

              Your use of the Service is at your sole risk. The Service is provided on an “AS IS” and “AS AVAILABLE” basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.{'\n'}{'\n'}

              Incredible Products LLC its subsidiaries, affiliates, and its licensors do not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements.{'\n'}{'\n'}

              Exclusions{'\n'}{'\n'}

              Some jurisdictions do not allow the exclusion of certain warranties or the exclusion or limitation of liability for consequential or incidental damages, so the limitations above may not apply to you.{'\n'}{'\n'}

              Governing Law{'\n'}{'\n'}

              These Terms shall be governed and construed in accordance with the laws of Ohio, United States, without regard to its conflict of law provisions.{'\n'}{'\n'}

              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have had between us regarding the Service.{'\n'}{'\n'}

              Changes{'\n'}{'\n'}

              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.{'\n'}{'\n'}

              By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.{'\n'}{'\n'}

              Contact Us{'\n'}{'\n'}

              If you have any questions about these Terms, please contact us.{'\n'}
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
  text: {
    padding: 10,
    fontSize: 14
  }
});
