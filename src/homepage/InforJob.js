// React Native Tab - Example using React Navigation V5 //
// https://aboutreact.com/react-native-tab //
import React, {useState, useEffect} from 'react';
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
} from '../../svg/icon';
import {scale} from 'react-native-size-matters';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import MainHomepage from '../homepage/Main';
const InforJob = props => {
  const {data} = props.route.params;

  const route = useRoute();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView>
          <View style={styles.topTittle}>
            <View style={styles.iconAndText}>
              <PayIcon />
              <Text style={styles.timeText2}>Mức lương: {data.salary}</Text>
            </View>
            <View style={styles.iconAndText}>
              <AddressIcon />
              <Text style={styles.timeText3}>
                Khu vực: {data.companyAddress}
              </Text>
            </View>
            <View style={styles.iconAndText}>
              <ClockIcon1 />
              <Text style={styles.timeText3}>Hình thức: {data.type}</Text>
            </View>
            <View style={styles.iconAndText}>
              <PeopleIcon />
              <Text style={styles.timeText3}>
                Số lượng cần tuyển: {data.quantity}
              </Text>
            </View>
            <View style={styles.iconAndText}>
              <GenderIcon />
              <Text style={styles.timeText3}>Giới tính: {data.gender}</Text>
            </View>
            <View style={styles.iconAndText}>
              <BriefIcon />
              <Text style={styles.timeText3}>Chức vụ: {data.role}</Text>
            </View>
            <View style={styles.iconAndText}>
              <ExpIcon />
              <Text style={styles.timeText3}>
                Kinh nghiệm yêu cầu: {data.exp}
              </Text>
            </View>
            <View style={styles.line} />

            <View>
              <Text style={styles.timeText4}>MÔ TẢ CÔNG VIỆC</Text>
              <Text style={styles.timeText5}>{data.description}</Text>
            </View>
            <View>
              <Text style={styles.timeText4}>YÊU CẦU CÔNG VIỆC</Text>
              <Text style={styles.timeText5}>{data.requirement}</Text>
            </View>
            <View>
              <Text style={styles.timeText4}>QUYỀN LỢI</Text>
              <Text style={styles.timeText5}>{data.benefit}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default InforJob;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  buttonNext: {
    width: scale(155),
    height: scale(45),
    marginLeft: scale(10),
    alignSelf: 'center',
    borderRadius: scale(25),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(238,49,40)',
  },
  buttonNextText: {
    fontSize: scale(14),
    color: 'white',
  },
  buttonBack: {
    width: scale(155),
    height: scale(45),
    alignSelf: 'center',
    borderRadius: scale(25),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: scale(1),
    borderColor: 'rgb(238,49,40)',
  },
  buttonBackText: {
    fontSize: scale(14),
    color: 'rgb(238,49,40)',
  },
  buttonContainer: {
    height: scale(50),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: scale(15),
  },
  line: {
    backgroundColor: 'black',
    width: '100%',
    height: scale(1 / 2),
    marginTop: scale(5),
  },
  itemNew: {
    marginHorizontal: scale(5),
    alignItems: 'center',
    borderRadius: scale(10),
    marginVertical: scale(5),
    borderRightColor: '#d3d4d4',
    height: scale(130),
    width: '96%',
    elevation: scale(5),
    overflow: 'hidden',
  },
  imageNew: {
    flex: 1,
    height: '100%',
    width: '100%',
    marginLeft: scale(10),
    resizeMode: 'stretch',
  },
  viewNew: {
    height: scale(90),
    width: '95%',
  },
  titleNew: {
    marginTop: scale(5),
    fontSize: scale(16),
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#f6821f',
  },
  iconAndText: {
    marginTop: scale(18),
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconday: {
    marginTop: scale(5),
    marginLeft: scale(20),
    marginBottom: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorText: {
    marginLeft: scale(10),
    color: '#17a2b8',
    fontSize: scale(14),
  },
  timeText: {
    color: '#000',
    fontSize: scale(14),
    marginLeft: scale(5),
  },
  timeText1: {
    color: '#000',
    fontSize: scale(16),
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  timeText2: {
    color: 'rgb(238,49,40)',
    fontSize: scale(16),
    fontWeight: 'bold',
    marginLeft: scale(15),
  },
  timeText3: {
    color: '#000',
    fontSize: scale(16),
    fontWeight: 'bold',
    marginLeft: scale(15),
  },
  timeText4: {
    color: '#000',
    fontSize: scale(18),
    // fontWeight: 'bold',
    marginTop: scale(30),
  },
  timeText5: {
    marginTop: scale(15),
    fontSize: scale(14),
    color: 'rgb(111,111,111)',
  },
  text: {
    marginLeft: scale(100),
    marginRight: scale(10),
    marginTop: scale(5),
  },
  searchBar: {
    height: scale(56),
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'rgb(238,49,40)',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconPosition: {
    marginLeft: scale(8),
    marginRight: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  topTittle: {
    marginLeft: scale(20),
    marginTop: scale(1),
  },
  SearchArea: {
    height: scale(36),
    width: '75%',
    backgroundColor: 'white',
    borderRadius: scale(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  SearchIconArea: {
    width: '10%',
    alignItems: 'center',
  },
  CancelIconArea: {
    width: '10%',
  },
  TextInputArea: {
    width: '80%',
    height: '100%',
  },
  inputText: {
    fontSize: scale(15),
  },
  smallCenteredView: {
    flex: 1,
  },
  smallModalView: {
    height: scale(280),
    width: scale(300),
    backgroundColor: 'white',
    borderRadius: scale(5),
    shadowColor: '#000',
    elevation: scale(5),
    justifyContent: 'space-around',
    padding: scale(8),
    marginTop: scale(58),
    marginLeft: scale(20),
  },
  smallModalText: {
    color: 'black',
    fontSize: scale(15),
  },
  modalIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: scale(30),
    alignItems: 'center',
  },
  itemCategory: {
    backgroundColor: '#f0f0f0',
    marginBottom: scale(10),
    paddingLeft: scale(5),
  },
  titleLesson: {
    justifyContent: 'center',
    marginLeft: scale(20),
    width: scale(300),
    height: scale(40),
  },
  body: {
    flex: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  layer: {
    marginTop: scale(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  FlatList: {
    padding: scale(10),
    width: '100%',
  },
  btnExamination: {
    width: scale(200),
    height: scale(40),
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(20),
    margin: scale(10),
  },
  image: {
    flex: 1,
    height: scale(50),
    width: scale(80),
  },
});
