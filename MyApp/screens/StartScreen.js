import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomButton from '../components/Button/CustomButton';
import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import {Button,Checkbox,Input,useTheme,Pressable, Box, HStack, Badge, Spacer, Flex} from "native-base"
import { TextInput } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Mainstyle from '../styles/Mainstyle';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const StartScreen = (props) => {
    const navigation = useNavigation(); // 네비게이션 객체를 가져옵니다.
    return(
        <View style={Mainstyle.container}>
        <Image style={Mainstyle.imgStyle} source={require('../img/test.png')}/>
        <Text style={Mainstyle.MainText}>블투러</Text>
        <Text style={Mainstyle.SubText}>너와 나 사이 20M</Text>
         <CustomButton title="시작하기" onPress={() => navigation.navigate('Register')}>

         </CustomButton>
         <Text style={Mainstyle.bottomText} onPress={() => navigation.navigate('Login')}>이미 계정이 있나요? 로그인</Text>
     </View>
      
        );

}
export default StartScreen;