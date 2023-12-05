import {useState} from 'react';
import axios from 'axios';
import {API_URL, Image_URL} from '../../../env';

/**
 * 비콘 정보를 가져와서 모달에 표시하기 위한 훅.
 *
 * @returns {Function} 비콘 정보를 불러오는 함수.
 */
const useBeaconShow = () => {
  const [title, setTitle] = useState('');
  const [fileSource, setFileSource] = useState(null);
  const [isBeaconModalVisible, setIsBeaconModalVisible] = useState(false);

  /**
   * 비콘 데이터를 가져오는 함수.
   * 이 함수는 주어진 UUID를 사용하여 서버에 비콘 데이터를 요청합니다.
   * 요청이 성공하면 받아온 데이터로 모달의 상태를 업데이트합니다.
   *
   * @param {string} uuid - 조회하고자 하는 비콘의 UUID.
   */
  const fetchBeaconData = async uuid => {
    try {
      const response = await axios.post(API_URL + '/api/beacon/show', {
        uuid: uuid,
      });
      if (response.data != null) {
        setTitle(response.data.title);
        setFileSource(
          Image_URL + '/advertisement/' + response.data.advertisementImage,
        );
        setIsBeaconModalVisible(true);
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchBeaconData,
    title,
    fileSource,
    setFileSource,
    setTitle,
    isBeaconModalVisible,
    setIsBeaconModalVisible,
  };
};

/**
 * 비콘 참여 관련 API 요청을 처리하는 훅.
 *
 * @returns {Function} 비콘 참여 요청을 처리하는 함수.
 */
const useBeaconJoin = () => {
  const joinBeacon = async (userId, state, uuid) => {
    try {
      const response = await axios.post(API_URL + '/api/beacon/join', {
        id: userId,
        state: state,
        uuid: uuid,
      });
      return response.data;
    } catch (error) {
      console.error('비콘 참여 요청 중 오류 발생:', error);
      // 추가적인 에러 처리 로직이 필요한 경우 여기에 작성
      return null;
    }
  };

  return {joinBeacon};
};
export {useBeaconShow, useBeaconJoin};
