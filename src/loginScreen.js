import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import {getEndpoint} from './utils';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  XIcon,
  CheckIcon,
  UserTK,
  CircleCheckIcon,
  PasswordIcon,
  EyeIcon,
  EyeOffIcon,
} from '../svg/icon';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {Modal, useTheme} from 'react-native-paper';

import {AuthContext} from '../components/context';

const LoginScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  // const {Login} = React.useContext(AuthContext);

  const [data, setData] = React.useState({
    userName: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const textInputChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        userName: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        userName: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };
  const loginHandle = async (userName, password) => {
    try {
      const res = await axios.post(`${getEndpoint(Platform.OS)}/auth/login`, {
        id: userName,
        password,
      });
      AsyncStorage.setItem('user', JSON.stringify(res.data));
      console.log('????ng nh???p th??nh c??ng');
      setModalVisible1(true);
      navigation.navigate('BottomTabNavigations');
    } catch (error) {
      console.log('????ng nh???p th???t b???i');
      Alert.alert(
        '????ng nh???p kh??ng th??nh c??ng, vui l??ng ki???m tra t??n ????ng nh???p ho???c m???t kh???u!',
      );
      console.log(error);
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Xin Ch??o !</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
            },
          ]}>
          T??i kho???n
        </Text>
        <View style={styles.action}>
          <UserTK />
          <TextInput
            placeholder="M?? sinh vi??n"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={val => textInputChange(val)}
            onEndEditing={e => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <CircleCheckIcon />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              T??n ng?????i d??ng ph???i d??i 8 k?? t???.
            </Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              marginTop: 35,
            },
          ]}>
          M???t kh???u
        </Text>
        <View style={styles.action}>
          <PasswordIcon />
          <TextInput
            placeholder="M???t kh???u"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={val => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? <EyeOffIcon /> : <EyeIcon />}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>M???t kh???u ph???i d??i 8 k?? t???.</Text>
          </Animatable.View>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassScreen')}>
          <Text style={{color: '#009387', marginTop: 15}}>Qu??n m???t kh???u?</Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={
              // () => navigation.navigate('BottomTabNavigations')
              () => loginHandle(data.userName, data.password)
            }>
            <LinearGradient
              colors={['rgb(254,193,13)', 'rgb(238,49,40)']}
              style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#fff',
                  },
                ]}>
                ????ng Nh???p
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => navigation.navigate('RegisterScreen')}
            style={[
              styles.signIn,
              {
                borderColor: '#009387',
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#009387',
                },
              ]}>
              ????ng K??
            </Text>
          </TouchableOpacity> */}
        </View>
      </Animatable.View>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(254,193,13)',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  textSign: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  smallCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100,100,100, 0.9)',
  },
  smallModalView: {
    height: scale(300),
    width: scale(300),
    backgroundColor: 'white',
    borderRadius: scale(5),
    alignItems: 'center',
    shadowColor: '#000',
    elevation: scale(5),
    justifyContent: 'center',
    padding: scale(8),
  },
  modalCenter: {
    justifyContent: 'space-between',
    height: scale(150),
    alignItems: 'center',
  },
  circleX: {
    height: scale(140),
    width: scale(140),
    borderRadius: scale(70),
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallModalText: {
    color: 'black',
    fontSize: scale(15),
    textAlign: 'center',
  },
});
