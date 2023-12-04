import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Input, Select, CheckIcon, Pressable, Box} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import WennectTitle from '../components/WennectTitle/WennectTitle';
import styles from '../components/Style/BeaconRegist/BeaconRegistScreenStyle';

/**
 * 비콘 등록 컴포넌트
 * @component
 * @returns {JSX.Element} 비콘 등록 JSX 컴포넌트
 */
const BeaconRegist = () => {
  const [uuid, setUuid] = useState('');
  const [beaconname, setBeaconName] = useState('');
  const [beaconType, setBeaconType] = useState('');
  const navigation = useNavigation();

  /**
   * 비콘 등록 폼 제출을 처리하는 함수
   * beaconType에 따라 'Advertisement' 또는 'groupChat'으로 이동
   * @function
   * @returns {void}
   */
  const handleSubmit = () => {
    console.log(uuid, beaconname, beaconType);
    //state 2 그룹채팅
    //state 3 광고방
    if (beaconType == '3') {
      navigation.navigate('Advertisement', {uuid, beaconname, beaconType});
    } else if (beaconType == '2') {
      navigation.navigate('groupChat', {uuid, beaconname, beaconType});
    }
  };

  return (
    <View style={styles.container}>
      <WennectTitle customStyle={{marginBottom: 34}} />
      <Text style={styles.title}>비콘 등록</Text>
      <Box style={styles.box}>
        <Text>- UUID를 입력하세요</Text>
        <Input
          placeholder="UUID"
          value={uuid}
          variant="rounded"
          onChangeText={setUuid}
          m="4"
          borderWidth="2"
          borderColor="#2679ff"
          autoCapitalize="none"
        />
        <Text>- 이름을 입력하세요</Text>

        <Input
          placeholder="비콘 이름"
          value={beaconname}
          m="4"
          borderWidth="2"
          borderColor="#2679ff"
          onChangeText={setBeaconName}
          variant="rounded"
        />
        <Text>- 비콘 유형 선택 [o 광고형 o 채팅형]</Text>

        <Select
          selectedValue={beaconType}
          minWidth={200}
          borderWidth="2"
          borderColor="#2679ff"
          m="4"
          accessibilityLabel="비콘 유형 선택"
          placeholder="비콘 유형 선택"
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size={4} />,
          }}
          mt={1}
          onValueChange={itemValue => setBeaconType(itemValue)}>
          <Select.Item label="광고형" value="3" />
          <Select.Item label="채팅형" value="2" />
        </Select>

        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.registButton}>등록</Text>
        </Pressable>
      </Box>
    </View>
  );
};

export default BeaconRegist;
