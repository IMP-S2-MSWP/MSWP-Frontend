import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View,TouchableOpacity, Text } from 'react-native';
import  Icon from 'react-native-vector-icons/Ionicons';
import Main from "../screens/MainScreen";

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
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="메인페이지" component={Main} options={{ headerTitle:() => (
              <View style={{flexDirection: 'row',alignItems:"center"}}>
                <Icon  name={"home"} size={20} color="white" />
                <Text style={{color:'white',marginLeft: 5}}>미리알림</Text>
              </View>
      )}}/>
        <Stack.Screen name="마이페이지" component={Main} options={homecomponentoption} />
        <Stack.Screen name="주변 찾기" component={Main} options={homecomponentoption} />
        <Stack.Screen name="주변 비콘 찾기" component={Main}  options={homecomponentoption}/>
      </Stack.Navigator>
    );
  };

export default Main_Stack_Navigator