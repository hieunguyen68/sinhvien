import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';

import {scale} from 'react-native-size-matters';
import Backbar from '../components/BackBar';
import TitleBar from '../components/TitleBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';

const MainIndividual = () => {
  const route = useRoute();
  const [dataHistory, setDataHistory] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [token, setToken] = useState('');
  const [count, setCount] = useState(0);
  const navigation = useNavigation();

  // const getToken = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('@MyToken');
  //     if (value !== null) {
  //       console.log('We have Token');
  //       setToken(value);
  //     } else {
  //       console.log('Dont have Token');
  //     }
  //   } catch (err) {
  //     console.log('Read data error');
  //   }
  //   console.log('Done.');
  // };
  // const getdata = async () => {
  //   // await getToken();
  //   await axios
  //     .get(
  //       'https://elearning.tmgs.vn/api/competition/my-competition/statistical',
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     )
  //     .then((response) => {
  //       setDataHistory(response.data.data);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       setCount(count + 1);
  //       console.log(error);
  //     })
  //     .finally(() => {
  //       console.log(dataHistory);
  //       dataHistory.length === 0 ? setCount(count + 1) : null;
  //     });
  //   await axios
  //     .get('https://elearning.tmgs.vn/api/profile/detail', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       setDataUser(response.data.data);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     })
  //     .finally(() => {
  //       console.log(dataUser);
  //       dataUser.length === 0 ? setCount(count + 1) : null;
  //     });
  // };
  // useEffect(() => {
  //   getdata();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [count]);
  return (
    <View style={styles.container}>
      <TitleBar title1={'Trang cá nhân'} />
      <View style={styles.avatarContainer}>
        <View style={styles.circle}>
          {/* <Image
            style={styles.logo}
            source={{
              uri: 'http://elearning.tmgs.vn' + route.params.avatar,
            }}
          /> */}
          <Image
            style={styles.logo}
            source={require('../../img/logohvktmm.png')}
          />
        </View>
      </View>
      <View style={styles.line} />
      <View>
        <ScrollView>
          <View style={styles.InforContainer}>
            <View style={styles.LeftTable}>
              <Text style={styles.textLeft}>Họ Tên</Text>
              <View style={styles.leftLine} />

              <Text style={styles.textLeft}>Mã Sinh Viên</Text>
              <View style={styles.leftLine} />

              <Text style={styles.textLeft}>Lớp</Text>
              <View style={styles.leftLine} />

              <Text style={styles.textLeft}>Ngày Sinh</Text>
              <View style={styles.leftLine} />

              <Text style={styles.textLeft}>Giới Tính</Text>
              <View style={styles.leftLine} />

              <Text style={styles.textLeft}>E-mail</Text>
              <View style={styles.leftLine} />

              <Text style={styles.textLeft}>Địa Chỉ</Text>
              <View style={styles.leftLine} />

              <Text style={styles.textLeft}>Số Điện Thoại</Text>
              <View style={styles.leftLine} />

              <Text style={styles.textLeft}>Công Ty</Text>
              <View style={styles.leftLine} />

              <Text style={styles.textLeft}>Các Kỹ Năng</Text>
              <View style={styles.leftLine} />

              <Text style={styles.textLeft}>Học Vấn</Text>
              <View style={styles.leftLine} />

              <Text style={styles.textLeft}>Mục Tiêu Nghề Nghiệp</Text>
              <View style={styles.leftLine} />
            </View>
            <View style={styles.RightTable}>
              <Text style={styles.textLeft}>{dataUser.fullname}</Text>
              <View style={styles.rightLine} />

              <Text style={styles.textLeft}>{dataUser.MaSv}</Text>
              <View style={styles.rightLine} />

              <Text style={styles.textLeft}>{dataUser.class}</Text>
              <View style={styles.rightLine} />

              <Text style={styles.textLeft}>
                {new Date(dataUser.birth).toLocaleDateString('en-GB')}
              </Text>
              <View style={styles.rightLine} />

              <Text style={styles.textLeft}>
                {dataUser.gender === 1 ? 'Nam' : 'Nữ'}
              </Text>
              <View style={styles.rightLine} />

              <Text style={styles.textLeft}>{dataUser.email}</Text>
              <View style={styles.rightLine} />

              <Text style={styles.textLeft}>{dataUser.place}</Text>
              <View style={styles.rightLine} />

              <Text style={styles.textLeft}>{dataUser.phone}</Text>
              <View style={styles.rightLine} />

              <Text style={styles.textLeft}>{dataUser.company}</Text>
              <View style={styles.rightLine} />

              <Text style={styles.textLeft}>{dataUser.skill}</Text>
              <View style={styles.rightLine} />

              <Text style={styles.textLeft}>{dataUser.degree}</Text>
              <View style={styles.rightLine} />

              <Text style={styles.textLeft}>{dataUser.careergoals}</Text>
              <View style={styles.rightLine} />
            </View>
          </View>
        </ScrollView>
        <View style={styles.line} />
        <TouchableOpacity
          style={styles.button1}
          onPress={() =>
            navigation.navigate('EditProfile', {
              avatar: dataUser.avatar,
              name: dataUser.name,
              MaSv: dataUser.MaSv,
              class: dataUser.class,
              phone: dataUser.phone,
              email: dataUser.email,
              gender: dataUser.gender,
              place: dataUser.place,
              birth: dataUser.birth,
              skill: dataUser.skill,
              degree: dataUser.degree,
              careergoals: dataUser.careergoals,
              UserToken: dataUser.UserTK,
            })
          }>
          <LinearGradient
            colors={['rgb(254,193,13)', 'rgb(238,49,40)']}
            style={styles.signIn}>
            <Text style={styles.Button1Text}>Chỉnh sửa thông tin</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainIndividual;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  avatarContainer: {
    marginTop: scale(30),
    height: scale(120),
    width: scale(120),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderWidth: scale(1),
    elevation: scale(5),
    borderRadius: scale(60),
    overflow: 'hidden',
    borderColor: 'white',
    marginBottom: scale(30),
  },
  circle: {
    height: scale(120),
    width: scale(120),
  },
  logo: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
  LeftTable: {
    width: '30%',
    marginLeft: scale(10),
  },
  RightTable: {
    width: '70%',
  },
  InforContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  textLeft: {
    fontSize: scale(15),
    marginVertical: scale(10),
  },
  leftLine: {
    width: '100%',
    height: scale(1 / 2),
  },
  rightLine: {
    width: '90%',
    height: scale(1 / 2),
    backgroundColor: 'black',
  },
  line: {
    backgroundColor: 'black',
    width: '100%',
    height: scale(1 / 2),
  },
  button1: {
    marginTop: scale(20),
    width: scale(200),
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
});
