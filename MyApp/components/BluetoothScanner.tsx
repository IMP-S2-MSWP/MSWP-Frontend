import { useEffect, useState } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import BleManager from 'react-native-ble-manager';

const useBluetoothScanner = () => {
  const [devices, setDevices] = useState<Array<any>>([]);

  const startScan = () => {
    setDevices([]); // Clear the device list before start scanning
    BleManager.scan([], 5, false).then(() => {
      console.log('Scanning...');
    });
  };

  useEffect(() => {
    BleManager.start({ showAlert: false });

    const handleDiscoverPeripheral = (device: any) => {
      console.log('Got ble device', device);
      setDevices((devices) => [...devices, device]);
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