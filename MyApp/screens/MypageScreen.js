import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/Button/CustomButton';
import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import {Button,Checkbox,Input,useTheme,Pressable, Box, HStack, Badge, Spacer, Image,Flex, VStack} from "native-base"
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';

const MypageScreen = (props) => {
    const [name, setName] = useState('이름');
  const [age, setAge] = useState('나이');
  const [dob, setDob] = useState('생년월일');
  const [isEditable, setIsEditable] = useState(false);

    return(
        <View style={{flex :1, alignItems: 'center', textAlign: 'center', backgroundColor:"#ffffff"}}>
       <Image
                  source={{
                    uri:"https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/09/18/1e586277-48ba-4e8a-9b98-d8cdbe075d86.jpg"
                  }}
                  alt="Alternate Text" borderRadius='150' w='140' h='140' mt='81'/>
       <HStack alignItems='center'>
        <Text style={{fontWeight:"bold", fontSize:20, marginTop:17}} >
               카리나
              </Text>  
        <Image
            source={{
                uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK2vvhR8lML6uk1lXn7cgBrZXjwC7JA_Ildw&usqp=CAU"
            }}
            alt="Alternate Text"
            style={{width:20, height:20, marginTop:18, marginLeft:7}}
        />
    </HStack>     
    <Text>나는 이상용이 좋아</Text>      
    <HStack p="12" rounded="lg" w='370' h='110'>
            <Pressable
                style={{
                    borderWidth:1,
                    borderRadius:150,
                    width:50,
                    height:50,
                    backgroundColor:'grey'

                }}
                onPress={()=>{
                    console.log('hello')
                }}
            >
            </Pressable>
            
            <Spacer/>
            <Pressable
                style={{
                    borderWidth:1,
                    borderRadius:150,
                    width:70,
                    height:70,
                    backgroundColor:'pink'

                }}
                onPress={()=>{
                    console.log('hello2')
                }}
            >
            </Pressable>
            <Spacer/>

            <Pressable
                style={{
                    borderWidth:1,
                    borderRadius:150,
                    width:50,
                    height:50,
                    backgroundColor:'grey'
                }}
                onPress={()=>{
                    console.log('hello2')
                    setIsEditable(!isEditable)

                }}
            >
                <Text>설정</Text>
            </Pressable>
    </HStack>  
        <TextInput 
            value={name}
            onChangeText={setName}
            editable={isEditable}
        />
        <TextInput 
            value={age}
            onChangeText={setAge}
            editable={isEditable}
        />
        <TextInput 
            value={dob}
            onChangeText={setDob}
            editable={isEditable}
        />
        <Button 
            title="수정하기"
            onPress={() => setIsEditable(!isEditable)}
        />
        
        
        </View>
    )
}
export default MypageScreen;