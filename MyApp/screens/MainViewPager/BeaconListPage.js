// BeaconListPage.js

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList,ScrollView} from 'react-native';
import {Button, Checkbox, Input,
    Pressable ,Box,HStack,VStack,Badge ,Spacer,Flex ,Switch ,Image ,Center} 
from "native-base"

const BeaconListPage = (props) => {
    const [numUsers, setNumUsers] = useState(13); // Declare numUsers and setNumUsers
    const [users, setUsers] = useState([]); // Initialize users as empty array
    
    useEffect(() => {
        const newUsers = Array.from({ length: numUsers }, (_, i) => ({
            id: i + 1,
            name: `이상용 ${i + 1}`,
            image: `https://i.namu.wiki/i/Mb4LnlothTX0IkiEhY_flFD_yzmVHYVQxPhC6lqww0AnJfe8JePGSgAUpS09rPLZPr6rrc_8-yKHCtRsN8u9-A.webp`,
            filled: false // Add filled state for each user
        }));
        setUsers(newUsers);
    }, [numUsers]); // Re-run effect when numUser changes

    const navigation = useNavigation();

    const toggleFill = (id) => {
      setUsers(users.map(user =>
        user.id === id ? {...user, filled: !user.filled} : user
      ));
    };

  

  
  return (
        <View>
            <Text style={{marginLeft:10, padding:7, fontSize:16}}>근처 비콘 수 : {users.length}</Text>
            <ScrollView>
            {users.map(user => (
                <Pressable
                    key={user.id}
                    p="1"
                    marginBottom={1}
                    borderWidth="0"
                    onPress={()=>{
                        navigation.navigate('Chat',{
                            name: user.name,
                        });
                    }}
                >
                  <HStack space={3} alignItems="center" marginLeft={4}>
                      <Image style={{borderRadius:14}} 
                      source={{ uri: user.image }} alt={user.name} boxSize={10} />
                      <VStack>
                          <Text style={{fontSize:16}}>{user.name}</Text>
                          <Text>hi</Text>
                          {/* Replace with actual heart icon */}
                          {/*<Button title={user.filled ? '❤️' : '♡'} onPress={() => toggleFill(user.id)} />*/}
                      </VStack>
                      <Spacer />
                      <Pressable
                          p="2"
                          borderWidth="1"
                          w='9'
                          h='9'
                          mr='3'
                          onPress={() => toggleFill(user.id)}
                      >
                          <Text>{user.filled ? '❤️' : ' ♡'}</Text>
                      </Pressable>
                  </HStack>

                </Pressable>
            ))}
            
           
            </ScrollView>
        </View>
    );
}

export default BeaconListPage;
