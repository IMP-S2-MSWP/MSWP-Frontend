import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Pressable, HStack, Spacer} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import PagerView from 'react-native-pager-view';
import axios from 'axios';
import {useUser} from '../stores/UserContext';
import {API_URL, Image_URL} from '../env';

const LikeListScreen = props => {
  const {user} = useUser();
  //const uid = route.params.uid
  const [likeList, setlikeList] = useState([]);

  const navigation = useNavigation();
  useEffect(() => {
    axios.get(API_URL + '/api/like/list?id=' + user.id).then(response => {
      if (response.data != null) {
        console.log(response.data);
        setlikeList(Object.values(response.data));
      } else {
        console.log('조회 실패');
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HStack>
        <Text
          style={{
            fontWeight: 'bold',
            margin: 14,
            marginBottom: 34,
            fontSize: 20,
            alignSelf: 'flex-start',
            color: '#2679ff',
          }}>
          Wennect
        </Text>
      </HStack>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 40,
          fontWeight: 'bold',
          color: '#2679ff',
        }}>
        WHO LIKES ME
      </Text>
      <ScrollView>
        {likeList.map((item, index) => (
          <View key={index}>
            <Text>Name: {item.name}</Text>
            <Text>ID: {item.id}</Text>
            <Text>Birth: {item.birth}</Text>
            {/* 다른 필요한 데이터도 여기에 추가 */}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2679ff',
    marginRight: 15,
  },
  chatName: {
    fontSize: 16,
  },
});

export default LikeListScreen;
