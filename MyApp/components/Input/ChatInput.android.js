import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Button} from 'native-base';

const ChatInput = prop => {
  return (
    <View style={styles.footer}>
      <TextInput
        value={prop.value}
        onChangeText={prop.onChangeText}
        style={styles.input}
        placeholder="Type a message"
        returnKeyType="send"
        onSubmitEditing={prop.onSubmitEditing}
        blurOnSubmit={prop.blurOnSubmit}
      />
      <TouchableOpacity
        onPress={prop.onSubmitEditing}
        style={styles.sendButton}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#white',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f1f1f1',
    marginRight: 10,
  },
  sendButton: {
    flex: 0.15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2679ff',
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatInput;
