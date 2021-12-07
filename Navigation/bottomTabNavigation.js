import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StackHomepage from './stackHomepage';
import StackNotification from './stackNotification';
import StackMessenger from './StackMessenger';
import StackIndividual from './stackIndividual';
import {
  ChatIcon,
  UserIcon,
  TestIcon,
  HomeIcon,
  Profile,
  ProfileIcon,
  Bell,
} from '../svg/icon';
import {View} from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabNavigations = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName;
          if (route.name === 'Trang chủ') {
            iconName = focused ? (
              <HomeIcon color="rgb(254,193,13)" />
            ) : (
              <HomeIcon color="#C7C7C7" />
            );
          } else if (route.name === 'Thông báo') {
            iconName = focused ? (
              <Bell color="rgb(254,193,13)" />
            ) : (
              <Bell color="#C7C7C7" />
            );
          } else if (route.name === 'Tin nhắn') {
            iconName = focused ? (
              <ChatIcon color="rgb(254,193,13)" />
            ) : (
              <ChatIcon color="#C7C7C7" />
            );
          } else if (route.name === 'Cá nhân') {
            iconName = focused ? (
              <ProfileIcon color="rgb(254,193,13)" />
            ) : (
              <ProfileIcon color="#C7C7C7" />
            );
          }
          return <View>{iconName}</View>;
        },
        // tabBarVisible: false,
      })}
      tabBarOptions={{
        labelStyle: {fontSize: 15},
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        style: {
          height: 65,
        },
      }}>
      <Tab.Screen name="Trang chủ" component={StackHomepage} />
      <Tab.Screen name="Thông báo" component={StackNotification} />
      <Tab.Screen name="Tin nhắn" component={StackMessenger} />
      <Tab.Screen name="Cá nhân" component={StackIndividual} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigations;
