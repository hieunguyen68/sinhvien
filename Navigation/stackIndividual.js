import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//thay man cua minh o day
import MainIndividual from '../src/individual/Main';
import BeginNavigation from '../Navigation/beginToLogin';
import UserInfo from '../src/individual/DetailUser';
import EditProfile from '../src/individual/EditProfile';
import ChangePass from '../src/individual/ChangePass';
import BottomTabNavigations from '../Navigation/bottomTabNavigation';
const Stack = createStackNavigator();

function StackIndividual() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MainIndividual" component={MainIndividual} />
      <Stack.Screen name="UserInfo" component={UserInfo} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ChangePass" component={ChangePass} />
      <Stack.Screen name="BeginNavigation" component={BeginNavigation} />
    </Stack.Navigator>
  );
}

export default StackIndividual;
