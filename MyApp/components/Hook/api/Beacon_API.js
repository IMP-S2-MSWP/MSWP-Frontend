// uploadBeaconAd.js
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
/**
 * Beacon 광고를 업로드하는 함수입니다.
 * FormData를 사용하여 서버에 데이터를 전송합니다.
 *
 * @param {string} API_URL - API 엔드포인트 URL.
 * @param {string} uuid - Beacon의 고유 식별자.
 * @param {string} title - 광고의 제목.
 * @param {string} fileSource - 파일의 소스 URI.
 * @param {function} navigate - 네비게이션 함수.
 */
const uploadBeaconAd = async (API_URL, uuid, title, fileSource, navigate) => {
  const formData = new FormData();
  formData.append('uuid', uuid);
  formData.append('title', title);

  var photo = {
    uri: fileSource,
    type: 'multipart/form-data',
    name: 'image.jpg',
  };
  formData.append('file', photo);

  try {
    const response = await axios.post(
      API_URL + '/api/beacon/advertisement',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    navigate.navigate('마이페이지');
  } catch (error) {
    console.log(error);
  }
};

export default uploadBeaconAd;
