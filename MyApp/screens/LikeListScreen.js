
/**
 * 좋아요 목록 화면 컴포넌트입니다.
 * @component
 * @example
 * // Usage
 * <LikeListScreen />
 */
import {API_URL, Image_URL} from '../env';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Box, HStack, Image, Pressable, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import {useUser} from '../stores/UserContext';
import styles from '../components/Style/LikeList/LikeStyle';
import WennectTitle from '../components/WennectTitle/WennectTitle';
/**
 * 좋아요 목록 화면을 나타내는 함수형 컴포넌트입니다.
 * @function
 * @returns {JSX.Element} 좋아요 목록 화면 컴포넌트
 */
const LikeListScreen = props => {
  const {user} = useUser();
  const [likeList, setLikeList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get(API_URL + '/api/like/list?id=' + user.id).then(response => {
      if (response.data != null) {
        console.log(response.data);
        setLikeList(Object.values(response.data));
      } else {
        console.log('조회 실패');
      }
    });
  }, []);

  /**
   * 채팅 화면으로 이동하는 함수
   * @param {string} id - 채팅 상대방의 아이디
   */
  const moveChat = id => {
    // 채팅으로 이동하는 로직 추가
    // navigation.navigate('Chat', { chatId: id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <HStack>
        <WennectTitle />
      </HStack>
      <Box style={styles.headerBox}>
        <Text style={styles.headerText}>WHO YOU LIKE</Text>
      </Box>
      <ScrollView>
        {/* 좋아요 리스트를 화면에 렌더링 */}
        {likeList.map((item, index) => (
          <Pressable
            key={index}
            style={styles.pressableItem}
            onPress={() => moveChat(item.id)}>
            <HStack
              space={3}
              alignItems="center"
              justifyContent="space-between">
              <HStack space={3} alignItems="center" marginLeft={4} flex={1}>
                <Image
                  style={styles.image}
                  source={{uri: Image_URL + '/user/' + item.image}}
                  alt={'test'}
                  boxSize={10}
                />
                <VStack>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemMessage}>{item.message}</Text>
                </VStack>
              </HStack>
            </HStack>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LikeListScreen;
