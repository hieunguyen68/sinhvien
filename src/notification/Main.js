import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {Header} from '../components/header';

const Notification = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../img/meo.png')} />
      <Text style={styles.txtTitle}>Danh sách thông báo trống</Text>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {flex: 1},
  image: {
    flex: 1,
    width: scale(256),
    height: scale(256),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: scale(50),
  },
  txtTitle: {
    color: '#000',
    fontSize: scale(16),
    alignSelf: 'center',
    marginBottom: '50%',
  },
  btnback: {
    width: scale(15),
    height: scale(15),
    position: 'absolute',
    left: scale(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBack: {width: scale(15), height: scale(15)},
  titleHeader: {color: '#fff', fontSize: scale(18)},
  body: {
    flex: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imgBlack: {width: '100%', height: scale(200), backgroundColor: '#000'},
  items: {padding: scale(10), justifyContent: 'center'},
  btnExamination: {
    width: scale(200),
    height: scale(40),
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(20),
    margin: scale(10),
  },
  titleChapter: {
    marginLeft: scale(10),
    justifyContent: 'center',
    width: scale(200),
    height: scale(40),
  },
  titleLesson: {
    justifyContent: 'center',
    marginLeft: scale(20),
    width: scale(300),
    height: scale(40),
  },
  txtLesson: {color: '#000'},
  line: {width: '100%', height: scale(1), backgroundColor: '#aaa'},
  FlatList: {
    padding: scale(10),
    width: '100%',
  },
  txtLessonC: {color: '#144E8C'},
});
