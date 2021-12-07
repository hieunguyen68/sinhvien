import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {scale} from 'react-native-size-matters';
import MainNotification from '../src/notification/Main';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {BackIcon, CheckMenu} from '../svg/icon';

const Stack = createStackNavigator();

function StackNotification({navigation, route}) {
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
        name="MainNotification"
        component={MainNotification}
        options={{
          headerTitle: (props) => <LogoTitle text="Thông báo" />,
          headerLeft: () => <BackIcon color={'black'} />,
          headerRight: () => <CheckMenu color={'black'} />,
        }}
      />
    </Stack.Navigator>
  );
}

export default StackNotification;
const styles = StyleSheet.create({
  topTittle: {
    fontSize: scale(20),
    marginLeft: scale(40),
    color: 'black',
    alignItems: 'center',
  },
});
