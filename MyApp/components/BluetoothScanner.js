import {useEffect, useState} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';
import BleManager from 'react-native-ble-manager';

const useBluetoothScanner = () => {
  const [devices, setDevices] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [beacon, setBeacon] = useState([]); // beacon 상태 추가

  useEffect(() => {
    BleManager.start({showAlert: false});

    const handleDiscoverPeripheral = device => {
      if (device.name === 'Plutocon') {
        console.log('Plutocon found', device.advertising.serviceData);
        device.advertising.serviceUUIDs = [device.id];
      }
      setDevices(prevDevices => {
        const devices = prevDevices || []; // 기존 devices 값이 undefined인 경우 빈 배열로 초기화
        // Check if the serviceUUIDs is a valid UUID format
        const uuidPattern =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        // Check if the device is already in the list and has a valid UUID
        const isDeviceExist = devices.some(existingDevice => {
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
      handleDiscoverPeripheral,
    );

    return () => {
      listener.remove();
    };
  }, []);

  const startScan = (scanTime = 5, onScanComplete) => {
    scanDevices = []; // 스캔을 시작하기 전에 장치 목록 초기화
    setScanning(true);

    BleManager.scan([], scanTime, false).then(() => {
      console.log(`Scanning for ${scanTime} seconds...`);

      setTimeout(() => {
        BleManager.stopScan().then(() => {
          setScanning(false);
          console.log('Scan is stopped');

          setDevices(scanDevices); // 스캔 도중 발견된 장치들로 상태 업데이트

          if (typeof onScanComplete === 'function') {
            onScanComplete(scanDevices); // 콜백에 임시 배열 전달
          }
        });
      }, scanTime * 1000);
    });
  };

  return {devices, beacon, scanning, startScan};
};

export default useBluetoothScanner;
