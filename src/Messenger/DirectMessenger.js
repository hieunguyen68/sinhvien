import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  Platform,
  SafeAreaView,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {Header} from '../components/header';
import {useRoute} from '@react-navigation/native';
import {getEndpoint} from '../utils';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {socket} from '../../index';
import {TextInput} from 'react-native-gesture-handler';
import {BellIcon, SendIcon} from '../../svg/icon';

const DirectMessenger = props => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState();
  const [first, setFirst] = useState(false);
  const route = useRoute();
  const {hrEmail} = route.params;
  const [input, setInput] = useState('');

  useEffect(() => {
    if (route.params && user) {
      getDirectMessage();
    }
  }, [route.params, user]);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      if (first) return;
      socket.on(user.id, data => {
        console.log(data);
      });
      setFirst(true);
    }
  }, [user]);

  const onSend = async () => {
    try {
      if (!input) return;
      const res = await axios.post(`${getEndpoint(Platform.OS)}/message`, {
        hrEmail,
        userId: user.id,
        content: input,
        to: hrEmail,
        from: user.id,
      });
      setInput('');
      getDirectMessage();
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    const user = await AsyncStorage.getItem('user');
    setUser(JSON.parse(user));
  };

  const getDirectMessage = async () => {
    try {
      const res = await axios.get(
        `${getEndpoint(Platform.OS)}/message/${hrEmail}/${user.id}`,
      );
      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({item}) => {
    let name;
    if (item.from === hrEmail)
      name = <Text style={styles.name}>{item.hrName}</Text>;
    else name = <Text style={styles.name}>{item.userName}</Text>;
    return (
      <View
        style={{
          ...styles.message,
          alignSelf: item.from === hrEmail ? 'flex-start' : 'flex-end',
        }}>
        {name}
        <Text>{item.content}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={ref => {
          this.scrollView = ref;
        }}
        onContentSizeChange={() =>
          this.scrollView.scrollToEnd({animated: true})
        }>
        <FlatList
          style={styles.FlatList}
          data={messages}
          keyExtractor={item => item._id}
          renderItem={renderItem}
        />
      </ScrollView>
      <View style={styles.TextInputArea}>
        <TextInput
          style={styles.inputText}
          placeholder={'Aa'}
          value={input}
          onChangeText={input => setInput(input)}
        />
        <TouchableOpacity onPress={onSend}>
          <SendIcon style={{marginLeft: scale(10)}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DirectMessenger;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
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
  message: {
    width: '45%',
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgb(230,230,230)',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'rgb(230,230,230)',
  },
  name: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  newInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    padding: 10,
    height: 50,
  },
  TextInputArea: {
    marginLeft: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: scale(15),
    width: '85%',
    height: '100%',
    height: scale(40),
    backgroundColor: 'rgb(230,230,230)',
    borderRadius: scale(15),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: scale(1),
    borderColor: 'rgb(230,230,230)',
  },
});
