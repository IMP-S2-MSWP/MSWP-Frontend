import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Main from '../screens/MainScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import MypageScreen from '../screens/MypageScreen';
import BeaconRegist from '../screens/BeaconRegist';
import GroupChat from '../screens/Gc_Beacon_Create';
import Advertisement from '../screens/Ad_Beacon_Create';
import Ad_Beacon_Update from '../screens/Ad_Beacon_Update';
const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#000000',
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back',
};
// const homecomponentoption = {
//    headerLeft: ({onPress}) => (
//                   <TouchableOpacity onPress={onPress} style={{flexDirection: 'row', justifyContent: "center",alignItems: 'center'}}>
//                       <Icon  name="ios-chevron-back-outline" size={25} color="#0080ff" style={{marginLeft:10}}/>
//                       <Text style={{color:'#0080ff'}}>목록</Text>
//                    </TouchableOpacity>
//                  ),
//     headerTitleAlign: 'center',
//     headerRight: ({onPress}) => (
//       <TouchableOpacity onPress={onPress}>
//         <Icon  name="ios-ellipsis-horizontal-circle" size={20} color="#0080ff" style={{marginLeft:10}}/>
//       </TouchableOpacity>
//     ),
// };

const Profile_Stack_Navigator = ({navigation, route}) => {
  return (
    <Stack.Navigator
      initialRouteName="마이페이지"
      screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="마이페이지"
        component={MypageScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="광고수정"
        component={Ad_Beacon_Update}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="비콘등록"
        component={BeaconRegist}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="광고"
        component={Advertisement}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="그룹채팅생성"
        component={GroupChat}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Profile_Stack_Navigator;
