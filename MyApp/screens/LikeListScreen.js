import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Pressable, HStack, Spacer} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import PagerView from 'react-native-pager-view';
import axios from 'axios';
import {Box} from 'native-base';

const LikeListScreen = props => {
  //const uid = route.params.uid

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
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
    </View>
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
