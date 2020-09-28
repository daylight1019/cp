import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Image, Easing, Animated, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ActiveLeadsScreen from '../screens/Lead/ActiveLeadsScreen';
import EstimateScreen from '../screens/Estimate/EstimateScreen';
import ContractTemplateScreen from '../screens/Settings/ContractTemplateScreen';
import ChangePasswordScreen from '../screens/Settings/ChangePasswordScreen';
import ColorScreen from '../screens/Settings/ColorScreen';
import FeedbackScreen from '../screens/Settings/FeedbackScreen';
import IngredientScreen from '../screens/Settings/IngredientScreen';
import PatternScreen from '../screens/Settings/PatternScreen';
import PrivacyPolicyScreen from '../screens/Settings/PrivacyPolicyScreen';
import PurchaseScreen from '../screens/Settings/PurchaseScreen';
import SystemScreen from '../screens/Settings/SystemScreen';
import TermScreen from '../screens/Settings/TermScreen';
import NewLeadScreen from '../screens/Lead/NewLeadScreen';
import NewColorScreen from '../screens/Settings/New/NewColorScreen';
import NewContractTemplateScreen from '../screens/Settings/New/NewContractTemplateScreen';
import NewIngredientScreen from '../screens/Settings/New/NewIngredientScreen';
import NewPatternScreen from '../screens/Settings/New/NewPatternScreen';
import NewSystemScreen from '../screens/Settings/New/NewSystemScreen';
import EditLeadScreen from '../screens/Lead/EditLeadScreen';
import EditColorScreen from '../screens/Settings/Edit/EditColorScreen';
// import EditContractTemplateScreen from '../screens/Settings/New/NewContractTemplateScreen';
import EditIngredientScreen from '../screens/Settings/Edit/EditIngredientScreen';
import EditPatternScreen from '../screens/Settings/Edit/EditPatternScreen';
import EditSystemScreen from '../screens/Settings/Edit/EditSystemScreen';
import EditEstimateScreen from '../screens/Estimate/EditEstimateScreen';
import EstimateSystemScreen from '../screens/Estimate/EstimateSystemScreen';
import CalendarScreen from '../screens/Settings/CalendarScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {

  const navigation = <NavigationContainer theme={MyTheme}>
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashScreen} options={{ title: "Splash", headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login', headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ 
        title: 'Register',
        headerTitleStyle:styles.headerTitle,
        headerTintColor: 'white',
      }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{
        title: 'Home',
        headerTitleStyle:styles.headerTitle,
        headerTintColor: 'white',
      }} />
      <Stack.Screen name="ActiveLeads" component={ActiveLeadsScreen} options={{
        title: 'Leads',
        headerTitleStyle:styles.headerTitle,
        headerTintColor: 'white'
      }} />
      <Stack.Screen name="System" component={SystemScreen} options={{
        title: 'System',
        headerTitleStyle:styles.headerTitle,
        headerTintColor: 'white'
      }} />
      <Stack.Screen name="ContractTemplate" component={ContractTemplateScreen} options={{
        title: 'Contracts Template',
        headerTitleStyle:styles.headerTitle,
        headerTintColor: 'white'
      }} />
      <Stack.Screen name="Calendar" component={CalendarScreen} options={{
        title: 'Calendar',
        headerTitleStyle:styles.headerTitle,
        headerTintColor: 'white'
      }} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{
        title: 'Change Password',
        headerTitleStyle:styles.headerTitle,
        headerTintColor: 'white'
      }} />
      <Stack.Screen name="Color" component={ColorScreen} options={{
        title: 'Color',
        headerTitleStyle:styles.headerTitle,
        headerTintColor: 'white'
      }} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} options={{
        title: 'Feedback',
        headerTitleStyle: styles.headerTitle,
        headerTintColor: 'white'
      }} />
      <Stack.Screen name="Ingredient" component={IngredientScreen} options={{
        title: 'Ingredient',
        headerTitleStyle:styles.headerTitle,
        headerTintColor: 'white'
      }} />
      <Stack.Screen name="Pattern" component={PatternScreen} options={{
        title: 'Pattern',
        headerTitleStyle:styles.headerTitle,
        headerTintColor: 'white'
      }} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{
        title: 'Privacy Policy',
        headerTitleStyle:styles.headerTitle,
        headerTintColor: 'white'
      }} />
      <Stack.Screen name="Purchase" component={PurchaseScreen} options={{
        title: 'Purchase',
        headerTitleStyle:styles.headerTitle,
        headerTintColor: 'white'
      }} />
      <Stack.Screen name="Term" component={TermScreen} options={{
        title: 'Terms & Conditions',
        headerTitleStyle:styles.headerTitle,
        headerTintColor: 'white'
      }} />
      <Stack.Screen name="NewLead" component={NewLeadScreen} options={{
        title: 'New Lead',
        headerTitleStyle:styles.headerTitle,
        headerTintColor: 'white'
      }} />
      <Stack.Screen name="NewColor" component={NewColorScreen} options={{
        title: 'New Color',
        headerTitleStyle:styles.headerTitle,
        headerTintColor: 'white'
      }} />
      <Stack.Screen name="NewContractTemplate" component={NewContractTemplateScreen} options={{
        title: 'New Contract Template',
        headerTitleStyle:styles.headerTitle,
        headerTintColor: 'white'
      }} />
      <Stack.Screen name="NewIngredient" component={NewIngredientScreen} options={{
        title: 'New Ingredient',
        headerTitleStyle:styles.headerTitle,
        headerTintColor: 'white'
      }} />
      <Stack.Screen name="NewPattern" component={NewPatternScreen} options={{
        title: 'New Pattern',
        headerTitleStyle:styles.headerTitle,
        headerTintColor: 'white'
      }} />
      <Stack.Screen name="NewSystem" component={NewSystemScreen} options={{
        title: 'New System',
        headerTitleStyle:styles.headerTitle,
        headerTintColor: 'white'
      }} />
      <Stack.Screen name="EditColor" component={EditColorScreen} options={{
        title: 'Edit Color',
        headerTitleStyle:styles.headerTitle,
        headerTintColor: 'white'
      }} />
      <Stack.Screen name="EditPattern" component={EditPatternScreen} options={{
        title: 'Edit Pattern',
        headerTitleStyle:styles.headerTitle,
        headerTintColor: 'white'
      }} />
      <Stack.Screen name="EditIngredient" component={EditIngredientScreen} options={{
        title: 'Edit Ingredient',
        headerTitleStyle:styles.headerTitle,
        headerTintColor: 'white'
      }} />
      <Stack.Screen name="EditSystem" component={EditSystemScreen} options={{
        title: 'Edit System',
        headerTitleStyle:styles.headerTitle,
        headerTintColor: 'white'
      }} />
      <Stack.Screen name="EditLead" component={EditLeadScreen} options={{
        title: 'Edit Lead',
        headerTitleStyle:styles.headerTitle,
        headerTintColor: 'white'
      }} />
      <Stack.Screen name="Estimate" component={EstimateScreen} options={{
        title: 'Estimate',
        headerTitleStyle:styles.headerTitle,
        headerTintColor: 'white'
      }} />
      <Stack.Screen name="EditEstimate" component={EditEstimateScreen} options={{
        title: 'Edit Estimate',
        headerTitleStyle:styles.headerTitle,
        headerTintColor: 'white'
      }} />
      <Stack.Screen name="EstimateSystem" component={EstimateSystemScreen} options={{
        title: 'Edit Estimate System',
        headerTitleStyle:styles.headerTitle,
        headerTintColor: 'white'
      }} />
    </Stack.Navigator>
  </NavigationContainer>
  
  return navigation;
}

const styles = StyleSheet.create({
  headerTitle: { 
    textAlign: 'center', 
    height: 30,
    // marginLeft:-50
  }
});

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    card: '#00A2E8',
    text: 'rgb(28, 28, 30)',
  },
};

export default AppNavigator;
