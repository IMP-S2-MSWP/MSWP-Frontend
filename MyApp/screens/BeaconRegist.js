import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  Input,
  Select,
  CheckIcon,
  Button,
  HStack,
  Pressable,
  VStack,
  Box,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
const BeaconRegist = () => {
  const [uuid, setUuid] = useState('');
  const [beaconname, setBeaconName] = useState('');
  const [beaconType, setBeaconType] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    console.log(uuid, beaconname, beaconType);
    // state 2그룹채팅
    //state 3 광고방
    if (beaconType == '3') {
      navigation.navigate('Advertisement', {uuid, beaconname, beaconType});
    } else if (beaconType == '2') {
      navigation.navigate('groupChat', {uuid, beaconname, beaconType});
    }
  };
  return (
    <View style={styles.container}>
      <HStack>
        <Text
          style={{
            fontWeight: 'bold',

            margin: 14,
            marginBottom: 34,
            fontSize: 20,
            alignSelf: 'flex-start',
            color: '#2679ff',
          }}>
          Wennect
        </Text>
      </HStack>
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
          <Text style={{color: 'white'}}>등록</Text>
        </Pressable>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    marginTop: 17,
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2579ff',
    alignSelf: 'center',
  },
  input: {
    marginBottom: 10,
    width: '100%',
  },
  button: {
    marginTop: 20,
    borderWidth: 0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 30,
    borderRadius: 75,
    backgroundColor: '#2679ff',
  },
  box: {
    alignSelf: 'center',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    borderWidth: 6,
    borderColor: '#2679ff',
    borderTopLeftRadius: 50, // Adjust the value for the desired roundness
    borderTopRightRadius: 50, // Adjust the value for the desired roundness
    borderBottomRightRadius: 50, // Adjust the value for the desired roundness
    borderBottomLeftRadius: 50, // Adjust the value for the desired roundness

    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
});

export default BeaconRegist;
