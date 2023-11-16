import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import CustomButton from '../components/Button/CustomButton';
import {useIsFocused} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import {
<<<<<<< HEAD
  Input,
  FormControl,
  WarningOutlineIcon,
  Stack,
  Button,
=======
  Button,
  Checkbox,
  Input,
  useTheme,
  Pressable,
  Box,
  HStack,
  Badge,
  Spacer,
  Flex,
  Icon,
  MaterialIcons,
>>>>>>> MOB-34--
} from 'native-base';
import {TextInput} from 'react-native-gesture-handler';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Mainstyle from '../components/Style/Mainstyle';
import {useNavigation} from '@react-navigation/native';
<<<<<<< HEAD
import style from '../components/Style/Signup/style';
import LoginForm from '../components/LoginForm';
import axios from 'axios';
import {StackNavigationProp} from '@react-navigation/stack';
import {useUser} from '../stores/UserContext';
// import {API_URL} from './env';
import {API_URL} from '../env';

const LoginScreen = () => {
  const [userData, setUserData] = useState({
    id: '',
    password: '',
  });
  const navigation = useNavigation();

  const handleInputChange = name => text => {
    setUserData(prevData => ({
      ...prevData,
      [name]: text,
    }));
  };
  const {user, setUser} = useUser();
  const handleLogin = () => {
    console.log(API_URL + '/api/login');
    axios
      .post(API_URL + '/api/login', userData)
      .then(response => {
        if (response.data != null) {
          console.log(response.data);
          // setUser를 사용하여 전역 상태를 업데이트합니다.
          setUser({
            id: response.data.id,
            name: response.data.name,
            nickname: response.data.nickname,
            birth: response.data.birth,
            gender: response.data.gender,
            uuid: response.data.uuid,
            image: response.data.image,
            message: response.data.message,
          });
          navigation.navigate('Main');
=======
import Loginstyle from '../components/Style/Loginstyle';
import LoginForm from '../components/LoginForm';
import axios from 'axios';
import {StackNavigationProp} from '@react-navigation/stack';
const LoginScreen = props => {
  const navigation = useNavigation(); // 네비게이션 객체를 가져옵니다.
  const [loginStatus, setLoginStatus] = useState('');
  const handleLogin = (id, password) => {
    // 로그인 요청 보내기
    const requestData = {
      id,
      password,
    };
    navigation.navigate('Main');

    axios
      .post('http://192.168.0.16:8080/api/login', requestData)
      .then(response => {
        if (response.data != null) {
          console.log(response.data);
          setLoginStatus('로그인 성공');
          // 로그인 성공 시 처리할 로직 작성
          //navigation.navigate('Main')
          navigation.navigate('메인페이지');

          // 다음 컴포넌트로 이동하는 로직 작성
>>>>>>> MOB-34--
        } else {
          alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
      })
      .catch(error => {
        console.error(error);
        alert('로그인 오류가 발생했습니다.');
      });
  };
  return (
<<<<<<< HEAD
    <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <FormControl>
        <Stack width="335" mx="5" mt="60">
          <FormControl.Label>
            <Text style={style.form_title_style}>아이디</Text>
          </FormControl.Label>
          <Input
            size="xl"
            variant="underlined"
            onChangeText={handleInputChange('id')}
            value={userData.username}
            placeholder="아이디 입력"
            style={style.form_input_style}
          />
        </Stack>
      </FormControl>
      <FormControl>
        <Stack width="335" mx="5" mt="30">
          <FormControl.Label>
            <Text style={style.form_title_style}>비밀번호</Text>
          </FormControl.Label>
          <Input
            size="xl"
            variant="underlined"
            type="password"
            onChangeText={handleInputChange('password')}
            value={userData.password}
            placeholder="비밀번호 입력"
            style={style.form_input_style}
          />
        </Stack>
      </FormControl>
      <Text>{API_URL}</Text>
      <Button
        title="next"
        onPress={() => {
          handleLogin();
        }}
        style={{...style.login_button_style, position: 'absolute', bottom: 30}}>
        <Text style={style.invalidName}>로그인</Text>
      </Button>
    </View>
  );
};
=======
    <View style={Loginstyle.container}>
      <Text style={Loginstyle.texts}>아이디</Text>
      <Input
        w={{base: '90%', md: '25%'}}
        variant="underlined"
        placeholder="아이디 입력"
        style={{fontSize: 16}}
      />
      <Text style={Loginstyle.texts}>비밀번호</Text>

      <Input
        w={{base: '90%', md: '25%'}}
        type={'password'}
        variant="underlined"
        placeholder="비밀번호 입력"
        style={{fontSize: 16}}
      />

      <CustomButton
        title="로그인"
        onPress={() => navigation.navigate('Main')}
        //onPress={() => navigation.navigate('BeaconR')}
      />
    </View>
  );
};

>>>>>>> MOB-34--
export default LoginScreen;
