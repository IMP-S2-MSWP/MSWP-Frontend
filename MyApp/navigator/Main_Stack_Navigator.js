import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View,TouchableOpacity, Text } from 'react-native';
import  Icon from 'react-native-vector-icons/Ionicons';
import Main from "../screens/MainScreen";

import BeaconScreen from '../screens/BeaconScreen';
import MypageScreen from '../screens/MypageScreen';
import SettingScreen from '../screens/SettingScreen';



const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#000000",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};
const homecomponentoption = {
   headerLeft: ({onPress}) => (
                  <TouchableOpacity onPress={onPress} style={{flexDirection: 'row', justifyContent: "center",alignItems: 'center'}}>
                      <Icon  name="ios-chevron-back-outline" size={25} color="#0080ff" style={{marginLeft:10}}/>
                      <Text style={{color:'#0080ff'}}>목록</Text>
                   </TouchableOpacity>                 
                 ),
    headerTitleAlign: 'center',
    headerRight: ({onPress}) => (
      <TouchableOpacity onPress={onPress}>
        <Icon  name="ios-ellipsis-horizontal-circle" size={20} color="#0080ff" style={{marginLeft:10}}/>
      </TouchableOpacity>
    ),
};

const Main_Stack_Navigator = () => {
    return (
      <Stack.Navigator initialRouteName="메인페이지" screenOptions={screenOptionStyle}>
        <Stack.Screen name="메인페이지" component={Main} options={{ headerShown:false}}/>
        <Stack.Screen name="Mypage" component={MypageScreen} />
        <Stack.Screen name="Beacon" component={BeaconScreen}/>

        <Stack.Screen name="Setting" component={SettingScreen}/>

      </Stack.Navigator>
    );
  };

export default Main_Stack_Navigator