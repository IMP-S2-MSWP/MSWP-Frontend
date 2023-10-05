import React from 'react';
import Check from '../../components/Lottie/Check'
import { Button,Stack} from "native-base";
import { View, Text, TextInput } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import style from "../../components/Style/Signup/style"
const CompletePage = (props) => {
  const navigation = useNavigation();

    const invalidName12 = {
        height: 27,
        fontFamily: "LeferiBaseType",
        fontSize: 22,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0.47,
        textAlign: "left",
        marginTop: 50
      };
      const invalidName = {
        height: 20,
        fontFamily: "LeferiBaseType",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0.42,
        textAlign: "center",
        color: "#ffffff"
      };
    return (
    <View style={{flex:1,alignItems:"center"}}>
    <Text style={invalidName12}>가입 완료!</Text>
    <LottieView  style={{marginTop: -40,height:"70%", width:"70%"}} source={require('../../components/Lottie/source/Check.json')} autoPlay loop={false}/>
    <Button title="next" style={{...style.button_style,bottom:-50,left:0}} onPress={()=>navigation.navigate('Login')}>
    <Text style={invalidName}>로그인 하기</Text>
    </Button>
     </View>
    )
  
}

export default CompletePage