import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/Button/CustomButton';
import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import {Button,Checkbox,Input,useTheme,Pressable, Box, HStack, Badge, Spacer, Flex} from "native-base"
import { TextInput } from 'react-native-gesture-handler';
const ChatListScreen = (props) => {

    return(
        <View>
            
            <Pressable
                p="2"
                borderWidth="1"
                onPress={()=>{
                    props.navigation.navigate('Chat');

                }}
            
            >
                <Text>채팅방1</Text>
            </Pressable>
        </View>
        );

}

export default ChatListScreen;