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

const SeeNotification = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}>Công ty:</Text>
      <Text style={styles.txtTitle}>Người tuyển dụng:</Text>
      <Text style={styles.txtTitle}>Thời gian hẹn phỏng vấn:</Text>
      <Text style={styles.txtTitle}>Địa chỉ:</Text>
      <Text style={styles.txtTitle}>Số điện thoại:</Text>
      <Text style={styles.txtTitle}>Email: </Text>
      <Text style={styles.txtTitle}> {'\n'} {'\n'} {'\n'} {'\n'}Trân trọng!</Text>

    </View>
  );
};

export default SeeNotification;

const styles = StyleSheet.create({
  container: {flex: 1},
 
  txtTitle: {
    color: '#000',
    fontSize: scale(17),
    marginLeft: scale(20),
    marginTop: scale(10),
    // alignSelf: 'center',
    // marginBottom: '50%',
  },
  
});
