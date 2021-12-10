import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, StyleSheet} from 'react-native';
import MainHomepage from '../src/homepage/Main';
import {scale} from 'react-native-size-matters';
import {BackIcon, CheckMenu, MenuIcon} from '../svg/icon';
import VideoPlayer from '../src/homepage/PlayVideoScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import JobDetails from '../src/homepage/JobDetails';
import InforJob from '../src/homepage/InforJob';
import InforCty from '../src/homepage/InforCty';
import MainMessenger from '../src/Messenger/Main';
import DirectMessenger from '../src/Messenger/DirectMessenger';
import MainNotification from '../src/notification/Main';
import SendCv from '../src/homepage/SendCv';
import {DrawerContent} from '../src/homepage/DrawerContent';
import ChangePass from '../src/individual/ChangePass';

const Drawer = createStackNavigator();
const Stack = createStackNavigator();

function StackHomepage({navigation, route}) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'DoingExam') {
      navigation.setOptions({tabBarVisible: false});
    } else {
      navigation.setOptions({tabBarVisible: true});
    }
  }, [navigation, route]);
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
      <Drawer.Screen
        options={{headerShown: false}}
        name="MainHomepage"
        component={MainHomepage}
      />
      <Stack.Screen
        name="JobDetails"
        component={JobDetails}
        options={{
          headerTitle: props => <LogoTitle text="Chi tiết việc làm" />,
          headerBackImage: () => <BackIcon color={'black'} />,
        }}
      />
      <Stack.Screen
        name="MainMessenger"
        component={MainMessenger}
        options={{
          headerTitle: props => <LogoTitle text="Tin nhắn" />,
          headerBackImage: () => <BackIcon color={'black'} />,
          headerRight: () => <CheckMenu color={'black'} />,
        }}
      />
      <Stack.Screen
        name="DirectMessenger"
        component={DirectMessenger}
        options={{
          headerTitle: props => <LogoTitle text="Tin nhắn" />,
          headerBackImage: () => <BackIcon color={'black'} />,
          headerRight: () => <CheckMenu color={'black'} />,
        }}
      />
      <Stack.Screen
        name="MainNotification"
        component={MainNotification}
        options={{
          headerTitle: props => <LogoTitle text="Thông báo" />,
          headerLeft: () => <BackIcon color={'black'} />,
          headerRight: () => <CheckMenu color={'black'} />,
        }}
      />
      <Stack.Screen
        name="SendCv"
        component={SendCv}
        options={{
          headerTitle: props => <LogoTitle text="Ứng tuyển" />,
          headerBackImage: () => <BackIcon color={'black'} />,
        }}
      />
      <Drawer.Screen name="DrawerContent" component={DrawerContent} />
      <Stack.Screen
        name="ChangePass"
        component={ChangePass}
        options={{
          headerTitle: props => <LogoTitle text="Đổi mật khẩu" />,
          headerBackImage: () => <BackIcon color={'black'} />,
        }}
      />
    </Stack.Navigator>
  );
}

export default StackHomepage;

// const HomeStackScreen = ({navigation}) => (
//   <Drawer.Navigator>
//     <Drawer.Screen name="MainHomepage" component={MainHomepage} />
//   </Drawer.Navigator>
// );

const styles = StyleSheet.create({
  topTittle: {
    fontSize: scale(20),
    marginLeft: scale(40),
    color: 'black',
  },
});
