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
<<<<<<< HEAD
import LottieView from 'lottie-react-native';
=======
>>>>>>> MOB-34--
import PagerView from 'react-native-pager-view';
import {NavigationContainer} from '@react-navigation/native';
import UserListpage from './MainViewPager/UserListPage';
import Beaconlistpage from './MainViewPager/BeaconListPage';
<<<<<<< HEAD
import useBluetoothAdvertiser from '../components/Bluetooth/BluetoothAdvertiser';
import {useUser} from '../stores/UserContext';
// import {API_URL} from '@env';
import {API_URL} from './../env';
import axios from 'axios';
const MainScreen = props => {
  const theme = useTheme();
  const [pageIndex, setPageIndex] = useState(0);
  const [heartList, setHeartList] = useState([]);
  const [heartcount, setHeartcount] = useState(0);
  const pagerRef = useRef(null);
  const {startAdvertising} = useBluetoothAdvertiser();
  const [list, setList] = useState([]);
  const {user} = useUser();
  useEffect(() => {
    startAdvertising();
    heartlist(user.id);
    const scanInterval = setInterval(() => {
      heartlist(user.id);
    }, 6000);
    return () => {
      clearInterval(scanInterval);
    };
  }, []);
=======
const MainScreen = props => {
  const theme = useTheme();
  const [user, setUser] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const pagerRef = useRef(null);

>>>>>>> MOB-34--
  const handleUserTextClick = () => {
    if (pageIndex == 1) {
      setPageIndex(prevPageIndex => prevPageIndex - 1);
      pagerRef.current.setPage(pageIndex - 1);
<<<<<<< HEAD
    }
  };
  const handleBeaconTextClick = () => {
    if (pageIndex == 0) {
      setPageIndex(prevPageIndex => prevPageIndex + 1);
      pagerRef.current.setPage(pageIndex + 1);
    }
  };
  useEffect(() => {
    const duplicates = list.filter(item => heartList.includes(item));
    setHeartcount(duplicates.length);
  }, [list, heartList]);

  async function heartlist(id) {
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
=======
    }
  };
  const handleBeaconTextClick = () => {
    if (pageIndex == 0) {
      setPageIndex(prevPageIndex => prevPageIndex + 1);
      pagerRef.current.setPage(pageIndex + 1);
    }
  };
>>>>>>> MOB-34--

  const toggleList = () => {
    // 스위치를 토글할 때 호출되는 함수
    setIsFirstListVisible(!isFirstListVisible); // 현재 상태를 반대로 설정
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.center}>
        <Box
          borderColor="black"
          p="5"
          borderBottomWidth="1"
          mb="5"
          w="370"
          h="120">
          <HStack alignItems="center">
            <Image
              source={{
<<<<<<< HEAD
                uri: API_URL + '/images/' + user.image,
=======
                uri: 'https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/09/18/1e586277-48ba-4e8a-9b98-d8cdbe075d86.jpg',
>>>>>>> MOB-34--
              }}
              alt="Alternate Text"
              borderRadius="50"
              w="20"
              h="20"
              mb="1"
            />

            <VStack ml="3">
<<<<<<< HEAD
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                {user.name}
              </Text>
              <Text>{user.birth}</Text>
              <Text>{heartcount}</Text>
            </VStack>
            <Spacer />
            <LottieView
              style={{height: '90%', width: '100%', marginLeft: -50}}
              source={require('../components/Lottie/source/heart.json')}
              autoPlay
            />
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{heartcount}</Text>
=======
              <Text style={{fontWeight: 'bold', fontSize: 16}}>카리나나</Text>
              <Text>저는 이상용을 좋아해요</Text>
            </VStack>
            <Spacer />
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Coraz%C3%B3n.svg/800px-Coraz%C3%B3n.svg.png',
              }}
              alt="Alternate Text"
              size="xs"
              resizeMode="contain"
              h="16"
              w="16"
            />
>>>>>>> MOB-34--
          </HStack>
        </Box>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Pressable
            style={{flex: 1, alignItems: 'center'}}
            onPress={handleUserTextClick}>
            <Text
              style={[
                {fontSize: 18},
                pageIndex === 0
                  ? {fontWeight: 'bold', borderBottomWidth: 1}
                  : null,
              ]}>
              User
            </Text>
          </Pressable>

          <Pressable
            style={{flex: 1, alignItems: 'center'}}
            onPress={handleBeaconTextClick}>
            <Text
              style={[
                {fontSize: 18},
                pageIndex === 1
                  ? {fontWeight: 'bold', borderBottomWidth: 1}
                  : null,
              ]}>
              Beacon
            </Text>
          </Pressable>
        </View>
      </View>
      <PagerView
        ref={pagerRef}
        style={styles.container}
<<<<<<< HEAD
        initialPage={1}
        onPageSelected={e => setPageIndex(e.nativeEvent.position)}>
        <Beaconlistpage key="0" />
        <UserListpage key="1" list={list} setList={setList} />
=======
        initialPage={0}
        onPageSelected={e => setPageIndex(e.nativeEvent.position)}>
        <UserListpage key="0" />
        <Beaconlistpage key="1" />
>>>>>>> MOB-34--
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
