import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import BeginNavigation from './beginToLogin';
import StackHomepage from './stackHomepage';
import StackMessenger from './StackMessenger';
import StackIndividual from './stackIndividual';
import StackNotification from './stackNotification';
import BottomTabNavigations from './bottomTabNavigation';
const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="BeginNavigation" component={BeginNavigation} />
        <Stack.Screen
          name="BottomTabNavigations"
          component={BottomTabNavigations}
        />
        <Stack.Screen name="StackHomepage" component={StackHomepage} />
        <Stack.Screen name="StackMessenger" component={StackMessenger} />
        <Stack.Screen name="StackIndividual" component={StackIndividual} />
        <Stack.Screen name="StackNotification" component={StackNotification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
