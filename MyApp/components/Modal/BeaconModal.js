import React from 'react';
import {Modal, Image, Text} from 'native-base';
import {Image_URL} from '../../env';

/**
 * 비콘에 관한 광고 모달을 표시합니다.
 *
 * @param {Object} props - 컴포넌트 프로퍼티.
 * @param {string} props.title - 모달의 제목.
 * @param {string} props.fileSource - 이미지 파일 소스.
 * @param {boolean} props.isVisible - 모달이 표시될지 여부.
 * @param {Function} props.onClose - 모달을 닫는 함수.
 */
const BeaconModal = ({title, fileSource, isVisible, onClose}) => {
  return (
    <Modal isOpen={isVisible} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>광고</Modal.Header>
        <Modal.Body>
          {fileSource !== null ? (
            <Image
              source={{
                uri: fileSource + '?cache=' + Math.random(),
              }}
              alt={'x'}
              resizeMode="contain"
              height={400}
            />
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Text>{title}</Text>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default BeaconModal;
