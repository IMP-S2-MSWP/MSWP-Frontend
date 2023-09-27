import React from 'react';
import Check from '../../components/Lottie/Check'
import { Button,Stack} from "native-base";
import { View, Text, TextInput } from 'react-native';
import LottieView from 'lottie-react-native';
const CompletePage = () => {
    const asd = {
        backgroundColor: "#2679ff",
        borderRadius: 8,
        width: 335,
        height: 56,
      };
    const invalidName12 = {
        height: 27,
        fontFamily: "LeferiBaseType",
        fontSize: 22,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0.47,
        textAlign: "left",
        marginTop: 150
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
    <View style={{alignItems:"center"}}>
    <Text style={invalidName12}>가입 완료!</Text>
    <LottieView  style={{marginTop: -80,height:"70%", width:"70%"}} source={require('../../components/Lottie/source/Check.json')} autoPlay loop={false}/>
    <Button title="next" style={asd} >
    <Text style={invalidName}>로그인 하기</Text>
    </Button>
     </View>
    )
  
}

export default CompletePage