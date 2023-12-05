import React from 'react';
import {Pressable, HStack, VStack, Image} from 'native-base';
import {ScrollView, Text} from 'react-native';
import {Image_URL} from '../../env';

/**
 * 스크롤 가능한 뷰 안에 비콘 목록을 표시합니다.
 *
 * @param {Object} props - 컴포넌트 프로퍼티.
 * @param {Array} props.users - 표시할 사용자 객체 배열.
 * @param {Function} props.eventHandler - 비콘 항목에 대한 이벤트를 처리하는 함수.
 */
const BeaconList = ({users, eventHandler}) => {
  return (
    <ScrollView>
      {users
        .filter(user => user.gender === 'P')
        .map(user => (
          <Pressable
            key={user.id}
            p="1"
            marginBottom={1}
            borderWidth="0"
            onPress={() =>
              eventHandler(user.uuid, user.state, user.beaconname)
            }>
            <HStack
              space={3}
              alignItems="center"
              justifyContent="space-between">
              <HStack space={3} alignItems="center" marginLeft={4} flex={1}>
                <Image
                  style={{borderRadius: 14}}
                  source={{uri: Image_URL + '/beacon/' + user.image}}
                  alt={'x'}
                  boxSize={10}
                />
                <VStack>
                  <Text style={{fontSize: 16}}>{user.beaconname}</Text>
                  <Text>{user.message}</Text>
                </VStack>
              </HStack>
            </HStack>
          </Pressable>
        ))}
    </ScrollView>
  );
};

export default BeaconList;
