import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {Pressable, HStack, Box, Image, VStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useUser} from '../stores/UserContext';
import {API_URL, Image_URL} from '@env';

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
      <Box
        borderColor="#2679ff"
        p="2"
        //borderBottomWidth="0.4"
        borderBottomWidth="2"
        //borderTopWidth="2"
        mb="5"
        w="370"
        h="100"
        alignSelf="center">
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 40,
            fontWeight: 'bold',
            color: '#2679ff',
          }}>
          WHO YOU LIKE
        </Text>
      </Box>
      <ScrollView>
        {likeList.map((item, index) => (
          <Pressable
            key={index}
            p="1"
            m="1"
            marginBottom={1}
            borderBottomWidth="0"
            onPress={() => moveChat(item.id)}>
            <HStack
              space={3}
              alignItems="center"
              justifyContent="space-between">
              <HStack space={3} alignItems="center" marginLeft={4} flex={1}>
                {/* Assuming you have an 'image' property in your likeList items */}
                <Image
                  style={{borderRadius: 14}}
                  source={{uri: Image_URL + '/user/' + item.image}}
                  alt={'test'}
                  boxSize={10}
                />
                <VStack>
                  <Text style={{fontSize: 16}}>{item.name}</Text>
                  {/* Replace with actual message property */}
                  <Text>{item.message}</Text>
                </VStack>
              </HStack>
            </HStack>
          </Pressable>
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
