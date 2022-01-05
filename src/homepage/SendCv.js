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
  Platform,
  Alert,
} from 'react-native';
import {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {scale} from 'react-native-size-matters';
import {TextInput} from 'react-native-gesture-handler';
import DocumentPicker from 'react-native-document-picker';
import LinearGradient from 'react-native-linear-gradient';
import {getEndpoint} from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SendCv = props => {
  const navigation = useNavigation();
  const route = useRoute();
  console.log(route.params);
  const [file, setFile] = useState(null);

  const onSubmit = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      user = JSON.parse(user);
      const data = new FormData();
      console.log(file);
      data.append('cv', file);
      data.append('_id', route.params._id);
      data.append('userId', user.id);
      await axios({
        method: 'post',
        url: `${getEndpoint(Platform.OS)}/users/apply`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data'},
      });
      Alert.alert('Ứng tuyển thành công');
    } catch (error) {
      console.log(error);
    }
  };

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      // Setting the state to show single file attributes
      setFile(res[0]);
    } catch (err) {
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.cv}>
        <View style={styles.text}>
          <Text style={styles.text1}>Tải CV từ điện thoại: </Text>
          <TouchableOpacity activeOpacity={0.5} onPress={selectFile}>
            <Text style={styles.text3}>Tải lên</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={onSubmit}>
          <LinearGradient
            colors={['rgb(254,193,13)', 'rgb(238,49,40)']}
            style={styles.signIn}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#fff',
                },
              ]}>
              Ứng tuyển
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SendCv;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: scale(20),
  },
  cv: {
    marginTop: 20,
    marginLeft: 15,
  },
  input: {
    height: 40,
    margin: 20,
    borderWidth: 1 / 2,
    padding: 100,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: scale(10),
  },
  text: {flexDirection: 'row'},
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
  text1: {
    color: 'black',
    fontSize: scale(16),
    fontWeight: 'bold',
    marginLeft: scale(15),
  },
  text2: {
    color: 'black',
    fontSize: scale(16),
    fontWeight: 'bold',
    marginLeft: scale(15),
    marginTop: scale(20),
  },
  text3: {
    color: 'rgb(0,190,90)',
    fontSize: scale(16),
    marginLeft: scale(15),
    textDecorationLine: 'underline',
  },

  mainBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  buttonStyle: {
    width: 150,
    height: 45,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
  signIn: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  textSign: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
