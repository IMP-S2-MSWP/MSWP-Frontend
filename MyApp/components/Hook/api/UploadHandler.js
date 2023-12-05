// UploadHandler.js

import axios from 'axios';
import {API_URL} from '../../../env';

/**
 * 비콘 생성 및 광고 업로드를 처리하는 함수
 *
 * @param {object} params - 업로드에 필요한 데이터
 * @param {string} params.uuid - 비콘 UUID
 * @param {string} params.creatorId - 사용자 ID
 * @param {string} params.beaconType - 비콘 타입
 * @param {string} params.message - 메시지
 * @param {string} params.beaconName - 비콘 이름
 * @param {string} params.gender - 성별 ('P'로 설정됨)
 * @param {string} params.fileSource - 업로드할 이미지의 소스
 * @param {function} navigation - 네비게이션 함수
 * @returns {Promise<void>}
 */
export const handleUpload = async ({
  uuid,
  creatorId,
  beaconType,
  message,
  beaconName,
  gender = 'P',
  fileSource,
  navigation,
}) => {
  const formData = new FormData();
  formData.append('uuid', uuid);
  formData.append('creator', creatorId);
  formData.append('state', beaconType);
  formData.append('message', message);
  formData.append('beaconname', beaconName);
  formData.append('gender', gender);

  var photo = {
    uri: fileSource,
    type: 'multipart/form-data',
    name: 'image.jpg',
  };
  formData.append('file', photo);

  try {
    const response = await axios.post(
      API_URL + '/api/beacon/create',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  } catch (error) {
    console.error(error);
  }

  navigation.navigate('마이페이지');
};
