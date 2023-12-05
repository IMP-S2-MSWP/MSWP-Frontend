import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Main_Stack_Navigator from './Main_Stack_Navigator';
import Chat_Stack_Navigator from './Chat_Stack_Navigator';
import Profile_Stack_Navigator from './Profile_Stack_Navigator';
import Beacon_Stack_Navigator from './Beacon_Stack_Navigator';
import LikeListScreen from '../screens/LikeListScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Main_Tab_Navigator = () => {
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
          let iconColor;
          if (route.name === '메인') {
            iconName = focused ? 'home' : 'home-outline';
            iconColor = focused ? '#2679ff' : '#808588'; // 갈색
          } else if (route.name === '채팅') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            iconColor = focused ? '#2679ff' : '#808588'; // 갈색
          } else if (route.name === '비콘채팅') {
            iconName = focused ? 'bluetooth' : 'bluetooth-outline';
            iconColor = focused ? '#2679ff' : '#808588'; // 갈색
          } else if (route.name === '좋아요') {
            iconName = focused ? 'heart' : 'heart-outline';
            iconColor = focused ? '#2679ff' : '#808588'; // 갈색
          } else if (route.name === '프로필') {
            iconName = focused ? 'stepforward' : 'person-outline';
            iconColor = focused ? '#2679ff' : '#808588'; // 갈색
          }

          return <Ionicons name={iconName} size={size} color={iconColor} />;
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
        component={LikeListScreen}
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
