import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import Main_Stack_Navigator from './Main_Stack_Navigator';
import Chat_Stack_Navigator from './Chat_Stack_Navigator';
import Profile_Stack_Navigator from './Profile_Stack_Navigator';
import MypageScreen from '../screens/MypageScreen';
import SettingScreen from '../screens/SettingScreen';
import BeaconListScreen from '../screens/BeaconListScreen';
import Beacon_Stack_Navigator from './Beacon_Stack_Navigator';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Menu,
  HamburgerIcon,
  Pressable,
  Button,
  HStack,
  Badge,
  Spacer,
  Flex,
} from 'native-base';

const Tab = createBottomTabNavigator();

const Main_Tab_Navigator = () => {
  const theme = useTheme();
  const navigation = useNavigation(); // <-- 여기에 추가
  return (
    <Tab.Navigator
      initialRouteName="메인"
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'black',
        inactiveBackgroundColor: 'white',
        labelPosition: 'below-icon',
      }}
      screenOptions={({route}) => ({
        tabBarLabel: route.name,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === '메인') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === '채팅') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === '비콘채팅') {
            iconName = focused ? 'bluetooth' : 'bluetooth-outline';
          } else if (route.name === '좋아요') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === '프로필') {
            iconName = focused ? 'stepforward' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name="메인"
        component={Main_Stack_Navigator}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="채팅"
        component={Chat_Stack_Navigator}
        listeners={({navigation}) => ({
          tabPress: e => {
            // 탭이 눌렸을 때 스택 초기화
            navigation.navigate('채팅', {
              screen: 'ChatList',
            });
          },
        })}
        options={{
          headerShown: false,
          tabBarStyle: {display: 'none'},
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="비콘채팅"
        component={Beacon_Stack_Navigator}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="좋아요"
        component={Main_Stack_Navigator}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="프로필"
        component={Profile_Stack_Navigator}
        options={{headerShown: false, tabBarVisible: false}}
      />
    </Tab.Navigator>
  );
};

export default Main_Tab_Navigator;
