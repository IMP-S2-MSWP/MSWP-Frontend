import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Main from '../screens/MainScreen';

import ChatScreen from '../screens/ChatScreen';
import ChatListScreen from '../screens/ChatListScreen';
import BeaconListPage from '../screens/MainViewPager/BeaconListPage';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

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

const Chat_Stack_Navigator = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    // 여기에서 'Chat' 및 'ChatList' 스크린에 대한 탭바 가시성 설정을 진행합니다.
    if (routeName === 'Chat') {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: 'undefined'}});
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator
      initialRouteName="ChatList"
      screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="메인페이지"
        component={Main}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Beacon"
        component={BeaconListPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Chat_Stack_Navigator;
