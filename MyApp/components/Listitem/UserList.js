import React from 'react';
import {ScrollView, Pressable, HStack, VStack, Image, Text} from 'native-base';
import LottieView from 'lottie-react-native';
import {moveChat} from '../../components/Hook/api/UserList_API';
/**
 * 사용자 목록을 표시하는 컴포넌트입니다.
 *
 * @param {Object} props - 컴포넌트 프롭스
 * @param {Array} props.users - 표시할 사용자 목록 데이터
 * @param {Function} props.moveChat - 채팅 이동 함수
 * @param {Function} props.toggleFill - 좋아요 상태를 토글하는 함수
 * @param {Object} props.lottieRefs - Lottie 애니메이션 참조
 * @param {string} props.Image_URL - 사용자 이미지 URL
 * @returns {React.Component} 사용자 목록을 렌더링하는 컴포넌트
 */
const UserList = ({
  users,
  myinfo,
  toggleFill,
  lottieRefs,
  Image_URL,
  navigation,
}) => {
  return (
    <ScrollView>
      {users
        .filter(user => user.gender !== 'P')
        .map(user => (
          <Pressable
            key={user.id}
            p="1"
            marginBottom={1}
            borderWidth="0"
            onPress={() => moveChat(navigation, myinfo, user.id)}>
            <HStack
              space={3}
              alignItems="center"
              justifyContent="space-between">
              <HStack space={3} alignItems="center" marginLeft={4} flex={1}>
                <Image
                  style={{borderRadius: 14}}
                  source={{uri: Image_URL + '/user/' + user.image}}
                  alt={'test'}
                  boxSize={10}
                />
                <VStack>
                  <Text style={{fontSize: 16}}>{user.name}</Text>
                  <Text>{user.message}</Text>
                </VStack>
              </HStack>
              <Pressable key={user.id} onPress={() => toggleFill(user.id)}>
                <LottieView
                  ref={el => (lottieRefs.current[user.id] = el)}
                  style={{height: 50, width: 50}}
                  source={require('../../components/Lottie/source/heartpicker')}
                  loop={false}
                  autoPlay={false}
                  progress={user.filled ? 1 : 0}
                />
              </Pressable>
            </HStack>
          </Pressable>
        ))}
    </ScrollView>
  );
};

export default UserList;
