import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomButton from '../components/Button/CustomButton';
import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Input,FormControl,WarningOutlineIcon,Stack,Button} from "native-base"
import { TextInput } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Mainstyle from '../components/Style/Mainstyle';
import { useNavigation } from '@react-navigation/native';
import style from "../components/Style/Signup/style"
import LoginForm from '../components/LoginForm';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { useUser } from '../stores/UserContext';

const LoginScreen = () => {
  const [userData, setUserData] = useState({
    id: '',
    password: '',
  });
  const navigation = useNavigation();

  const handleInputChange = (name) => (text) => {
    setUserData((prevData) => ({
      ...prevData,
      [name]: text,
    }));
  };
  const { user, setUser } = useUser();
  const handleLogin = () => {
    axios.post('http://192.168.0.16:8080/api/login', userData)
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
        } else {
          alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
      })
      .catch(error => {
        console.error(error);
        alert('로그인 오류가 발생했습니다.');
      });
  };
    return(
        <View  style={{flex :1, backgroundColor:"white",alignItems:"center"}}>
          <FormControl >
            <Stack width= "335" mx="5" mt ='60'>
              <FormControl.Label><Text style={style.form_title_style}>아이디</Text></FormControl.Label>
              <Input size="xl" variant ='underlined' onChangeText={handleInputChange('id')} value={userData.username} placeholder="아이디 입력" style={style.form_input_style} />
                           </Stack>
          </FormControl>
          <FormControl >
            <Stack width= "335" mx="5" mt ='30'>
              <FormControl.Label><Text style={style.form_title_style}>비밀번호</Text></FormControl.Label>
              <Input size="xl" variant ='underlined' type ="password" onChangeText={handleInputChange('password')} value={userData.password} placeholder="비밀번호 입력" style={style.form_input_style} />

                          </Stack>
          </FormControl>
          <Button title="next" onPress={()=>{handleLogin()}} style={{...style.login_button_style, position:"absolute",bottom:30}}>
            <Text style={style.invalidName}>로그인</Text>
          </Button>
      </View>
      
        );

}
export default LoginScreen;