import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Pressable } from "native-base";

const ChatListScreen = (props) => {
    const chats = [
        { id: '1', name: '채팅방1' },
        { id: '2', name: '채팅방2' },
        { id: '3', name: '채팅방3' },
        // ... 추가하실 채팅방 데이터
    ];

    const renderChatItem = ({ item }) => (
        <Pressable
            style={styles.chatItem}
            onPress={() => props.navigation.navigate('Chat')}
        >
            <View style={styles.avatar} />
            <Text style={styles.chatName}>{item.name}</Text>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={chats}
                renderItem={renderChatItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
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
        backgroundColor: '#FF6B6B',
        marginRight: 15,
    },
    chatName: {
        fontSize: 16,
    }
});

export default ChatListScreen;
