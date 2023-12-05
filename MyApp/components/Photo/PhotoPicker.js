import {launchImageLibrary} from 'react-native-image-picker';

/**
 * 사용자가 사진을 선택할 수 있도록 돕는 함수입니다.
 * 이 함수는 ImagePicker 라이브러리를 사용하여 사용자의 디바이스에서 사진을 선택합니다.
 * 선택된 사진의 정보(URI, 파일 타입, 데이터 등)는 상태 관리를 통해 저장됩니다.
 *
 * @param {function} setFileSource - 선택한 이미지의 URI를 설정하는 함수.
 * @param {function} setFileType - 선택한 이미지의 파일 타입을 설정하는 함수.
 * @param {function} setFileData - 선택한 이미지의 데이터를 설정하는 함수.
 */
export const handleChoosePhoto = setFileSource => {
  let options = {
    mediaType: 'photo',
    maxWidth: 500,
    maxHeight: 500,
  };

  launchImageLibrary(options, response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode == 'camera_unavailable') {
      console.log('Camera not available on device');
    } else if (response.errorCode == 'permission') {
      console.log('Permission not satisfied');
    } else if (response.errorCode == 'others') {
      console.log(response.errorMessage);
    } else {
      setFileSource(response.assets[0].uri);
    }
  });
};
