import { useEffect } from 'react';
import BlePeripheral from 'react-native-ble-peripheral';

// Advertiser Service UUID (이 값을 자신의 서비스 UUID로 변경하세요)
const SERVICE_UUID = '332D0FBA-981D-444C-8E7E-3F9E66F00DC0';

export default function useBluetoothAdvertiser() {
  useEffect(() => {
    // Start advertising when the component is mounted
    const startAdvertising = async () => {
      try {
        await BlePeripheral.addService('332D0FBA-981D-444C-8E7E-3F9E66F00DC0',false);
        await BlePeripheral.start();
        
        console.log('BLE advertising started successfully.');
      } catch (error) {
        console.log('Failed to start BLE advertising:', error);
      }
    };

    startAdvertising();

    return () => {
      // Stop advertising when the component is unmounted
      if (BlePeripheral.isAdvertising()) {
        BlePeripheral.stop()
          .then(() => console.log('BLE advertising stopped successfully.'))
          .catch(error => console.log('Failed to stop BLE advertising:', error));
      }
    };
  }, []);

  return {};
}