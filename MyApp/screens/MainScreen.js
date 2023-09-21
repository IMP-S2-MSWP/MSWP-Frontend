import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomButton from '../components/Button/CustomButton';
import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import {Button,Checkbox,Input,useTheme,Pressable, Box, HStack, Badge, Spacer, Flex} from "native-base"
import { TextInput } from 'react-native-gesture-handler';
const MainScreen = (props) => {
  const theme = useTheme()
  const [user, setUser] = useState([]);


  const handlePressIn = () => {
    props.navigation.navigate('오늘');
  };
  const handlePressIn2 = () => {
    props.navigation.navigate('예정');
  };
  const handlePressIn3 = () => {
    props.navigation.navigate('전체');
  };
  const handlePressIn4 = () => {
    props.navigation.navigate('완료됨');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.center}>
      <Pressable mt='5' mb="5" w='350' onPress={()=>{
              props.navigation.navigate('Mypage');
            }}>
        {({
        isHovered,
        isFocused,
        isPressed
      }) => {
        return <Box bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"} style={{
          transform: [{
            scale: isPressed ? 0.96 : 1
          }]
        }} p="5" rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300">
              <HStack alignItems="center">
                <Badge colorScheme="darkBlue" _text={{
              color: "white"
            }} variant="solid" rounded="4">
                  마이페이지
                </Badge>
                <Spacer />
                <Text fontSize={10} color="coolGray.800">
                  마이페이지 사진 자리
                </Text>
              </HStack>
              <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl" >
               이름은 이상용
              </Text>
              <View>
                <Text mt="2" fontSize="sm" color="coolGray.700">
                 자기에 대한 소개를 입력
                </Text>
              </View>
              <Flex>
                {isFocused ? <Text mt="2" fontSize={12} fontWeight="medium" textDecorationLine="underline" color="darkBlue.600" alignSelf="flex-start">
                    Read More
                  </Text> : <Text mt="2" fontSize={12} fontWeight="medium" color="darkBlue.600">
                    Read More
                  </Text>}
              </Flex>
            </Box>;
      }}
      </Pressable>

        <View style={{flex:1, flexDirection:'row',}}>
          <Pressable 
            p="2"h="140"
            onPress={()=>{
              props.navigation.navigate('FDevice');
            }}
          >

             {({
        isHovered,
        isPressed
      }) => {
        return <Box bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"} style={{
          transform: [{
            scale: isPressed ? 0.96 : 1
          }]
        }} w="150" h="140"  p="5" rounded="8" shadow={3} borderWidth="1" borderColor="skyblue">
            <Text>주변 기기 찾기</Text>
            </Box>}}
          </Pressable>

          <Pressable
            p="2"h="140"
            onPress={()=>{
              props.navigation.navigate('Beacon');
            }}
          >

             {({
        isHovered,
        isPressed
      }) => {
        return <Box bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"} style={{
          transform: [{
            scale: isPressed ? 0.96 : 1
          }]
        }} w="150" h="140" p="5" rounded="8" shadow={3} borderWidth="1" borderColor="skyblue">
            <Text>비콘 탐색하기</Text>
            </Box>}}
          </Pressable>
        </View>
      <View>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  }, 
  container: {
    flexGrow: 1,
  },
});

export default MainScreen;