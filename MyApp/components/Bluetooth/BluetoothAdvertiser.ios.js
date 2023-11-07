import { useEffect , useContext} from 'react';
import Peripheral from 'react-native-peripheral';
import { useUser } from '../../stores/UserContext';

// Advertiser Service UUID (이 값을 자신의 서비스 UUID로 변경하세요)

export default function useBluetoothAdvertiser() {
  const { user } =  useUser();
  const SERVICE_UUID = user.uuid;
  useEffect(() => {
    return () => {
      // Stop advertising when the component is unmounted
      Peripheral.stopAdvertising();
    };
  }, []);

  const startAdvertising = async () => {
    try {
      await Peripheral.startAdvertising({
        name: 'MyDevice', // 이 값을 자신의 디바이스 이름으로 변경하세요
        serviceUuids: [SERVICE_UUID],
      });
      
      console.log('BLE advertising started successfully.');
    } catch (error) {
      console.log('Failed to start BLE advertising:', error);
    }
  };

  return { startAdvertising };
}