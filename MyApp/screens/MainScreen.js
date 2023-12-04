import {useNavigation} from '@react-navigation/native';
import {
  Box,
  HStack,
  Image,
  Pressable,
  Spacer,
  VStack,
  useTheme,
} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useBluetoothAdvertiser from '../components/Bluetooth/BluetoothAdvertiser';
import {useUser} from '../stores/UserContext';
import Beaconlistpage from './MainViewPager/BeaconListPage';
import UserListpage from './MainViewPager/UserListPage';
import ProfileSettingsModal from './ProfileSettingsModal';
// import {API_URL} from '@env';
import {API_URL, Image_URL} from '../env';
import axios from 'axios';
import styles from '../components/Style/MainStyle/MainScreenStyle';
import WennectTitle from '../components/WennectTitle/WennectTitle';
/**
 * MainScreen 컴포넌트는 애플리케이션의 메인 화면을 구성합니다.
 * @component
 */
const MainScreen = () => {
  const theme = useTheme();
  const [pageIndex, setPageIndex] = useState(0);
  const [heartList, setHeartList] = useState([]);
  const [heartcount, setHeartcount] = useState(0);
  const pagerRef = useRef(null);
  const {startAdvertising} = useBluetoothAdvertiser();
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]); // 사용자 목록을 빈 배열로 초기화합니다.
  const {user} = useUser();
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);

  const navigation = useNavigation(); // <-- Navigation hook을 사용하기 위해 추가

  // Bluetooth 광고 시작 및 주기적인 HeartList 갱신을 위한 useEffect
  useEffect(() => {
    startAdvertising();
    fetchHeartList(user.id);
    const scanInterval = setInterval(() => {
      fetchHeartList(user.id);
    }, 6000);
    return () => {
      clearInterval(scanInterval);
    };
  }, []);

  // HeartList 및 사용자 목록 갱신 시 실행되는 useEffect
  useEffect(() => {
    const duplicates = list.filter(item => heartList.includes(item));
    setHeartcount(duplicates.length);
  }, [list, heartList]);

  useEffect(() => {
    console.log('users', users);
  }, [users]);

  /**
   * 서버로부터 HeartList를 가져오는 함수
   * @async
   * @function
   * @param {string} id - 사용자 ID
   * @returns {Promise<Array>} - 서버 응답으로부터 얻은 HeartList 배열
   */
  async function fetchHeartList(id) {
    try {
      const response = await axios.post(API_URL + '/api/like/me', {id});
      if (response.data) {
        setHeartList(response.data);
      } else {
        console.log('There was a problem checking the Service UUIDs.');
      }
      return response.data;
    } catch (error) {
      console.error(
        'An error occurred while checking the new service UUIDs:',
        error,
      );
      return error;
    }
  }

  /**
   * 하트 아이콘과 텍스트를 표시하는 컴포넌트
   * @component
   * @param {Object} props - HeartIconWithText 컴포넌트에 전달되는 속성값
   * @param {string} props.text - 표시될 텍스트
   * @param {number} props.size - 아이콘 크기
   * @param {string} props.color - 아이콘 및 텍스트 색상
   * @param {Object} props.textStyle - 텍스트에 적용될 스타일 객체
   * @param {Object} props.iconStyle - 아이콘에 적용될 스타일 객체
   */
  const HeartIconWithText = ({text, size, color, textStyle, iconStyle}) => {
    return (
      <View style={{alignItems: 'center'}}>
        <Ionicons name="heart" size={size} color={color} style={iconStyle} />
        <Text style={textStyle}>{text}</Text>
      </View>
    );
  };

  /**
   * 사용자 목록과 비콘 목록을 전환하는 함수
   * @function
   */
  const handleUserTextClick = () => {
    if (pageIndex === 1) {
      setPageIndex(prevPageIndex => prevPageIndex - 1);
      pagerRef.current.setPage(pageIndex - 1);
    }
  };

  /**
   * 비콘 목록과 사용자 목록을 전환하는 함수
   * @function
   */
  const handleBeaconTextClick = () => {
    if (pageIndex === 0) {
      setPageIndex(prevPageIndex => prevPageIndex + 1);
      pagerRef.current.setPage(pageIndex + 1);
    }
  };

  /**
   * 프로필 설정 모달을 열기 위한 함수
   * @function
   */
  const handleOpenProfileModal = () => {
    setProfileModalVisible(true);
  };

  /**
   * 프로필 설정 모달을 닫기 위한 함수
   * @function
   */
  const handleCloseProfileModal = () => {
    setProfileModalVisible(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={styles.center}>
        {/* 헤더 영역 */}
        <HStack>
          <WennectTitle />
          <Spacer />
          <Pressable p="4" onPress={handleOpenProfileModal}>
            <Ionicons name="settings" size={30} color="grey" />
          </Pressable>
          <ProfileSettingsModal
            isVisible={isProfileModalVisible}
            onClose={handleCloseProfileModal}
          />
        </HStack>

        {/* 사용자 정보 영역 */}
        <Box
          borderColor="#2679ff"
          p="5"
          borderBottomWidth="2"
          mb="5"
          w="370"
          h="110"
          backgroundColor="blue">
          <HStack alignItems="center">
            <Image
              source={{
                uri:
                  Image_URL + '/user/' + user.image + '?cache=' + Math.random(),
              }}
              alt="Alternate Text"
              borderRadius="50"
              w="60"
              h="60"
              mb="1"
            />
            <VStack ml="3">
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userMessage}>{user.message}</Text>
            </VStack>
            <Spacer />
            <HeartIconWithText
              text={heartcount}
              size={30}
              color="#DE3163"
              textStyle={{fontSize: 20, marginRight: 20}}
              iconStyle={{
                marginRight: 20,
              }}
            />
          </HStack>
        </Box>

        {/* 탭 버튼 영역 */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Pressable
            style={{flex: 1, alignItems: 'center'}}
            onPress={handleUserTextClick}>
            <Ionicons
              style={[
                pageIndex === 0
                  ? {
                      color: '#2679ff',
                      borderBottomWidth: 1,
                      borderColor: '#2679ff',
                    }
                  : null,
              ]}
              name="people"
              size={30}
              color="#808588"
            />
          </Pressable>
          <Pressable
            style={{flex: 1, alignItems: 'center'}}
            onPress={handleBeaconTextClick}>
            <Ionicons
              style={[
                pageIndex === 1
                  ? {
                      color: '#2679ff',
                      borderBottomWidth: 1,
                      borderColor: '#2679ff',
                    }
                  : null,
              ]}
              name="bluetooth"
              size={30}
              color="#808588"
            />
          </Pressable>
        </View>
      </View>

      {/* 페이지 뷰어 */}
      <PagerView
        ref={pagerRef}
        style={styles.container}
        initialPage={0}
        onPageSelected={e => setPageIndex(e.nativeEvent.position)}>
        <UserListpage
          key="0"
          list={list}
          setList={setList}
          users={users}
          setUsers={setUsers}
        />
        <Beaconlistpage key="1" users={users} setUsers={setUsers} />
      </PagerView>
    </SafeAreaView>
  );
};

export default MainScreen;
