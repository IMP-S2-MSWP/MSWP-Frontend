import React from 'react';
import { View, Text, StyleSheet, ScrollView, Animated,StatusBar, Dimensions} from 'react-native';
import CustomButton from '../components/Button/CustomButton';
import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect, useRef } from 'react';
import {Button,Checkbox,Input,useTheme, Pressable, Box, HStack, Badge, Spacer, Flex, Switch, Image, Center, VStack} from "native-base"
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
      <Box borderColor='black' p="5" borderBottomWidth='1' mb="5" w='370' h='120'>
      <HStack alignItems="center">
   
              <Image
                  source={{
                    uri:"https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/09/18/1e586277-48ba-4e8a-9b98-d8cdbe075d86.jpg"
                  }}
                  alt="Alternate Text" borderRadius='50' w='20' h='20' mb='1'/>
              
             
              <VStack ml='3'>
              <Text style={{fontWeight:"bold", fontSize:16}} >
               카리나
              </Text>  
              <Text>
                저는 이상용을 좋아해요
                </Text>   
              </VStack>         
              <Spacer />
              <Image
                  source={{
                    uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Coraz%C3%B3n.svg/800px-Coraz%C3%B3n.svg.png"
                  }}
                  alt="Alternate Text"
                  size="xs" resizeMode='contain' h='16' w='16'
                />
              </HStack>
      </Box>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  <Pressable style={{ flex: 1, alignItems:'center'}} onPress={handleUserTextClick}>
    <Text style={[{fontSize: 18},pageIndex === 0 ? { fontWeight: 'bold', borderBottomWidth:1} : null]}>User</Text>
  </Pressable>

  <Pressable style={{ flex: 1, alignItems:'center'}} onPress={handleBeaconTextClick}>
    <Text style={[{fontSize: 18},pageIndex === 1 ? { fontWeight: 'bold', borderBottomWidth:1 } : null]}>Beacon</Text>
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