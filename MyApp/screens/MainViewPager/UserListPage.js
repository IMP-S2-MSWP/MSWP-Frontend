// UserListPage.js

import React, {useRef, useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import useBluetoothScanner from '../../components/BluetoothScanner';
// import {API_URL} from '@env';
import {API_URL, Image_URL} from '../../env';
import {useUser} from '../../stores/UserContext';
import UserList from '../../components/Listitem/UserList';
import {
  addHeart,
  heartlist,
  checkNewDeviceServiceUUIDs,
} from '../../components/Hook/api/UserList_API';
import {useNavigation} from '@react-navigation/native';
// Dummy data for demonstration

const UserListPage = props => {
  const [users, setUsers] = useState([]); // Initialize users as empty array
  const {devices, startScan, scanning} = useBluetoothScanner();
  const [heartList, setHeartList] = useState([]);
  const lottieRefs = useRef({});
  const {user} = useUser();
  const navigation = useNavigation();

  useEffect(() => {
    extractIdFrom();
    // 컴포넌트 마운트 시 1회 스캔을 수행합니다.
    const initialScanTimeout = setTimeout(() => {
      startScan(5);
    }, 1000);

    const scanInterval = setInterval(() => {
      startScan(5, scannedDevices => {});
    }, 6000);

    return () => {
      clearTimeout(initialScanTimeout);
      clearInterval(scanInterval);
    };
  }, []);

  useEffect(() => {
    if (!scanning) {
      const userUUIDsArray = users.map(user => user.uuid);
      const deviceUUIDsArray = devices.flatMap(
        device => device.advertising.serviceUUIDs,
      );
      const newUUIDsToCheck = deviceUUIDsArray.filter(
        uuid => !userUUIDsArray.includes(uuid),
      );
      const delUUIDsToCheck = userUUIDsArray.filter(
        uuid => !deviceUUIDsArray.includes(uuid),
      );

      async function userlistupdate() {
        if (delUUIDsToCheck.length > 0 && newUUIDsToCheck.length > 0) {
          const updatedUsers = users.filter(
            user => !delUUIDsToCheck.includes(user.uuid),
          );
          const data = await checkNewDeviceServiceUUIDs(newUUIDsToCheck);
          setUsers(updateUsers(data, updatedUsers));
        } else if (delUUIDsToCheck.length > 0) {
          const updatedUsers = users.filter(
            user => !delUUIDsToCheck.includes(user.uuid),
          );
          setUsers(updatedUsers); // 필터링된 사용자 목록으로 users 상태를 업데이트
        }
        // 필터링된 새 디바이스가 있다면, 해당 디바이스의 serviceUUIDs를 확인합니다.
        else if (newUUIDsToCheck.length > 0) {
          const data = await checkNewDeviceServiceUUIDs(newUUIDsToCheck);
          setUsers(updateUsers(data, users));
        }
      }

      userlistupdate();
    }
  }, [scanning]);

  useEffect(() => {
    props.setList(users.map(user => user.id));
    props.setUsers(users.map(user => user));
  }, [users]);

  const toggleFill = id => {
    setUsers(
      users.map(usermap => {
        if (usermap.id === id) {
          const newUser = {...usermap, filled: !usermap.filled};
          // 애니메이션 상태에 따라 LottieView 제어
          if (newUser.filled) {
            addHeart(user.id, id);
            lottieRefs.current[id].play();
          } else {
            lottieRefs.current[id].reset();
            addHeart(user.id, id);
          }
          return newUser;
        }
        return usermap;
      }),
    );
  };

  const extractIdFrom = async () => {
    data = await heartlist(user.id);
    setHeartList(data.list.map(item => item.idTo));
  };

  const updateUsers = (data, prevuser) => {
    // 필터링하여 null이 아닌 유저 객체만 추출하고 배열로 변환
    const newUsers = Object.values(data).filter(
      user => user && typeof user === 'object' && user !== null,
    );
    const plusUser = newUsers.map(user => {
      return {
        ...user,
        filled: heartList.includes(user.id),
      };
    });
    const updatedUser = [...prevuser, ...plusUser];
    return updatedUser;
  };

  return (
    <View>
      <Text style={{marginLeft: 10, padding: 7, fontSize: 16}}>
        근처 유저 수 : {users.filter(user => user.gender !== 'P').length}
      </Text>
      <UserList
        users={users}
        myinfo={user.id}
        toggleFill={toggleFill}
        lottieRefs={lottieRefs}
        Image_URL={Image_URL}
        navigation={navigation}
      />
    </View>
  );
};

export default UserListPage;
