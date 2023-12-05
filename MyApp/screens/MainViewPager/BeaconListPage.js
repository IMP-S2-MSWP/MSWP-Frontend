/**
 * BeaconListPage 컴포넌트
 * 비콘 리스트를 표시하고, 비콘 관련 상호작용을 관리하는 페이지 컴포넌트입니다.
 */

import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text} from 'react-native';
import {useUser} from '../../stores/UserContext';
import {insertUserInfo} from '../../components/firebase/roomService';
import BeaconList from '../../components/Listitem/BeaconListItem';
import BeaconModal from '../../components/Modal/BeaconModal';
import {
  useBeaconShow,
  useBeaconJoin,
} from '../../components/Hook/Beacon/useBeacon';

const BeaconListPage = props => {
  const {user} = useUser();
  const navigation = useNavigation();

  const {
    fetchBeaconData,
    title,
    fileSource,
    isBeaconModalVisible,
    setIsBeaconModalVisible,
  } = useBeaconShow();

  /**
   * Beacon 참여를 위한 함수.
   */
  const {joinBeacon} = useBeaconJoin();

  /**
   * 채팅 화면으로 네비게이션하는 함수.
   *
   * @param {string} beaconname - 비콘 이름.
   * @param {number} number - 비콘 번호.
   */
  const navigateToChat = (beaconname, number) => {
    navigation.navigate('채팅', {
      screen: 'Chat',
      params: {rname: beaconname, number: number},
    });
  };

  /**
   * 비콘 이벤트 핸들러.
   * 비콘 참여 또는 광고 보기를 처리합니다.
   *
   * @param {string} uuid - 비콘 UUID.
   * @param {number} state - 비콘 상태.
   * @param {string} beaconname - 비콘 이름.
   */
  const eventHandler = async (uuid, state, beaconname) => {
    const data = await joinBeacon(user.id, state, uuid);
    if (state == 2) {
      if (data.sc == 201) {
        insertUserInfo(data.number, [user.id], [user.nickname]);
        navigateToChat(beaconname, data.number);
      } else if (data.sc == 200) {
        navigateToChat(beaconname, data.number);
      }
    } else if (state == 3) {
      if (data.sc == 201 || data.sc == 200) {
        fetchBeaconData(uuid);
      }
    }
  };

  return (
    <View>
      <Text style={{marginLeft: 10, padding: 7, fontSize: 16}}>
        근처 비콘 수 : {props.users.filter(user => user.gender == 'P').length}
      </Text>
      <BeaconList users={props.users} eventHandler={eventHandler} />
      <BeaconModal
        title={title}
        fileSource={fileSource}
        isVisible={isBeaconModalVisible}
        onClose={() => setIsBeaconModalVisible(false)}
      />
    </View>
  );
};

export default BeaconListPage;
