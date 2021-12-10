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

const StackMessenger = props => {
  console.log(props);
  const route = useRoute();
  const navigation = useNavigation();

  const data = [
    {
      id: 1,
      avatar:
        'http://woridnews.com/wp-content/uploads/2016/10/cd3e35dbcf23269780779b3f7b9e2fcc.png',
      name: 'Crush số 1',
      description: 'Crush số 1 waved at you!',
    },
    {
      id: 2,
      avatar:
        'https://d1o7cxaf8di5ts.cloudfront.net/file/brand/member-girlcrush-BM.jpg?d=200',
      name: 'Crush số 8',
      description:
        'Anh muốn tặng em trái tim này và em hãy giữ nó, bởi anh rất vụng về, anh sợ rằng anh sẽ làm mất hoặc dễ dàng tặng nó cho một ai khác',
    },
    {
      id: 3,
      avatar:
        'https://qph.fs.quoracdn.net/main-qimg-bd14ad5123f2a0b5b7fd457a18e23de8',
      name: 'Crush số 9',
      description:
        'Nếu em dám, hãy nắm lấy tay anh và dẫn anh đến trái tim của em. Anh muốn cảm nhận tình yêu của em.',
    },
    {
      id: 4,
      avatar:
        'https://pbs.twimg.com/profile_images/652669289326092288/RsXc7UnS_400x400.jpg',
      name: 'Crush số 10',
      description:
        'Anh thức dậy vào mỗi buổi sáng với sự phấn khích của một đứa trẻ vào ngày Giáng sinh, chỉ để biết rằng anh vẫn ở cạnh em.',
    },
    {
      id: 5,
      avatar:
        'https://bellanyc.com/wp-content/uploads/2017/06/blake-lively.jpg',
      name: 'Crush số 3',
      description:
        'Em là nguồn cảm hứng đằng sau tất cả những gì anh làm, làm nguồn gốc của những điều tốt lành trong cuộc sống của anh',
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
    return (
      <Swipeout right={swipeSettings} backgroundColor="white">
        <TouchableOpacity
          onPress={() => navigation.navigate('DirectMessenger', route.params)}>
          <View style={styles.container}>
            <View style={styles.bgAvatar}>
              <Image source={{uri: item.avatar}} style={styles.avatar} />
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text numberOfLines={1}>{item.description}</Text>
            </View>
            <View style={styles.bgSeen}>
              <Image source={{uri: item.avatar}} style={styles.avatarSeen} />
            </View>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  };

  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.title}>My Crush</Text>
      </View>
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
