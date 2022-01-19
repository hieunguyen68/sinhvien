import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Platform,
  StyleSheet,
  TextInput,
  StatusBar,
  RefreshControl,
  Alert,
  Image,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {scale} from 'react-native-size-matters';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AuthorIcon,
  MoneyIcon,
  MenuIcon,
  BellIcon,
  SearchIcon,
  CancelIcon,
  Clock,
} from '../../svg/icon';
import {getEndpoint} from '../utils';
import {useTheme} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const MainHomepage = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [newsID, setNewsID] = useState('');
  const [count, setCount] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [listJob, setListJob] = useState([]);

  useEffect(() => {
    getListJob();
  }, []);

  const getListJob = async () => {
    try {
      const res = await axios.get(`${getEndpoint(Platform.OS)}/post`);
      setListJob(res.data);
      console.log(res.data);
    } catch (error) {
      Alert.alert('An error occurred');
    }
  };


  const renderItem = ({item}) => {
    const backgroundColor = item.id === newsID ? '#2C2F2E' : 'white';
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.itemNew, {backgroundColor}]}
          onPress={() => navigation.navigate('JobDetails', item)}>
          <View style={styles.layer}>
            <View style={styles.imageNew}>
              <Image
                style={styles.image}
                source={{
                  uri: `http://${
                    Platform.OS === 'ios' ? 'localhost' : '192.168.1.11'
                  }:4000/uploads/post/${item.image}`,
                }}
              />
            </View>
            <View style={styles.text}>
              <View style={styles.viewNew}>
                <Text style={styles.timeText1} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.titleNew} numberOfLines={1}>
                  {item.companyName}
                </Text>
                <View style={styles.iconAndText}>
                  <AuthorIcon />
                  <Text style={styles.authorText}>{item.companyLocation}</Text>
                </View>
                <View style={styles.layer}>
                  <View style={styles.iconAndText}>
                    <MoneyIcon />
                    <Text style={styles.timeText}>{item.salary}</Text>
                  </View>
                  <View style={styles.iconday}>
                    <Clock />
                    <Text style={styles.timeText}>{item.expireDate}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const clearInput = () => {
    setSearchValue('');
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={() => navigation.navigate('DrawerContent')}>
          <MenuIcon height={30} width={30} color="#000" />
        </TouchableOpacity>
        <View style={styles.SearchArea}>
          <View style={styles.SearchIconArea}>
            <TouchableOpacity
              onPress={() => {
                setCount(count + 1);
              }}>
              <SearchIcon />
            </TouchableOpacity>
          </View>
          <View style={styles.TextInputArea}>
            <TextInput
              style={styles.inputText}
              placeholder={'Tìm kiếm'}
              value={searchValue}
              onChangeText={input => setSearchValue(input)}
            />
          </View>
          <View style={styles.CancelIconArea}>
            <TouchableOpacity
              onPress={() => {
                clearInput();
                setCount(count + 1);
              }}>
              <CancelIcon />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('MainNotification')}>
          <BellIcon color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View style={styles.imgBlack} />
        <View
          contentContainerStyle={styles.body}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <FlatList
            style={styles.FlatList}
            data={listJob}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </View>
      </View>
    </View>
  );
};
export default MainHomepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f0f0f0',
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
    fontSize: scale(14),
    fontWeight: 'bold',
    color: '#f6821f',
  },
  iconAndText: {
    marginTop: scale(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconday: {
    marginTop: scale(5),
    marginLeft: scale(5),
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
    backgroundColor: 'white',
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
    fontSize: scale(20),
    marginLeft: scale(5),
    color: 'black',
  },
  SearchArea: {
    height: scale(40),
    width: '75%',
    backgroundColor: 'white',
    borderRadius: scale(15),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: scale(1),
    borderColor: '#000',
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
