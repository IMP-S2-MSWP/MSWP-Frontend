import axios from 'axios';
import {API_URL} from '../../../env'; // API_URL을 env 파일에서 가져옵니다.

/**
 * 사용자 간의 '좋아요' 상호작용을 서버에 전송합니다.
 *
 * @param {string} idFrom '좋아요'를 보내는 사용자의 ID
 * @param {string} idTo '좋아요'를 받는 사용자의 ID
 * @returns {Promise<Object>} 서버 응답 데이터 또는 에러 객체
 */
export async function addHeart(idFrom, idTo) {
  try {
    const response = await axios.post(API_URL + '/api/like/click', {
      idFrom: idFrom,
      idTo: idTo,
    });
    return response.data;
  } catch (error) {
    console.error('An error occurred while adding a heart:', error);
    return error;
  }
}

/**
 * 특정 사용자가 받은 '좋아요' 목록을 서버에서 가져옵니다.
 *
 * @param {string} id '좋아요' 목록을 조회할 사용자의 ID
 * @returns {Promise<Object>} 서버로부터 받은 '좋아요' 목록 데이터 또는 에러 객체
 */
export async function heartlist(id) {
  try {
    const response = await axios.get(API_URL + '/api/like/count?id=' + id);
    if (response.data) {
      console.log('Heartlist fetch was successful.');
      return response.data;
    } else {
      console.log('There was a problem fetching the heartlist.');
      return null;
    }
  } catch (error) {
    console.error('An error occurred while fetching the heartlist:', error);
    return error;
  }
}

/**
 * 새로운 Bluetooth 서비스 UUID들을 서버에 전송하여 검증합니다.
 *
 * @param {Array} newUUIDs 검증할 새로운 Bluetooth 서비스 UUID 배열
 * @returns {Promise<Object>} 서버 응답 데이터 또는 'error' 문자열
 */
export async function checkNewDeviceServiceUUIDs(newUUIDs) {
  try {
    console.log('New service UUIDs to check:', newUUIDs);
    const response = await axios.post(API_URL + '/api/around', {
      uuidList: newUUIDs,
    });
    return response.data;
  } catch (error) {
    console.error(
      'An error occurred while checking the new service UUIDs:',
      error,
    );
    return 'error';
  }
}

/**
 * 채팅방을 생성하고, 생성된 채팅방으로 이동합니다.
 *
 * @param {Object} navigation 네비게이션 객체
 * @param {string} userId 사용자의 ID
 * @param {string} targetId 대상 사용자의 ID
 * @returns {Promise<void>} 비동기 실행, 반환 값 없음
 */
export async function moveChat(navigation, userId, targetId) {
  try {
    const response = await axios.post(API_URL + '/api/room/create', {
      idList: [userId, targetId],
      state: '1',
    });
    console.log(response.data);

    if (response.data.sc === 200) {
      navigation.navigate('채팅', {
        screen: 'Chat',
        params: {rname: response.data.rname, number: response.data.number},
      });
    }
  } catch (error) {
    console.error('An error occurred while moving to the chat:', error);
  }
}
