/*
블루투스 스캐너 클래스 
주변에 있는 블루투스 기기들을 스캔하는 훅
2023-09-22 고주원 : uuid 정규화 코드 추가

*/
import { useEffect, useState } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import BleManager from 'react-native-ble-manager';

const useBluetoothScanner = () => {
  const [devices, setDevices] = useState<Array<any>>([]);

  const startScan = () => {
    setDevices([]); // Clear the device list before start scanning
    BleManager.scan([], 20, false).then(() => {
      console.log('Scanning...');
    });
  };

  useEffect(() => {
    BleManager.start({ showAlert: false });

    const handleDiscoverPeripheral = (device: any) => {
      console.log('Got ble device', device);
    
      setDevices((prevDevices) => {
        const devices = prevDevices || []; // 기존 devices 값이 undefined인 경우 빈 배열로 초기화

        // Check if the serviceUUIDs is a valid UUID format
        const uuidPattern =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        // Check if the device is already in the list and has a valid UUID
        const isDeviceExist = devices.some((existingDevice) => {
          if (
            Array.isArray(existingDevice.advertising.serviceUUIDs) &&
            Array.isArray(device.advertising.serviceUUIDs)
          ) {
            return (
              existingDevice.advertising.serviceUUIDs[0] ===
                device.advertising.serviceUUIDs[0] &&
              uuidPattern.test(device.advertising.serviceUUIDs[0])
            );
          }
          return false;
        });

        if (!isDeviceExist && Array.isArray(device.advertising.serviceUUIDs)) {
          // Check if the service UUIDs array is defined and not empty and has a valid UUID
          if (
            device.advertising.serviceUUIDs.length > 0 &&
            uuidPattern.test(device.advertising.serviceUUIDs[0])
          ) {
            // Add the new device to the list
            return [...devices, device];
          }
        }

        // Device already exists or invalid service UUIDs or not a valid UUID format,
        // do not add it again
         return devices;
      });
    };

    const BleManagerModule = NativeModules.BleManager;
    const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

    const listener = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral
     );

     return (()=>{
       listener.remove();
     });
    
  }, []);

  return { devices, startScan }; // Return both the devices and the function to start scanning
};

export default useBluetoothScanner;