import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input, Select, CheckIcon, Button} from 'native-base';
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
      <Text style={styles.title}>비콘 정보 등록</Text>

      <Input
        placeholder="비콘 UUID"
        value={uuid}
        onChangeText={setUuid}
        style={styles.input}
        autoCapitalize="none"
      />

      <Input
        placeholder="비콘 이름"
        value={beaconname}
        onChangeText={setBeaconName}
        style={styles.input}
      />

      <Select
        selectedValue={beaconType}
        minWidth={200}
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

      <Button onPress={handleSubmit} style={styles.button}>
        등록
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    width: '100%',
  },
  button: {
    marginTop: 20,
  },
});

export default BeaconRegist;
