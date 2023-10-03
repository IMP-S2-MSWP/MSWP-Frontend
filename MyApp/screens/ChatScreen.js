import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/Button/CustomButton';
import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import {Button,Checkbox,Input,useTheme,Pressable, Box, HStack, Badge, Spacer, Flex} from "native-base"
import { TextInput } from 'react-native-gesture-handler';

const ChatScreen = ({route}) => {
    const { name } = route.params ?? {};
    return(
        <View>
        <Text>chawet</Text>
        <Text>name : {name}</Text>
        </View>

        );

}
export default ChatScreen;