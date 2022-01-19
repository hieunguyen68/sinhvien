import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MainMessenger from '../src/Messenger/Main';
import DirectMessenger from '../src/Messenger/DirectMessenger';
import {scale} from 'react-native-size-matters';
import {View, Text, StyleSheet} from 'react-native';
import {BackIcon, CheckMenu} from '../svg/icon';
import StackNotification from './stackNotification';

const Stack = createStackNavigator();

function StackMessenger() {
  function LogoTitle(props) {
    const {text} = props;
    return (
      <View>
        <Text style={styles.topTittle}>{text}</Text>
      </View>
    );
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'white',
          height: scale(50),
        },
        headerTintColor: 'white',
      }}>
      <Stack.Screen
        name="MainMessenger"
        component={MainMessenger}
        options={{
          headerTitle: props => <LogoTitle text="Tin nhắn" />,
          // headerLeft: () => <BackIcon color={'black'} />,
          // headerRight: () => <CheckMenu color={'black'} />,
        }}
      />
      <Stack.Screen
        name="DirectMessenger"
        component={DirectMessenger}
        options={{
          headerTitle: props => <LogoTitle text="Tin nhắn" />,
          headerBackImage: () => <BackIcon color={'black'} />,
        }}
      />
    </Stack.Navigator>
  );
}
export default StackMessenger;
const styles = StyleSheet.create({
  topTittle: {
    fontSize: scale(20),
    marginLeft: scale(40),
    color: 'black',
    alignItems: 'center',
  },
});
