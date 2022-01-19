import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Swipeout from 'react-native-swipeout';
// import Icon from 'react-natiuve-vector-icons/FontAwesome5';
import {Can} from '../../svg/icon';
const {width} = Dimensions.get('window');
import {getEndpoint} from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const StackMessenger = props => {
  const route = useRoute();
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {

    try {
      let user = await AsyncStorage.getItem('user');
      user = JSON.parse(user);
      const res = await axios.get(
        `${getEndpoint(Platform.OS)}/users/message/users/${user.id}`,
      );
      setData(
        res.data.map(i => ({
          id: i._id,
          avatar:
            'http://192.168.1.11:4000/uploads/avatar/1234.jpg',
          name: i.hrName,
          description: i.content,
          hrEmail: i.hrEmail,
        })),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({item}) => {
    _onClose = () => {
      if (this.state.activeRowKey != null) {
        this.setState({
          activeRowKey: null,
        });
      }
    };
    var swipeSettings = [
      {
        onPress: ({}) => {},
        component: (
          <View style={styles.item}>
            <Can></Can>
          </View>
        ),
        backgroundColor: 'white',
      },
    ];
    console.log(data);

    return (
      <Swipeout right={swipeSettings} backgroundColor="white">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DirectMessenger', {hrEmail: item.hrEmail})
          }>
          <View style={styles.container}>
            <View style={styles.bgAvatar}>
            {/* <Image
            style={styles.avatar}
            source={{
              uri: `http://192.168.1.11:4000/uploads/avatar/${avatar}`,
            }}
          /> */}
              <Image source={{uri: item.avatar}} style={styles.avatar} />
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text numberOfLines={1}>{item.description}</Text>
            </View>
            {/* <View style={styles.bgSeen}>
              <Image source={{uri: item.avatar}} style={styles.avatarSeen} />
            </View> */}
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={data}
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default StackMessenger;

const styles = StyleSheet.create({
  container: {flex: 1},
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    padding: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  bgAvatar: {
    flex: 2,
  },
  avatar: {
    width: (width * 15) / 100,
    height: (width * 15) / 100,
    borderRadius: (width * 10) / 100,
  },
  info: {
    flex: 8,
    flexDirection: 'column',
    paddingLeft: 10,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    paddingBottom: 3,
  },
  bgSeen: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarSeen: {
    width: (width * 5) / 100,
    height: (width * 5) / 100,
    borderRadius: (width * 2.5) / 100,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  inItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  icon: {
    fontSize: (width * 6) / 100,
  },
});
