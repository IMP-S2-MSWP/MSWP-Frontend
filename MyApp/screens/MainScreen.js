import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  StatusBar,
  Dimensions,
} from 'react-native';
import CustomButton from '../components/Button/CustomButton';
import {useIsFocused} from '@react-navigation/native';
import {useState, useEffect, useRef} from 'react';
import {
  Button,
  Checkbox,
  Input,
  useTheme,
  Pressable,
  Box,
  HStack,
  Badge,
  Spacer,
  Flex,
  Switch,
  Image,
  Center,
  VStack,
} from 'native-base';
import {TextInput} from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PagerView from 'react-native-pager-view';
import {NavigationContainer} from '@react-navigation/native';
import UserListpage from './MainViewPager/UserListPage';
import Beaconlistpage from './MainViewPager/BeaconListPage';
import useBluetoothAdvertiser from '../components/Bluetooth/BluetoothAdvertiser';
import {useUser} from '../stores/UserContext';
import ProfileSettingsModal from './ProfileSettingsModal';
// import {API_URL} from '@env';
import {API_URL, Image_URL} from './../env';
import axios from 'axios';
const MainScreen = props => {
  const theme = useTheme();
  const [pageIndex, setPageIndex] = useState(0);
  const [heartList, setHeartList] = useState([]);
  const [heartcount, setHeartcount] = useState(0);
  const pagerRef = useRef(null);
  const {startAdvertising} = useBluetoothAdvertiser();
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]); // Initialize users as empty array
  const {user} = useUser();
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);

  const navigation = useNavigation(); // <-- 여기에 추가

  useEffect(() => {
    startAdvertising();
    fheartlist(user.id);
    const scanInterval = setInterval(() => {
      fheartlist(user.id);
    }, 6000);
    return () => {
      clearInterval(scanInterval);
    };
  }, []);
  const handleUserTextClick = () => {
    if (pageIndex == 1) {
      setPageIndex(prevPageIndex => prevPageIndex - 1);
      pagerRef.current.setPage(pageIndex - 1);
    }
  };
  const handleBeaconTextClick = () => {
    if (pageIndex == 0) {
      setPageIndex(prevPageIndex => prevPageIndex + 1);
      pagerRef.current.setPage(pageIndex + 1);
    }
  };
  const handleOpenProfileModal = () => {
    setProfileModalVisible(true);
  };

  const handleCloseProfileModal = () => {
    setProfileModalVisible(false);
  };
  useEffect(() => {
    const duplicates = list.filter(item => heartList.includes(item));
    setHeartcount(duplicates.length);
  }, [list, heartList]);

  useEffect(() => {
    console.log('users', users);
  }, [users]);

  async function fheartlist(id) {
    try {
      const response = await axios.post(API_URL + '/api/test', {
        id: id,
      });
      // Handle the server response
      if (response.data) {
        console.log('Service UUIDs check was successful.');
        setHeartList(response.data); // Assuming updateUsers function is designed to handle the response data properly.
      } else {
        console.log('There was a problem checking the Service UUIDs.');
      }
      return response.data; // Return the data for further processing if needed
    } catch (error) {
      console.error(
        'An error occurred while checking the new service UUIDs:',
        error,
      );
      return error; // Returning error for handling it appropriately in the calling context
    }
  }
  const HeartIconWithText = ({text, size, color, textStyle, iconStyle}) => {
    return (
      <View style={{alignItems: 'center'}}>
        <Ionicons name="heart" size={size} color={color} style={iconStyle} />
        <Text style={textStyle}>{text}</Text>
      </View>
    );
  };

  const toggleList = () => {
    // 스위치를 토글할 때 호출되는 함수
    setIsFirstListVisible(!isFirstListVisible); // 현재 상태를 반대로 설정
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.center}>
        <HStack>
          <Text
            style={{
              fontWeight: 'bold',
              margin: 14,
              fontSize: 20,
              alignSelf: 'flex-start',
              color: '#2679ff',
            }}>
            Wennect
          </Text>
          <Spacer />
          <Pressable p="4" onPress={handleOpenProfileModal}>
            <Ionicons name="settings" size={30} color="#2679ff" />
          </Pressable>
          <ProfileSettingsModal
            isVisible={isProfileModalVisible}
            onClose={handleCloseProfileModal}
          />
        </HStack>
        <Box
          borderColor="#2679ff"
          p="5"
          //borderBottomWidth="0.4"
          borderBottomWidth="2"
          //borderTopWidth="2"
          mb="5"
          w="370"
          h="110">
          <HStack alignItems="center">
            <Image
              source={{
                uri: Image_URL + '/user/' + user.image,
              }}
              alt="Alternate Text"
              borderRadius="50"
              w="60"
              h="60"
              mb="1"
            />

            <VStack ml="3">
              <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 6}}>
                {user.name}
              </Text>
              <Text style={{marginLeft: 6, fontSize: 13}}>{user.message}</Text>
            </VStack>
            <Spacer />
            <HeartIconWithText
              text={heartcount} // 여기에 표시할 텍스트 입력
              size={30}
              color="#DE3163"
              textStyle={{fontSize: 20, marginRight: 20}} // 텍스트에 대한 스타일 지정
              iconStyle={{
                marginRight: 20,
              }}
            />
          </HStack>
        </Box>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Pressable
            style={{flex: 1, alignItems: 'center'}}
            onPress={handleUserTextClick}>
            {/* <Text
              style={[
                {fontSize: 18},
                pageIndex === 0
                  ? {fontWeight: 'bold', borderBottomWidth: 1}
                  : null,
              ]}>
              User
            </Text> */}
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
            {/* <Text
              style={[
                {fontSize: 18},
                pageIndex === 1
                  ? {fontWeight: 'bold', borderBottomWidth: 1}
                  : null,
              ]}>
              Beacon
            </Text> */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default MainScreen;
