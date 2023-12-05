// ProfileSettingsModal.js
import React from 'react';
import {View, Text, StyleSheet, Pressable, Modal} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const ProfileSettingsModal = ({isVisible, onClose}) => {
  const navigation = useNavigation(); // <-- 여기에 추가

  const handleLogout = () => {
    // 로그아웃 로직을 구현하세요.
    // 사용자의 세션을 종료하고 필요한 경우 클라이언트 상태를 초기화합니다.
    // 예: AsyncStorage.clear() 또는 사용자 정보를 관리하는 Context를 초기화하는 등
    // 로그인 화면으로 이동합니다.
    navigation.reset({index: 0, routes: [{name: 'Start'}]});
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close-circle" size={30} color="#2679ff" />
          </Pressable>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>로그아웃</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#2679ff',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileSettingsModal;
