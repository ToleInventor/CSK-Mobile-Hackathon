import { Link, NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { View, Text } from 'react-native'
import HomeScreen from './screens/HomeScreen';
import ContactScreen from './screens/ContactScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();
function RootStack(){
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='HOME' component={HomeScreen}/>
      <Stack.Screen name='CONTACT' component={ContactScreen}/>
      <Stack.Screen name='PROFILE' component={ProfileScreen}/>
    </Stack.Navigator>
  )
}

export default function MainNavigation() {
  return(
  <NavigationIndependentTree>
  <NavigationContainer>
    <RootStack />
  </NavigationContainer>
  </NavigationIndependentTree>
  )
}
