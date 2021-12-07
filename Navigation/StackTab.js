// React Native Tab - Example using React Navigation V5 //
// https://aboutreact.com/react-native-tab //
import 'react-native-gesture-handler';

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import InforJob from '../src/homepage/InforJob';
import InforCty from '../src/homepage/InforCty';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function StackTab(props) {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: 'rgb(238,49,40)',
        inactiveTintColor: 'rgb(127,127,127)',
        style: {
          backgroundColor: 'white',
        },
        labelStyle: {
          textAlign: 'center',
        },
        indicatorStyle: {
          borderBottomColor: 'rgb(238,49,40)',
          borderBottomWidth: 2,
        },
      }}>
      <Tab.Screen
        name="InforJob"
        component={InforJob}
        initialParams={{data: props.data}}
        options={{
          tabBarLabel: 'Thông tin',
          tabBarIcon: ({color, size, fontWeight}) => (
            <MaterialCommunityIcons
              name="Thông tin"
              color={rgb(238, 49, 40)}
              size={16}
              fontWeight={'bold'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="InforCty"
        component={InforCty}
        initialParams={{data: props.data}}
        options={{
          tabBarLabel: 'Công ty',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="Công ty"
              color={rgb(238, 49, 40)}
              size={16}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default StackTab;
