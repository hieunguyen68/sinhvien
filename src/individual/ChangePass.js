import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Backbar from '../components/BackBar';
import TitleBar from '../components/TitleBar';
import LinearGradient from 'react-native-linear-gradient';

const ChangePass = () => {
  const [idenUser] = useState('');
  const [pass, setPass] = useState('');
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [token, setToken] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  // console.log(route.params.id);
  useEffect(() => {
    // setToken(route.params.UserToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const ChangeConfirm = () => {
    if (pass1 === pass2) {
      ChangePassword();
    } else {
      console.log('Xin vui lòng kiểm tra lại mật khẩu vừa nhập');
    }
  };
  const ChangePassword = () => {
    axios
      .put(
        'https://elearning.tmgs.vn/api/profile/password',
        {
          // id: route.params.id,
          password: pass1,
          oldPassword: pass,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(function (response) {
        // console.log(response);
        if (response.status === 200) {
          console.log('Change Success');
        } else {
          console.log('Cannot change password');
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        navigation.navigate('LoginScreen');
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.logocontainer}>
        <ImageBackground
          style={styles.logo}
          source={require('../../img/logohvktmm.png')}
        />
      </View>
      <View style={styles.textInputContainer}>
        <View style={styles.textInputArea}>
          <TextInput
            value={pass}
            onChangeText={(passinput) => setPass(passinput)}
            style={styles.textInput}
            secureTextEntry={true}
            placeholder={'Mật khẩu cũ'}
          />
        </View>
        <View style={styles.textInputArea}>
          <TextInput
            value={pass1}
            onChangeText={(pass1input) => setPass1(pass1input)}
            style={styles.textInput}
            secureTextEntry={true}
            placeholder={'Mật khẩu mới'}
          />
        </View>
        <View style={styles.textInputArea}>
          <TextInput
            value={pass2}
            onChangeText={(repassinput) => setPass2(repassinput)}
            style={styles.textInput}
            secureTextEntry={true}
            placeholder={'Nhập lại mật khẩu mới'}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => ChangeConfirm()}>
        <LinearGradient
          colors={['rgb(254,193,13)', 'rgb(238,49,40)']}
          style={styles.signIn}>
          <Text style={styles.Button1Text}>Đổi mật khẩu</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
export default ChangePass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
    height: scale(230),
    width: scale(375),
  },
  logocontainer: {
    marginTop: scale(40),
    height: scale(120),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    height: scale(150),
    width: scale(150),
    alignSelf: 'center',
  },
  textInputContainer: {
    height: scale(210),
    width: scale(350),
    marginTop: scale(50),
  },
  textInputArea: {
    backgroundColor: '#F6F4F5',
    width: scale(290),
    height: scale(50),
    alignSelf: 'center',
    borderRadius: scale(25),
    marginBottom: scale(20),
  },
  textInput: {
    width: scale(290),
    height: scale(50),
    alignSelf: 'center',
    fontSize: scale(18),
    marginLeft: scale(30),
  },
  button: {
    marginTop: scale(20),
    width: scale(150),
    height: scale(45),
    alignSelf: 'center',
    borderRadius: scale(25),
    marginBottom: scale(250),
    justifyContent: 'center',
    alignItems: 'center',
  },
  Button1Text: {
    fontSize: scale(18),
    color: '#fff',
  },
  signIn: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  text: {
    fontSize: scale(18),
    color: 'white',
  },
  centerText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: scale(5),
  },
  title: {
    textAlign: 'center',
    fontSize: scale(22),
    fontWeight: 'bold',
    color: 'rgb(254,193,13)',
    marginBottom: scale(20),
  },
});
