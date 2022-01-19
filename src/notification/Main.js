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

const Notifications = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../img/meo.png')} />
      <Text style={styles.txtTitle}>Danh sách thông báo trống</Text>
    </View>
  );
};

export default Notifications;

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
  
});
