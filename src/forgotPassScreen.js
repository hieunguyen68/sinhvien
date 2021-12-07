import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';

const ForgotPassScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const SendEmail = () => {
    axios
      .post(
        'https://elearning.tmgs.vn/api/profile/password',
        {
          username: name,
          email: email,
        },
        {
          headers: {},
        },
      )
      .then(function (response) {
        console.log(response.data.message);
        if (response.status === 200) {
          console.log('Success');
        } else {
          console.log('Failer');
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
          source={require('../img//logohvktmm.png')}
        />
      </View>
      <View style={styles.textInputContainer}>
        <View style={styles.textInputArea}>
          <TextInput
            value={name}
            onChangeText={(nameinput) => setName(nameinput)}
            style={styles.textInput}
            placeholder={' Mã sinh viên'}
          />
        </View>
        <View style={styles.textInputArea}>
          <TextInput
            value={email}
            onChangeText={(emailinput) => setEmail(emailinput)}
            style={styles.textInput}
            placeholder={' Email'}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => SendEmail()}>
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
            Gửi
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.linktext}>Đăng Nhập</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ForgotPassScreen;

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
    marginTop: scale(80),
    height: scale(160),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    height: scale(200),
    width: scale(150),
    alignSelf: 'center',
  },
  textInputContainer: {
    marginTop: scale(50),
    height: scale(140),
    width: '100%',
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
    backgroundColor: 'rgb(238,49,40)',
    width: scale(100),
    height: scale(50),
    alignSelf: 'center',
    borderRadius: scale(25),
    marginBottom: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
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
  linktext: {
    fontSize: scale(14),
    color: '#2787CD',
    textDecorationLine: 'underline',
    alignSelf: 'center',
  },
  signIn: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  textSign: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
