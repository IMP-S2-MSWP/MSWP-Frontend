import React from 'react';
import Check from '../../components/Lottie/Check'
import { Button,Stack} from "native-base";
import { View, Text, TextInput } from 'react-native';
import LottieView from 'lottie-react-native';
const CompletePage = () => {
    const asd13 = {
        backgroundColor: "#2679ff",
        borderRadius: 8,
        width: 335,
        height: 56,
        bottom:-50
      };
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
    <Button title="next" style={asd13} >
    <Text style={invalidName}>로그인 하기</Text>
    </Button>
     </View>
    )
  
}

export default CompletePage