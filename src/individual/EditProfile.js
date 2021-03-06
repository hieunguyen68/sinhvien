import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Platform,
  Alert,
  Modal,
  TextInput,
  Image,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Backbar from '../components/BackBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {CameraIcon, CheckIcon} from '../../svg/icon';
import * as ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import TitleBar from '../components/TitleBar';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getEndpoint, formatDate} from '../utils';

const EditProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [date, setDate] = useState(new Date(formatDate(route.params.birthday)));
  const [birthday, setBirthday] = useState(route.params.birthday);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState(route.params.address);
  const [gender, setGender] = useState(route.params.gender);
  const [email, setEmail] = useState(route.params.email);
  const [phone, setPhone] = useState(route.params.phone);
  const [company, setCompany] = useState(route.params.company);
  const [skill, setSkill] = useState(route.params.skill);
  const [degree, setDegree] = useState(route.params.degree);
  const [careerGoal, setCareergoal] = useState(route.params.careerGoal);

  const [name, setName] = useState(route.params.name);
  const [avatar, setAvatar] = useState();
  const [avatarUri, setAvatarUri] = useState(
    `http://${
      Platform.OS === 'ios' ? 'localhost' : '192.168.1.11'
    }:4000/uploads/avatar/${route.params.avatar}`,
  );
  const [place, setPlace] = useState(route.params.place);
  const [cv, setCv] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setCv(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const sendUpdateData = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      user = JSON.parse(user);
      const data = new FormData();
      console.log(user.id);
      data.append('id', user.id);
      console.log(avatar);
      // if (birthday) data.append('birthday', birthday);
      if (gender) data.append('gender', gender);
      if (email) data.append('email', email);
      if (phone) data.append('phone', phone);
      if (company) data.append('company', company);
      if (skill) data.append('skill', skill);
      if (degree) data.append('degree', degree);
      if (careerGoal) data.append('careerGoal', careerGoal);
      if (name) data.append('name', name);
      if (place) data.append('place', place);
      if (cv) data.append('cv', cv);
      if (avatar) {
        data.append('avatar', {
          name: avatar.fileName,
          type: avatar.type,
          uri:
            Platform.OS === 'android'
              ? avatar.uri
              : avatar.uri.replace('file://', ''),
        });
      }
      await axios({
        method: 'put',
        url: `${getEndpoint(Platform.OS)}/users`,
        data: data,
        headers: {'Content-Type': 'multipart/form-data'},
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setBirthday(date);
  }, [date]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  function selectImage() {
    let options = {
      title: 'You can choose one image',
      mediaType: 'photo',
      includeBase64: true,
      maxWidth: 256,
      maxHeight: 256,
      storageOptions: {
        skipBackup: true,
      },
      includeBase64: true,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response);
        setAvatar(response);
        setAvatarUri('data:image/jpeg;base64,' + response.base64);
      }
    });
  }

  return (
    <View style={styles.container}>
      <TitleBar title1={'C???p nh???t th??ng tin c?? nh??n'} />
      <View style={styles.Avatar}>
        <ImageBackground
          blurRadius={2}
          style={styles.bigAvatar}
          source={{
            uri: avatarUri,
          }}>
          <View style={styles.avatarContainer}>
            <View style={styles.circle}>
              <ImageBackground
                style={styles.logo}
                source={{
                  uri: avatarUri,
                }}>
                <TouchableOpacity
                  style={styles.changeAvatarBut}
                  onPress={() => {
                    selectImage();
                  }}>
                  <CameraIcon />
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </View>
          <View style={styles.nameInput}>
            <TextInput
              value={name}
              onChangeText={nameinput => setName(nameinput)}
              placeholderTextColor={'#cecece'}
              placeholder={name}
              style={styles.inputText}></TextInput>
          </View>
        </ImageBackground>
      </View>
      <View>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.InforContainer}>
              <View style={styles.EmailInput}>
                <Text style={styles.title}>E-mail</Text>
                <View style={styles.emailBox}>
                  <TextInput
                    value={email}
                    onChangeText={emailinput => setEmail(emailinput)}
                    placeholder={email}
                    style={styles.textInput}
                  />
                </View>
              </View>
              <View style={styles.EmailInput}>
                <Text style={styles.title}>S??? ??i???n tho???i</Text>
                <View style={styles.emailBox}>
                  <TextInput
                    value={phone}
                    onChangeText={phoneinput => setPhone(phoneinput)}
                    placeholder={phone}
                    style={styles.textInput}
                  />
                </View>
              </View>
              <View style={styles.EmailInput}>
                <Text style={styles.title}>?????a ch???</Text>
                <View style={styles.emailBox}>
                  <TextInput
                    value={address}
                    onChangeText={addressinput => setAddress(addressinput)}
                    placeholder={address}
                    style={styles.textInput}
                  />
                </View>
              </View>
         
                {/* <View style={styles.DateInput}>
                  <Text style={styles.title}>Ng??y sinh</Text>
                  <TouchableOpacity
                    style={styles.DateBox}
                    onPress={() => showDatepicker()}>
                    <Text style={styles.textInput}>
                      {new Date(birthday)
                        .toLocaleString('en-GB')
                        .substring(0, 10)}
                    </Text>
                  </TouchableOpacity>
                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={mode}
                      is24Hour={true}
                      display="default"
                      onChange={onChange}
                    />
                  )}
                </View> */}
                <View style={styles.EmailInput}>
                  <Text style={styles.title}>Gi???i t??nh</Text>
                  <View style={styles.GenderBox}>
                    <Picker
                      itemStyle={styles.textInput}
                      selectedValue={gender}
                      onValueChange={itemValue => setGender(itemValue)}
                      style={styles.GenderChoice}>
                      <Picker.Item label="-" value="-" />
                      <Picker.Item label="Nam" value="Nam" />
                      <Picker.Item label="N???" value="N???" />
                    </Picker>
                  </View>
                </View>
             
              <View style={styles.EmailInput}>
                <Text style={styles.title}>C??ng ty</Text>
                <View style={styles.emailBox}>
                  <TextInput
                    value={company}
                    onChangeText={companyinput => setCompany(companyinput)}
                    placeholder={company}
                    style={styles.textInput}
                  />
                </View>
              </View>
              <View style={styles.EmailInput}>
                <Text style={styles.title}>C??c k??? n??ng</Text>
                <View style={styles.emailBox}>
                  <TextInput
                    value={skill}
                    onChangeText={skillinput => setSkill(skillinput)}
                    placeholder={skill}
                    style={styles.textInput}
                  />
                </View>
              </View>

              <View style={styles.EmailInput}>
                <Text style={styles.title}>H???c v???n</Text>
                <View style={styles.emailBox}>
                  <TextInput
                    value={degree}
                    onChangeText={degreeinput => setDegree(degreeinput)}
                    placeholder={degree}
                    style={styles.textInput}
                  />
                </View>
              </View>

              <View style={styles.EmailInput}>
                <Text style={styles.title}>M???c ti??u ngh??? nghi???p</Text>
                <View style={styles.emailBox}>
                  <TextInput
                    value={careerGoal}
                    onChangeText={careergoalinput =>
                      setCareergoal(careergoalinput)
                    }
                    placeholder={careerGoal}
                    style={styles.textInput}
                  />
                </View>
              </View>

              <View style={styles.EmailInput}>
                <Text style={styles.title}>T???i CV t??? ??i???n tho???i: </Text>
                <TouchableOpacity activeOpacity={0.5} onPress={selectFile}>
                  <Text style={styles.text3}>T???i l??n</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
          style={styles.button1}
          onPress={() => {
            sendUpdateData();
            setModalVisible(true);
          }}>
          <LinearGradient
            colors={['rgb(254,193,13)', 'rgb(238,49,40)']}
            style={styles.signIn}>
            <Text style={styles.Button1Text}>Ch???nh s???a th??ng tin</Text>
          </LinearGradient>
        </TouchableOpacity>
        </ScrollView>
        <View style={styles.line} />
      
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <TouchableOpacity
            style={styles.smallCenteredView}
            onPress={() => {
              navigation.navigate('LoginScreen'), setModalVisible(false);
            }}>
            <View style={styles.smallModalView}>
              <View style={styles.modalCenter}>
                <CheckIcon />
                <Text style={styles.smallModalText}>
                  C???p nh???t th??ng tin th??nh c??ng
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  Scroll: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  Avatar: {
    height: scale(220),
    width: '150%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigAvatar: {
    height: scale(220),
    width: '100%',
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  avatarContainer: {
    marginTop: scale(40),
    height: scale(120),
    width: scale(120),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderWidth: scale(1),
    elevation: scale(5),
    borderRadius: scale(60),
    overflow: 'hidden',
    borderColor: 'white',
  },
  circle: {
    height: scale(120),
    width: scale(120),
  },
  signIn: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  logo: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    resizeMode: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button1: {
    marginTop: scale(20),
    width: scale(250),
    height: scale(45),
    alignSelf: 'center',
    borderRadius: scale(25),
    marginBottom: scale(280),
    justifyContent: 'center',
    alignItems: 'center',
  },
  Button1Text: {
    fontSize: scale(18),
    color: '#fff',
  },
  text3: {
    color: 'rgb(0,190,90)',
    fontSize: scale(16),
    marginLeft: scale(15),
    textDecorationLine: 'underline',
  },
  nameInput: {
    marginTop: scale(10),
    justifyContent: 'flex-end',
    width: '50%',
    height: scale(40),
    alignItems: 'center',
    borderBottomWidth: scale(1 / 2),
    borderColor: 'white',
    alignSelf: 'center',
  },
  inputText: {
    color: 'white',
    fontSize: scale(18),
    height: '100%',
  },
  InforContainer: {
    width: '90%',
  },
  title: {
    color: 'black',
    fontSize: scale(16),
  },
  EmailInput: {
    height: scale(70),
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  emailBox: {
    height: scale(40),
    borderWidth: scale(1 / 2),
    borderRadius: scale(5),
  },
  textInput: {
    fontSize: scale(16),
  },
  DateInput: {
    height: scale(70),
    justifyContent: 'space-between',
    width: '50%',
  },
  GenderInput: {
    height: scale(70),
    marginLeft: scale(30),
    width: '50%',
    justifyContent: 'space-between',
  },
  DateBox: {
    height: scale(40),
    width: '100%',
    borderWidth: scale(1 / 2),
    borderRadius: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  GenderBox: {
    height: scale(40),
    width: '80%',
    borderWidth: scale(1 / 2),
    borderRadius: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  GenderChoice: {
    height: scale(50),
    width: scale(120),
    fontSize: scale(100),
  },
  TwoInforContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  changeAvatarBut: {
    height: '20%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(100, 54, 54, 0.3)',
    justifyContent: 'center',
  },
  smallCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100,100,100, 0.9)',
  },
  smallModalView: {
    height: scale(300),
    width: scale(300),
    backgroundColor: 'white',
    borderRadius: scale(5),
    alignItems: 'center',
    shadowColor: '#000',
    elevation: scale(5),
    justifyContent: 'center',
    padding: scale(8),
  },
  smallModalText: {
    color: 'black',
    fontSize: scale(15),
    textAlign: 'center',
  },
  modalCenter: {
    justifyContent: 'space-between',
    height: scale(150),
    alignItems: 'center',
  },
  line: {
    backgroundColor: 'black',
    width: '100%',
    height: scale(1 / 2),
  },
});
