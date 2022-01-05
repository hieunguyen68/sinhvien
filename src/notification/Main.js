import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Can} from '../../svg/icon';
const {width} = Dimensions.get('window');

const Notification = props => {
  console.log(props);
  const route = useRoute();
  const navigation = useNavigation();
  const [newsID, setNewsID] = useState('');
  const data = [
    {
      id: 1,
      avatar:
        'http://woridnews.com/wp-content/uploads/2016/10/cd3e35dbcf23269780779b3f7b9e2fcc.png',
      name: 'Hằng',
      description: 'Can I help you?',
    },
    {
      id: 2,
      avatar:
        'https://d1o7cxaf8di5ts.cloudfront.net/file/brand/member-girlcrush-BM.jpg?d=200',
      name: 'Huyền',
      description: 'Hẹn bạn phỏng vấn vòa 9h ngày 12/11/2021 tại công ty',
    },
  ];

  const renderItem = ({item}) => {
    //     constructor(props) {
    //     super(props);
    //     this.state = {
    //         activeRowKey: null, //set item active
    //         numberOfRefresh: 0,
    //     };
    // }
    // const item = this.props;
    // _onOpen = () => {
    //   this.setState({
    //     activeRowKey: item.item.key,
    //   });
    // };
    _onClose = () => {
      if (this.state.activeRowKey != null) {
        this.setState({
          activeRowKey: null,
        });
      }
    };
    var swipeSettings = [
      // autoClose: true, //sẽ tự động đóng khi ta click vào buton nào đó trong item được swipe
      // onOpen: this._onOpen, //khi open swipe thì nên set row nào được active để tránh nhầm lẫn khi ta click sự kiện bên trong các item.
      // onClose: this._onClose, //xóa row active

      //tiếp theo ta sẽ làm swipe phía bên trái

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
    const backgroundColor = item.id === newsID ? '#2C2F2E' : 'white';
    return (
      <Swipeout right={swipeSettings}>
        <TouchableOpacity
          style={[styles.itemNew, {backgroundColor}]}
          onPress={() => navigation.navigate('SeeNotification')}>
          <View style={styles.container}>
            <View style={styles.bgAvatar}>
              <Image source={{uri: item.avatar}} style={styles.avatar} />
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text numberOfLines={1}>{item.description}</Text>
            </View>
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

export default Notification;

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
