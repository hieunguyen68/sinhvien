// React Native Tab - Example using React Navigation V5 //
// https://aboutreact.com/react-native-tab //
import * as React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import {
  AuthorIcon,
  MoneyIcon,
  MenuIcon,
  BellIcon,
  SearchIcon,
  CancelIcon,
  DateAndTimeIcon,
  ClockIcon,
  Clock,
  ChatIcon,
  PayIcon,
  AddressIcon,
  ClockIcon1,
  PeopleIcon,
  GenderIcon,
  ExpIcon,
  BriefIcon,
  WebIcon,
} from '../../svg/icon';
import {useNavigation, useRoute} from '@react-navigation/native';
import {scale} from 'react-native-size-matters';

const InforCty = props => {
  const {data} = props.route.params;
  console.log(data.website);
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView>
          <TouchableOpacity>
            <Text style={styles.text1}>Công ty: </Text>
            <Text style={styles.text2}>Xem chi tiết {'>'}</Text>
          </TouchableOpacity>
          <View style={styles.iconAndText}>
            <AddressIcon />
            <Text style={styles.text3}>Địa chỉ: {data.companyAddress}</Text>
          </View>
          <View style={styles.iconAndText}>
            <WebIcon />
            <Text style={styles.text3}>Website: </Text>
            <Text style={styles.text4}>{data.website}</Text>
          </View>
          <View style={styles.line} />
          <View>
            <Text style={styles.timeText4}>GIỚI THIỆU CÔNG TY</Text>
            <Text style={styles.timeText5}>{data.companyIntro}</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default InforCty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  text1: {
    color: '#000',
    fontSize: scale(16),
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: scale(15),
    marginLeft: scale(15),
  },
  text2: {
    color: 'rgb(0,190,90)',
    fontSize: scale(14),
    marginLeft: scale(15),
  },
  text3: {
    color: 'rgb(111,111,111)',
    fontSize: scale(16),
    marginLeft: scale(10),
  },
  text4: {
    color: 'rgb(0,190,90)',
    fontSize: scale(16),
  },
  iconAndText: {
    marginTop: scale(18),
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: scale(15),
  },
  line: {
    backgroundColor: 'rgb(125,125,125)',
    width: '100%',
    height: scale(1 / 2),
    marginTop: scale(5),
  },
  timeText4: {
    color: '#000',
    fontSize: scale(18),
    fontWeight: 'bold',
    marginTop: scale(30),
    marginLeft: scale(15),
  },
  timeText5: {
    marginTop: scale(15),
    marginLeft: scale(15),
    fontSize: scale(14),
    color: 'rgb(111,111,111)',
  },
});
