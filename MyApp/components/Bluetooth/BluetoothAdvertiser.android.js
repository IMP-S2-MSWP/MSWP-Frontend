import {useEffect} from 'react';
import BlePeripheral from 'react-native-ble-peripheral';
import {useUser} from '../../stores/UserContext';
// Advertiser Service UUID (이 값을 자신의 서비스 UUID로 변경하세요)

export default function useBluetoothAdvertiser() {
  const {user} = useUser();
  const SERVICE_UUID = user.uuid;
  console.log('uuid' + SERVICE_UUID);
  useEffect(() => {}, []);
  // Start advertising when the component is mounted
  const startAdvertising = async () => {
    try {
      await BlePeripheral.addService(SERVICE_UUID, false);
      await BlePeripheral.start();
      console.log('BLE advertising started successfully.');
    } catch (error) {
      console.log('Failed to start BLE advertising:', error);
    }
  };

  // return () => {
  //   // Stop advertising when the component is unmounted
  //   if (BlePeripheral.isAdvertising()) {
  //     BlePeripheral.stop()
  //       .then(() => console.log('BLE advertising stopped successfully.'))
  //       .catch(error =>
  //         console.log('Failed to stop BLE advertising:', error),
  //       );
  //   }
  // };

  return {startAdvertising};
}
