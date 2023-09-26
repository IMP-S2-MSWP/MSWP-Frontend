import React from 'react';
import { View, Text, StyleSheet, ScrollView, Animated,StatusBar, Dimensions} from 'react-native';
import CustomButton from '../components/Button/CustomButton';
import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect, useRef } from 'react';
import {Button,Checkbox,Input,useTheme, Pressable, Box, HStack, Badge, Spacer, Flex, Switch, Image, Center} from "native-base"
import { TextInput } from 'react-native-gesture-handler';
import PagerView from "react-native-pager-view";
import { NavigationContainer } from '@react-navigation/native';
import UserListpage from "./MainViewPager/UserListPage";
import Beaconlistpage from "./MainViewPager/BeaconListPage";
const MainScreen = (props) => {
  const theme = useTheme()
  const [user, setUser] = useState([]);
  const [pageIndex,setPageIndex] = useState(0);
  const pagerRef = useRef(null);


  const handleUserTextClick=()=>{
    if(pageIndex==1){
    setPageIndex(prevPageIndex=> prevPageIndex-1)
       pagerRef.current.setPage(pageIndex -1);
    }
}
const handleBeaconTextClick=()=>{
  if(pageIndex==0){
     setPageIndex(prevPageIndex=> prevPageIndex+1)
     pagerRef.current.setPage(pageIndex +1);
  }
}

  const toggleList = () => {
    // 스위치를 토글할 때 호출되는 함수
    setIsFirstListVisible(!isFirstListVisible); // 현재 상태를 반대로 설정
  };
  return (
    <View style={{flex :1}}>
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
        }} p="5" rounded="8" borderWidth="1" borderColor="coolGray.300">
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      <Pressable onPress={() => {handleUserTextClick()}}>
        <Text style={pageIndex === 0 ? { fontWeight: 'bold' } : null}>User</Text>
      </Pressable>

      <Pressable onPress={() => {handleBeaconTextClick()}}>
        <Text style={pageIndex === 1 ? { fontWeight: 'bold' } : null}>Beacon</Text>
      </Pressable>
    </View>
      </View>
      <PagerView ref={pagerRef} style={styles.container} initialPage={1} onPageSelected={e=>setPageIndex(e.nativeEvent.position)}>
        <UserListpage key="0"/>
        <Beaconlistpage key="1" />
      </PagerView> 
    </View>

  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor:"#ffffff"
  }, 
  container: {
    flex :1,
    backgroundColor:"#ffffff"
  },
});

export default MainScreen;